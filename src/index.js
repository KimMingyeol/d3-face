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

/* sliders to test lips' changes */
let slider_LTx = document.getElementById("slider_LTx");
let slider_LTy = document.getElementById("slider_LTy");
let LTx = document.getElementById("LTx");
let LTy = document.getElementById("LTy");
LTx.innerHTML = slider_LTx.value;
LTy.innerHTML = slider_LTy.value;

let slider_LBdeg = document.getElementById("slider_LBdeg");
let LBdeg = document.getElementById("LBdeg");
LBdeg.innerHTML = slider_LBdeg.value;

let slider_RBdeg = document.getElementById("slider_RBdeg");
let RBdeg = document.getElementById("RBdeg");
RBdeg.innerHTML = slider_RBdeg.value;

let slider_RTx = document.getElementById("slider_RTx");
let slider_RTy = document.getElementById("slider_RTy");
let RTx = document.getElementById("RTx");
let RTy = document.getElementById("RTy");
RTx.innerHTML = slider_RTx.value;
RTy.innerHTML = slider_RTy.value;

let slider_DL = document.getElementById("slider_DL");
let DL = document.getElementById("DL");
DL.innerHTML = slider_DL.value;

let slider_DR = document.getElementById("slider_DR");
let DR = document.getElementById("DR");
DR.innerHTML = slider_DR.value;

slider_LTx.oninput = function() {LTx.innerHTML = this.value;}
slider_LTy.oninput = function() {LTy.innerHTML = this.value;}

slider_LBdeg.oninput = function() {LBdeg.innerHTML = this.value;}

slider_RBdeg.oninput = function() {RBdeg.innerHTML = this.value;}

slider_RTx.oninput = function() {RTx.innerHTML = this.value;}
slider_RTy.oninput = function() {RTy.innerHTML = this.value;}

slider_DL.oninput = function() {DL.innerHTML = this.value;}
slider_DR.oninput = function() {DR.innerHTML = this.value;}
/* */

/* sliders to test eyebrows' changes */
let slider_LTBrow = document.getElementById("slider_LTBrow");
let slider_LBBrow = document.getElementById("slider_LBBrow");
let LTBrow = document.getElementById("LTBrow");
let LBBrow = document.getElementById("LBBrow");
LTBrow.innerHTML = slider_LTBrow.value;
LBBrow.innerHTML = slider_LBBrow.value;

let slider_RTBrow = document.getElementById("slider_RTBrow");
let slider_RBBrow = document.getElementById("slider_RBBrow");
let RTBrow = document.getElementById("RTBrow");
let RBBrow = document.getElementById("RBBrow");
RTBrow.innerHTML = slider_RTBrow.value;
RBBrow.innerHTML = slider_RBBrow.value;

slider_LTBrow.oninput = function() {LTBrow.innerHTML = this.value;}
slider_LBBrow.oninput = function() {LBBrow.innerHTML = this.value;}

slider_RTBrow.oninput = function() {RTBrow.innerHTML = this.value;}
slider_RBBrow.oninput = function() {RBBrow.innerHTML = this.value;}
/* */

/* sliders to test eyes' directions */
let slider_EyeDist = document.getElementById("slider_EyeDist");
let slider_EyeAngle = document.getElementById("slider_EyeAngle");
let EyeDist = document.getElementById("EyeDist");
let EyeAngle = document.getElementById("EyeAngle");
EyeDist.innerHTML = slider_EyeDist.value;
EyeAngle.innerHTML = slider_EyeAngle.value;

slider_EyeDist.oninput = function() {EyeDist.innerHTML = this.value;}
slider_EyeAngle.oninput = function() {EyeAngle.innerHTML = this.value;}
/* */

const maxDL = 100;
const maxDR = 100;

const emotion_preset = {
    thresh: 0.01,
    default: {
        LT: [0, 0], // [x, y]
        RT: [0, 0], // [x, y]
        LB: 0,
        RB: 0,
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
        LB: -20,
        RB: -20,
        DL: 100,
        DR: 100,
        LTBrow: 100,
        RTBrow: 100,
        LBBrow: 100,
        RBBrow: 100,
        EyeDir: [0, 0] // [EyeDist, EyeAngle]
    },
}

let change_state = {
    emotion: 'none',
    LT: false, // is changing?
    RT: false,
    LB: false,
    RB: false,
    DL: false,
    DR: false,
    LTBrow: false,
    RTBrow: false,
    LBBrow: false,
    RBBRow: false,
    EyeDir: false
}

/* test emotion changes */
let defaultButton = document.getElementById("defaultButton");
let happyButton = document.getElementById("happyButton");

defaultButton.onclick = function() {
    emotion_init('default');
}
happyButton.onclick = function() {
    emotion_init('happy');
}
/* */

// let state = {
//   colors: [randomColor(), randomColor(), randomColor(), randomColor()],
//   circle: {
//     pos: {
//       x: cnv.width / 4,
//       y: cnv.height / 4,
//     },
//     radius: cnv.width / 4.5
//   },
//   square: {
//     pos: {
//       x: cnv.width / 2 + cnv.width / 6,
//       y: 0 + cnv.height / 6,      
//     },
//     side: cnv.width / 2 - cnv.width / 3,
//     angle: 0,
//     color: randomColor()
//   }
// }


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
//   drawPie(state.colors.length)
//   rotateSquareAndDrawSquare()
}

function emotion_init(etype) { // initiate changing face emotion
    change_state['emotion'] = etype;
    change_state['LT'] = true;
    change_state['RT'] = true;
    change_state['LB'] = true;
    change_state['RB'] = true;
    change_state['DL'] = true;
    change_state['DR'] = true;
    change_state['LTBrow'] = true;
    change_state['RTBrow'] = true;
    change_state['LBBrow'] = true;
    change_state['RBBrow'] = true;
    change_state['EyeDir'] = true;
}

function emotion_ischanging() {
    let ret = change_state['LT'] || change_state['RT'] || change_state['LB'] || change_state['RB'] || change_state['DL'] || change_state['DR'] || change_state['LTBrow'] || change_state['RTBrow'] || change_state['LBBrow'] || change_state['RBBrow'] || change_state['EyeDir'];
    if (!ret) {
        change_state['emotion'] = 'none';
    }
    return ret;
}

function emotion_update(){
    
}

function drawLeftEye() {
    let edist = parseFloat(EyeDist.innerHTML) * ratio;
    let eangle = parseFloat(EyeAngle.innerHTML) * Math.PI/180;
    
    let posX0 = 340 * ratio;
    let posY0 = 375 * ratio;

    let hT = parseFloat(LTBrow.innerHTML) * (35*ratio - eyebrow_height/2)/100 + eyebrow_height/2; // eye's y radii = 35*ratio
    let hB = parseFloat(LBBrow.innerHTML) * (35*ratio - eyebrow_height/2)/100 + eyebrow_height/2;
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
    let edist = parseFloat(EyeDist.innerHTML) * ratio;
    let eangle = parseFloat(EyeAngle.innerHTML) * Math.PI/180;

    let posX0 = 460 * ratio;
    let posY0 = 375 * ratio;

    let hT = parseFloat(RTBrow.innerHTML) * (35*ratio - eyebrow_height/2)/100 + eyebrow_height/2; // eye's y radii = 35*ratio
    let hB = parseFloat(RBBrow.innerHTML) * (35*ratio - eyebrow_height/2)/100 + eyebrow_height/2;
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
    let thetaLB = parseFloat(LBdeg.innerHTML) * Math.PI/180;
    let thetaRB = parseFloat(RBdeg.innerHTML) * Math.PI/180;
    let k = 0.2; // may be further controlled manually or automatically...

    let offLT = [parseFloat(LTx.innerHTML), parseFloat(LTy.innerHTML)]; // [offsetX, offsetY]
    let offRT = [parseFloat(RTx.innerHTML), parseFloat(RTy.innerHTML)];

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

    let dthetaLB = thetaLB_delta * parseFloat(DL.innerHTML) / 100;
    let dthetaRB = thetaRB_delta * parseFloat(DR.innerHTML) / 100;

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

// function drawPie(sliceCount) {
//   let size = 2 * Math.PI / sliceCount

//   let angle = 0
//   let n = 0
//   while(n < sliceCount) {
//     drawQuadrant(angle, angle + size, state.circle, state.colors[n])
//     n++
//     angle += size
//   }

//   function drawQuadrant(fromAngle, toAngle, circle, color) {
//     let { pos: {x, y}, radius } = circle
  
//     ctx.beginPath() 
//     ctx.fillStyle = color
//     ctx.moveTo(x, y)
//     ctx.arc(x, y, radius, fromAngle, toAngle)
//     ctx.lineTo(x,y)
//     ctx.fill()
//   }
  
// }


// function randomColor() {
//   let r = randInt(0, 255)
//   let g = randInt(0, 255)
//   let b = randInt(0, 255)
//   return `rgb(${r},${g},${b})`
// }

// function randInt(from, to) {
//   let n = Math.floor(Math.random() * (to - from) + from)
//   return n
// }

// function rotateSquareAndDrawSquare() {
//   let { pos: { x, y } } = state.square
//   ctx.save()
//   ctx.translate(x, y)
//   state.square.angle += 2
//   let radians = state.square.angle * Math.PI / 180
//   ctx.rotate(radians)
//   drawSquare()
//   ctx.restore()
// }

// function drawSquare() {
//   let { side, color} = state.square
//   ctx.fillStyle = color
//   ctx.fillRect(-(side / 2), -(side / 2), side, side)
// }