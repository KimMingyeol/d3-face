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

document.body.appendChild(cnv)

/* slider to test lips' changes */
let slider_LTx = document.getElementById("slider_LTx");
let slider_LTy = document.getElementById("slider_LTy");
let LTx = document.getElementById("LTx");
let LTy = document.getElementById("LTy");
LTx.innerHTML = slider_LTx.value;
LTy.innerHTML = slider_LTy.value;
// console.log(parseFloat(LTx.innerHTML));

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

const maxDL = 100;
const maxDR = 100;

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


setInterval(frame, 1000 / 20)

function frame() {
  drawBackground();
  drawFace();
  drawEye(340 * ratio, 375 * ratio);
  drawEye(460 * ratio, 375 * ratio);
  drawLips();
//   drawPie(state.colors.length)
//   rotateSquareAndDrawSquare()
}


function drawBackground() {
    ctx.fillStyle = '#000'
    // ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, cnv.width, cnv.height)
}

function drawFace() {
    ctx.beginPath();
    ctx.arc(400* ratio, 400* ratio, 200* ratio, 0, 2*Math.PI);
    ctx.stroke();
    // ctx.fillStyle = '#44b3fc';
    ctx.fillStyle = face_grd;
    ctx.fill();
}

function drawEye(posX, posY) {
    ctx.beginPath();
    ctx.ellipse(posX, posY, 15 * ratio, 35 * ratio, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    drawEyeLight(posX + 5 * ratio, posY - 19 * ratio);
}

function drawEyeLight(posX, posY) {
    ctx.beginPath();
    ctx.ellipse(posX, posY, 4.5 * ratio, 7 * ratio, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

function drawLips() {
    // additional conditions may be further needed (left < right)
    let thetaLB = parseFloat(LBdeg.innerHTML) * Math.PI/180;
    let thetaRB = parseFloat(RBdeg.innerHTML) * Math.PI/180;
    let k = 0.2;

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

function drawMouth() {

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