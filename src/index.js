const cnv = document.createElement('canvas')
const ratio = 0.8;
cnv.width = 800 * ratio;
cnv.height = 800 * ratio;
const ctx = cnv.getContext('2d')

const face_grd = ctx.createRadialGradient(550 * ratio, 250 * ratio, 5 * ratio, 440 * ratio, 360 * ratio, 190 * ratio);
face_grd.addColorStop(0, '#abddff');
face_grd.addColorStop(1, '#0067e3')

document.body.appendChild(cnv)

/* slider to test lips' changes */
let slider_LTx = document.getElementById("slider_LTx");
let slider_LTy = document.getElementById("slider_LTy");
let LTx = document.getElementById("LTx");
let LTy = document.getElementById("LTy");
LTx.innerHTML = slider_LTx.value;
LTy.innerHTML = slider_LTy.value;
// console.log(parseFloat(LTx.innerHTML));

let slider_LBx = document.getElementById("slider_LBx");
let slider_LBy = document.getElementById("slider_LBy");
let LBx = document.getElementById("LBx");
let LBy = document.getElementById("LBy");
LBx.innerHTML = slider_LBx.value;
LBy.innerHTML = slider_LBy.value;

let slider_RBx = document.getElementById("slider_RBx");
let slider_RBy = document.getElementById("slider_RBy");
let RBx = document.getElementById("RBx");
let RBy = document.getElementById("RBy");
RBx.innerHTML = slider_RBx.value;
RBy.innerHTML = slider_RBy.value;

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

slider_LBx.oninput = function() {LBx.innerHTML = this.value;}
slider_LBy.oninput = function() {LBy.innerHTML = this.value;}

slider_RBx.oninput = function() {RBx.innerHTML = this.value;}
slider_RBy.oninput = function() {RBy.innerHTML = this.value;}

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
  drawEye(340 * ratio, 370 * ratio);
  drawEye(460 * ratio, 370 * ratio);
  drawLips();
//   drawPie(state.colors.length)
//   rotateSquareAndDrawSquare()
}


function drawBackground() {
    ctx.fillStyle = '#000'
    // ctx.fillStyle = '#fff'
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

function drawEye(posX, posY) {ctx.beginPath();
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
    let offLT = [parseFloat(LTx.innerHTML), parseFloat(LTy.innerHTML)]; // [offsetX, offsetY]
    let offLB = [parseFloat(LBx.innerHTML), parseFloat(LBy.innerHTML)];
    let offRB = [parseFloat(RBx.innerHTML), parseFloat(RBy.innerHTML)];
    let offRT = [parseFloat(RTx.innerHTML), parseFloat(RTy.innerHTML)];

    let LT_x_coord = (300 + offLT[0]) * ratio;
    let LT_y_coord = (430 + offLT[1]) * ratio;
    let LB_x_coord = (320 + offLB[0]) * ratio > LT_x_coord ? (320 + offLB[0]) * ratio : LT_x_coord;
    let LB_y_coord = (450 + offLB[1]) * ratio;
    let RT_x_coord = (500 + offRT[0]) * ratio;
    let RT_y_coord = (430 + offRT[1]) * ratio;
    let RB_x_coord = (480 + offRB[0]) * ratio < RT_x_coord ? (480 + offRB[0]) * ratio : RT_x_coord;
    let RB_y_coord = (450 + offRB[1]) * ratio;

    ctx.beginPath();
    ctx.moveTo(LT_x_coord, LT_y_coord);
    ctx.bezierCurveTo(LB_x_coord, LB_y_coord, RB_x_coord, RB_y_coord, RT_x_coord, RT_y_coord);
    
    /* downside lips; positive value <= 100 */
    let lenL = Math.sqrt(Math.pow(LB_x_coord - LT_x_coord, 2) + Math.pow(LB_y_coord - LT_y_coord, 2));
    let lenR = Math.sqrt(Math.pow(RB_x_coord - RT_x_coord, 2) + Math.pow(RB_y_coord - RT_y_coord, 2));
    
    let downL = parseFloat(DL.innerHTML); // [0, maxDL]
    let downR = parseFloat(DR.innerHTML); // [0, maxDR]

    let thetaL0 = LB_y_coord === LT_y_coord ? Math.PI/2 : Math.atan((LB_x_coord - LT_x_coord)/(LB_y_coord - LT_y_coord)); // machine error may be further handled
    let thetaL = thetaL0 < 0 ? Math.PI + thetaL0 : (thetaL0 === 0 && LB_y_coord < LT_y_coord ? Math.PI : thetaL0);
    let Lsin = Math.sin(downL * Math.PI/(2 * maxDL));
    let Lcos = Math.cos(downL * Math.PI/(2 * maxDL));
    let dthetaL = thetaL * Lsin;

    let thetaR0 = RB_y_coord === RT_y_coord ? Math.PI/2 : Math.atan((RT_x_coord - RB_x_coord)/(RB_y_coord - RT_y_coord)); // machine error may be further handled
    let thetaR = thetaR0 < 0 ? Math.PI + thetaR0 : (thetaR0 === 0 && RB_y_coord < RT_y_coord ? Math.PI : thetaR0);
    let Rsin = Math.sin(downR * Math.PI/(2 * maxDR));
    let Rcos = Math.cos(downR * Math.PI/(2 * maxDR));
    let dthetaR = thetaR * Rsin;


    ctx.moveTo(LT_x_coord, LT_y_coord);
    ctx.bezierCurveTo(LT_x_coord + ((lenL + downL)*Lcos + maxDL*Lsin) * Math.sin(thetaL - dthetaL), LT_y_coord + ((lenL + downL)*Lcos + maxDL*Lsin) * Math.cos(thetaL - dthetaL), RT_x_coord - ((lenR + downR)*Rcos + maxDR*Rsin) * Math.sin(thetaR - dthetaR), RT_y_coord + ((lenR + downR)*Rcos + maxDR*Rsin) * Math.cos(thetaR - dthetaR), RT_x_coord, RT_y_coord);
    
    // console.log(thetaL0);
    /* downside lips */

    // ctx.moveTo(300 * ratio, 430 * ratio);
    // ctx.bezierCurveTo(320 * ratio, 430 * ratio, 480 * ratio, 430 * ratio, 500 * ratio, 430 * ratio);
    
    ctx.save();
    ctx.lineWidth = 6 * ratio;
    ctx.stroke();
    
    // ctx.fillStyle = "#000";
    // ctx.fill();
    ctx.restore();
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