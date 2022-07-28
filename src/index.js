const cnv = document.createElement('canvas')
const ratio = 0.8;
cnv.width = 800 * ratio;
cnv.height = 800 * ratio;
const ctx = cnv.getContext('2d')

const face_grd = ctx.createRadialGradient(550 * ratio, 250 * ratio, 5 * ratio, 440 * ratio, 360 * ratio, 190 * ratio);
face_grd.addColorStop(0, '#abddff');
face_grd.addColorStop(1, '#0067e3');

const gum_grd = ctx.createLinearGradient(320 * ratio, 400 * ratio, 320 * ratio, 500 * ratio);
gum_grd.addColorStop(0, '#f73152');
gum_grd.addColorStop(0.35, '#ff85b1');

const eyebrow_height = 6 * ratio;
const eyebrow_width = 60 * ratio;

document.body.appendChild(cnv)

const maxDL = 100;
const maxDR = 100;

let face_state = {
    LT: [0, 0], // [x, y]
    RT: [0, 0], // [x, y]
    LBdeg: 0,
    RBdeg: 0,
    DL: 0,
    DR: 0,
    LTBrow: 0,
    RTBrow: 0,
    LBBrow: 0,
    RBBrow: 0,
    EyeDir: [0, 0] // [EyeDist, EyeAngle]
}

const emotion_preset = {
    default: {
        LT: [0, 0], // [x, y]
        RT: [0, 0], // [x, y]
        LBdeg: 0,
        RBdeg: 0,
        DL: 0,
        DR: 0,
        LTBrow: 0,
        RTBrow: 0,
        LBBrow: 0,
        RBBrow: 0,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    happy: {
        LT: [0, 0], // [x, y]
        RT: [0, 0], // [x, y]
        LBdeg: -20,
        RBdeg: -20,
        DL: 100,
        DR: 100,
        LTBrow: 100,
        RTBrow: 100,
        LBBrow: 100,
        RBBrow: 100,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    smile: {
        LT: [0, -5], // [x, y]
        RT: [0, -5], // [x, y]
        LBdeg: 60,
        RBdeg: 60,
        DL: 0,
        DR: 0,
        LTBrow: 100,
        RTBrow: 100,
        LBBrow: 100,
        RBBrow: 100,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    annoy: {
        LT: [0, 30], // [x, y]
        RT: [0, 30], // [x, y]
        LBdeg: -60,
        RBdeg: -60,
        DL: 0,
        DR: 0,
        LTBrow: 50,
        RTBrow: 50,
        LBBrow: 100,
        RBBrow: 100,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    angry: {
        LT: [0, 50], // [x, y]
        RT: [0, 50], // [x, y]
        LBdeg: -77,
        RBdeg: -77,
        DL: 30,
        DR: 30,
        LTBrow: 30,
        RTBrow: 30,
        LBBrow: 100,
        RBBrow: 100,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    laugh: {
        LT: [0, -5], // [x, y]
        RT: [0, -5], // [x, y]
        LBdeg: -30,
        RBdeg: -30,
        DL: 100,
        DR: 100,
        LTBrow: 100,
        RTBrow: 100,
        LBBrow: 35,
        RBBrow: 35,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    surprise: {
        LT: [50, 50], // [x, y]
        RT: [-50, 50], // [x, y]
        LBdeg: -80,
        RBdeg: -80,
        DL: 75,
        DR: 75,
        LTBrow: 100,
        RTBrow: 100,
        LBBrow: 100,
        RBBrow: 100,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    sleepy: {
        LT: [40, 10], // [x, y]
        RT: [-40, 10], // [x, y]
        LBdeg: 44,
        RBdeg: -35,
        DL: 0,
        DR: 8,
        LTBrow: 0,
        RTBrow: 0,
        LBBrow: 0,
        RBBrow: 0,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    disapprove0: {
        LT: [39, 10], // [x, y]
        RT: [-25, 0], // [x, y]
        LBdeg: 25,
        RBdeg: -47,
        DL: 0,
        DR: 0,
        LTBrow: 43,
        RTBrow: 100,
        LBBrow: 100,
        RBBrow: 100,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    disapprove1: {
        LT: [45, 10], // [x, y]
        RT: [-10, -5], // [x, y]
        LBdeg: 35,
        RBdeg: -50,
        DL: 0,
        DR: 0,
        LTBrow: 0,
        RTBrow: 22,
        LBBrow: 100,
        RBBrow: 71,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    sneer: {
        LT: [50, 0], // [x, y]
        RT: [-50, 0], // [x, y]
        LBdeg: 20,
        RBdeg: -50,
        DL: 0,
        DR: 71,
        LTBrow: 100,
        RTBrow: 100,
        LBBrow: 25,
        RBBrow: 25,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
    disgust: {
        LT: [40, 18], // [x, y]
        RT: [-9, 4], // [x, y]
        LBdeg: -14,
        RBdeg: -50,
        DL: 38,
        DR: 26,
        LTBrow: 20,
        RTBrow: 30,
        LBBrow: 43,
        RBBrow: 54,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
}

let change_state = {
    thresh: 0.01, // due to machine error (0.1 is actually computed as 0.9999...)
    emotion: 'none',
    changing: false,
    dt: 0.1,
    t: 0, // [0, 1]
    LT: {
        start: [0, 0]
    },
    RT: {
        start: [0, 0]
    },
    LBdeg: {
        start: 0
    },
    RBdeg: {
        start: 0
    },
    DL: {
        start: 0
    },
    DR: {
        start: 0
    },
    LTBrow: {
        start: 0
    },
    RTBrow: {
        start: 0
    },
    LBBrow: {
        start: 0
    },
    RBBrow: {
        start: 0
    },
    EyeDir: {
        start: [0, 0]
    },
}

/* test emotion changes */
let defaultButton = document.getElementById("defaultButton");
let happyButton = document.getElementById("happyButton");
let smileButton = document.getElementById("smileButton");
let annoyButton = document.getElementById("annoyButton");
let angryButton = document.getElementById("angryButton");
let laughButton = document.getElementById("laughButton");
let surpriseButton = document.getElementById("surpriseButton");
let sleepyButton = document.getElementById("sleepyButton");
let disapprove0Button = document.getElementById("disapprove0Button");
let disapprove1Button = document.getElementById("disapprove1Button");
let sneerButton = document.getElementById("sneerButton");
let disgustButton = document.getElementById("disgustButton");

defaultButton.onclick = function() {
    emotion_init('default');
}
happyButton.onclick = function() {
    emotion_init('happy');
}
smileButton.onclick = function() {
    emotion_init('smile');
}
annoyButton.onclick = function() {
    emotion_init('annoy');
}
angryButton.onclick = function() {
    emotion_init('angry');
}
laughButton.onclick = function() {
    emotion_init('laugh');
}
surpriseButton.onclick = function() {
    emotion_init('surprise');
}
sleepyButton.onclick = function() {
    emotion_init('sleepy');
}
disapprove0Button.onclick = function() {
    emotion_init('disapprove0');
}
disapprove1Button.onclick = function() {
    emotion_init('disapprove1');
}
sneerButton.onclick = function() {
    emotion_init('sneer');
}
disgustButton.onclick = function() {
    emotion_init('disgust');
}
/* */

setInterval(frame, 1000/20)

function frame() {
    if (emotion_ischanging()) {
        emotion_update();
    }

    drawBackground();
    drawFace();
    drawLeftEye();
    drawRightEye();
    drawLips();
}

function emotion_init(etype) { // initiate changing face emotion
    if(change_state['emotion'] !== etype) {
        change_state['emotion'] = etype;
        change_state['t'] = 0;
        change_state['changing'] = true;

        change_state['LT']['start'] = [face_state['LT'][0], face_state['LT'][1]];
        change_state['RT']['start'] = [face_state['RT'][0], face_state['RT'][1]];
        change_state['LBdeg']['start'] = face_state['LBdeg'];
        change_state['RBdeg']['start'] = face_state['RBdeg'];
        change_state['DL']['start'] = face_state['DL'];
        change_state['DR']['start'] = face_state['DR'];
        change_state['LTBrow']['start'] = face_state['LTBrow'];
        change_state['RTBrow']['start'] = face_state['RTBrow'];
        change_state['LBBrow']['start'] = face_state['LBBrow'];
        change_state['RBBrow']['start'] = face_state['RBBrow'];
        change_state['EyeDir']['start'] = [face_state['EyeDir'][0], face_state['EyeDir'][1]];
    }
}

function emotion_ischanging() {
    // let ret = change_state['LT']['changing'] || change_state['RT']['changing'] || change_state['LBdeg']['changing'] || change_state['RBdeg']['changing'] || change_state['DL']['changing'] || change_state['DR']['changing'] || change_state['LTBrow']['changing'] || change_state['RTBrow']['changing'] || change_state['LBBrow']['changing'] || change_state['RBBrow']['changing'] || change_state['EyeDir']['changing'];
    // if (!ret) {
    //     change_state['emotion'] = 'none';
    //     change_state['t'] = 0;
    // }
    return change_state['changing'];
}

function emotion_update() {
    let etype = change_state['emotion'];
    change_state['t'] += change_state['dt'];

    face_state['LT'][0] = change_state['LT']['start'][0] + (emotion_preset[etype]['LT'][0] - change_state['LT']['start'][0]) * Math.sin(Math.PI * change_state['t'] / 2);
    face_state['LT'][1] = change_state['LT']['start'][1] + (emotion_preset[etype]['LT'][1] - change_state['LT']['start'][1]) * Math.sin(Math.PI * change_state['t'] / 2);

    face_state['RT'][0] = change_state['RT']['start'][0] + (emotion_preset[etype]['RT'][0] - change_state['RT']['start'][0]) * Math.sin(Math.PI * change_state['t'] / 2);
    face_state['RT'][1] = change_state['RT']['start'][1] + (emotion_preset[etype]['RT'][1] - change_state['RT']['start'][1]) * Math.sin(Math.PI * change_state['t'] / 2);

    face_state['LBdeg'] = change_state['LBdeg']['start'] + (emotion_preset[etype]['LBdeg'] - change_state['LBdeg']['start']) * Math.sin(Math.PI * change_state['t'] / 2);
    face_state['RBdeg'] = change_state['RBdeg']['start'] + (emotion_preset[etype]['RBdeg'] - change_state['RBdeg']['start']) * Math.sin(Math.PI * change_state['t'] / 2);

    face_state['DL'] = change_state['DL']['start'] + (emotion_preset[etype]['DL'] - change_state['DL']['start']) * Math.sin(Math.PI * change_state['t'] / 2);
    face_state['DR'] = change_state['DR']['start'] + (emotion_preset[etype]['DR'] - change_state['DR']['start']) * Math.sin(Math.PI * change_state['t'] / 2);
    
    face_state['LTBrow'] = change_state['LTBrow']['start'] + (emotion_preset[etype]['LTBrow'] - change_state['LTBrow']['start']) * Math.sin(Math.PI * change_state['t'] / 2);
    face_state['RTBrow'] = change_state['RTBrow']['start'] + (emotion_preset[etype]['RTBrow'] - change_state['RTBrow']['start']) * Math.sin(Math.PI * change_state['t'] / 2);
    face_state['LBBrow'] = change_state['LBBrow']['start'] + (emotion_preset[etype]['LBBrow'] - change_state['LBBrow']['start']) * Math.sin(Math.PI * change_state['t'] / 2);
    face_state['RBBrow'] = change_state['RBBrow']['start'] + (emotion_preset[etype]['RBBrow'] - change_state['RBBrow']['start']) * Math.sin(Math.PI * change_state['t'] / 2);

    face_state['EyeDir'][0] = change_state['EyeDir']['start'][0] + (emotion_preset[etype]['EyeDir'][0] - change_state['EyeDir']['start'][0]) * Math.sin(Math.PI * change_state['t'] / 2);
    face_state['EyeDir'][1] = change_state['EyeDir']['start'][1] + (emotion_preset[etype]['EyeDir'][1] - change_state['EyeDir']['start'][1]) * Math.sin(Math.PI * change_state['t'] / 2);

    // console.log(change_state['t']) // DEBUG to check the machine error
    if (Math.abs(change_state['t'] - 1) < change_state['thresh']) {
        // console.log("Animated Done");
        change_state['emotion'] = 'none';
        change_state['t'] = 0;
        change_state['changing'] = false;
        // remove machine error using the exact value
        face_state['LT'] = [emotion_preset[etype]['LT'][0], emotion_preset[etype]['LT'][1]];
        face_state['RT'] = [emotion_preset[etype]['RT'][0], emotion_preset[etype]['RT'][1]];
        face_state['LBdeg'] = emotion_preset[etype]['LBdeg'];
        face_state['RBdeg'] = emotion_preset[etype]['RBdeg'];
        face_state['DL'] = emotion_preset[etype]['DL'];
        face_state['DR'] = emotion_preset[etype]['DR'];
        face_state['LTBrow'] = emotion_preset[etype]['LTBrow'];
        face_state['RTBrow'] = emotion_preset[etype]['RTBrow'];
        face_state['LBBrow'] = emotion_preset[etype]['LBBrow'];
        face_state['RBBrow'] = emotion_preset[etype]['RBBrow'];
        face_state['EyeDir'] = [emotion_preset[etype]['EyeDir'][0], emotion_preset[etype]['EyeDir'][1]];
    }
}

function drawLeftEye() {
    let edist = face_state['EyeDir'][0] * ratio;
    let eangle = face_state['EyeDir'][1] * Math.PI/180;
    
    let posX0 = 340 * ratio;
    let posY0 = 375 * ratio;

    let hT = face_state['LTBrow'] * (35*ratio - eyebrow_height/2)/100 + eyebrow_height/2; // eye's y radii = 35*ratio
    let hB = face_state['LBBrow'] * (35*ratio - eyebrow_height/2)/100 + eyebrow_height/2;
    let heightT = eyebrow_height; // height of the top eyebrow
    let heightB = eyebrow_height; // height of the bottom eyebrow
    let widthT = hT > 35*ratio/2 ? 0 : eyebrow_width*(eyebrow_height/2 - hT)/(35*ratio - eyebrow_height) + eyebrow_width;
    let widthB = hB > 35*ratio/2 ? 0 : eyebrow_width*(eyebrow_height/2 - hB)/(35*ratio - eyebrow_height) + eyebrow_width;
    let regionLeft = new Path2D();

    let posX = hT > 35*ratio/2 ? posX0 + edist*Math.cos(eangle) * 0.5 : posX0 + edist*Math.cos(eangle) * widthT/eyebrow_width;
    let posY = posY0 + edist*Math.sin(eangle);
    
    ctx.save();
    regionLeft.rect(posX - 20*ratio, posY - hT - heightT/2, 50*ratio, hT + hB + heightT/2 + heightB/2);
    ctx.clip(regionLeft);
    drawEye(posX, posY);
    ctx.restore();

    /* drawing eyebrows*/
    ctx.fillStyle = "black";
    ctx.fillRect(posX0 - widthT/2, posY - hT - heightT/2, widthT, heightT); // Top eyebrow
    ctx.fillRect(posX0 - widthB/2, posY + hB - heightB/2, widthB, heightB); // Bottom eyebrow
}

function drawRightEye() {
    let edist = face_state['EyeDir'][0] * ratio;
    let eangle = face_state['EyeDir'][1] * Math.PI/180;

    let posX0 = 460 * ratio;
    let posY0 = 375 * ratio;

    let hT = face_state['RTBrow'] * (35*ratio - eyebrow_height/2)/100 + eyebrow_height/2; // eye's y radii = 35*ratio
    let hB = face_state['RBBrow'] * (35*ratio - eyebrow_height/2)/100 + eyebrow_height/2;
    let heightT = eyebrow_height; // height of the top eyebrow
    let heightB = eyebrow_height; // height of the bottom eyebrow
    let widthT = hT > 35*ratio/2 ? 0 : eyebrow_width*(eyebrow_height/2 - hT)/(35*ratio - eyebrow_height) + eyebrow_width;
    let widthB = hB > 35*ratio/2 ? 0 : eyebrow_width*(eyebrow_height/2 - hB)/(35*ratio - eyebrow_height) + eyebrow_width;
    let regionRight = new Path2D();
    
    let posX = hT > 35*ratio/2 ? posX0 + edist*Math.cos(eangle) * 0.5 : posX0 + edist*Math.cos(eangle) * widthT/eyebrow_width;
    let posY = posY0 + edist*Math.sin(eangle);
    
    ctx.save();
    regionRight.rect(posX - 20*ratio, posY - hT - heightT/2, 50*ratio, hT + hB + heightT/2 + heightB/2);
    ctx.clip(regionRight);
    drawEye(posX, posY);
    ctx.restore();

    /* drawing eyebrows*/
    ctx.fillStyle = "black";
    ctx.fillRect(posX0 - widthT/2, posY - hT - heightT/2, widthT, heightT); // Top eyebrow
    ctx.fillRect(posX0 - widthB/2, posY + hB - heightB/2, widthB, heightB); // Bottom eyebrow
}

function drawBackground() {
    ctx.fillStyle = '#000'
    // ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, cnv.width, cnv.height)
}

function drawFace() {
    ctx.beginPath();
    ctx.arc(400* ratio, 400*ratio, 200*ratio, 0, 2*Math.PI);
    ctx.stroke();
    // ctx.fillStyle = '#44b3fc';
    ctx.fillStyle = face_grd;
    ctx.fill();
}

function drawEye(posX, posY) {
    ctx.beginPath();
    ctx.ellipse(posX, posY, 15*ratio, 35*ratio, 0, 0, 2*Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();

    drawEyeLight(posX + 5*ratio, posY - 19*ratio);
}

function drawEyeLight(posX, posY) {
    ctx.beginPath();
    ctx.ellipse(posX, posY, 4.5*ratio, 7*ratio, 0, 0, 2*Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

function drawLips() {
    // additional conditions may be further needed (left < right)
    let thetaLB = face_state['LBdeg'] * Math.PI/180;
    let thetaRB = face_state['RBdeg'] * Math.PI/180;
    let k = 0.2; // may be further controlled manually or automatically...

    let offLT = [face_state['LT'][0], face_state['LT'][1]]; // [offsetX, offsetY]
    let offRT = [face_state['RT'][0], face_state['RT'][1]];

    let LT_x_coord = (300 + offLT[0]) * ratio;
    let LT_y_coord = (450 + offLT[1]) * ratio;
    let LB_x_coord = LT_x_coord + maxDL*(1-(1-k)*Math.cos(thetaLB)) * Math.cos(thetaLB) * ratio;
    let LB_y_coord = LT_y_coord + maxDL*(1-(1-k)*Math.cos(thetaLB)) * Math.sin(thetaLB) * ratio;
    let RT_x_coord = (500 + offRT[0]) * ratio;
    let RT_y_coord = (450 + offRT[1]) * ratio;
    let RB_x_coord = RT_x_coord - maxDR*(1-(1-k)*Math.cos(thetaRB)) * Math.cos(thetaRB) * ratio;
    let RB_y_coord = RT_y_coord + maxDR*(1-(1-k)*Math.cos(thetaRB)) * Math.sin(thetaRB) * ratio;

    ctx.beginPath();
    ctx.moveTo(LT_x_coord, LT_y_coord);
    ctx.bezierCurveTo(LB_x_coord, LB_y_coord, RB_x_coord, RB_y_coord, RT_x_coord, RT_y_coord);
    
    /* bottom lip; simpler implementation; 2nd version */
    let thetaLB_delta = Math.PI/2 - thetaLB;
    let thetaRB_delta = Math.PI/2 - thetaRB;

    let dthetaLB = thetaLB_delta * face_state['DL'] / 100;
    let dthetaRB = thetaRB_delta * face_state['DR'] / 100;

    let DLB_x_coord = LT_x_coord + maxDL*(1-(1-k)*Math.cos(thetaLB + dthetaLB)) * Math.cos(thetaLB + dthetaLB) * ratio;
    let DLB_y_coord = LT_y_coord + maxDL*(1-(1-k)*Math.cos(thetaLB + dthetaLB)) * Math.sin(thetaLB + dthetaLB) * ratio;
    let DRB_x_coord = RT_x_coord - maxDR*(1-(1-k)*Math.cos(thetaRB + dthetaRB)) * Math.cos(thetaRB + dthetaRB) * ratio;
    let DRB_y_coord = RT_y_coord + maxDR*(1-(1-k)*Math.cos(thetaRB + dthetaRB)) * Math.sin(thetaRB + dthetaRB) * ratio;

    // ctx.moveTo(LT_x_coord, LT_y_coord);
    // ctx.bezierCurveTo(DLB_x_coord, DLB_y_coord, DRB_x_coord, DRB_y_coord, RT_x_coord, RT_y_coord);
    ctx.moveTo(RT_x_coord, RT_y_coord);
    ctx.bezierCurveTo(DRB_x_coord, DRB_y_coord, DLB_x_coord, DLB_y_coord, LT_x_coord, LT_y_coord);
    /* bottom lip */

    ctx.save(); // only draw within the area bounded by the lips path
    
    ctx.clip();
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillRect(320 * ratio, 200 * ratio, 160 * ratio, 260*ratio);
    ctx.fillStyle = gum_grd;
    ctx.fillRect(320 * ratio, 200 * ratio, 160 * ratio, 245*ratio);
    
    ctx.restore(); // restore context to redraw on the whole area of the canvas
    
    ctx.lineWidth = 6 * ratio;
    ctx.stroke();
}

window.onload = () => {
	// REQUIRED: Tell d3-api that we're still running ok (faster than every 3000 ms) or the page will be reloaded.
	window.setInterval(() => {
		DRDoubleSDK.resetWatchdog();
	}, 2000);

	// DRDoubleSDK 
	onConnect();
	DRDoubleSDK.on("connect", () => {
		onConnect();
	});
};