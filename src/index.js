const cnv = document.createElement('canvas')
const ratio = 0.8;
cnv.width = 800 * ratio;
cnv.height = 800 * ratio;
const ctx = cnv.getContext('2d')

const face_grd = ctx.createRadialGradient(550 * ratio, 250 * ratio, 5 * ratio, 440 * ratio, 360 * ratio, 190 * ratio);
face_grd.addColorStop(0, '#abddff');
face_grd.addColorStop(1, '#0067e3')

document.body.appendChild(cnv)

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
    // ctx.fillStyle = face_grd
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
    ctx.beginPath();
    ctx.moveTo(300 * ratio, 430 * ratio);
    ctx.bezierCurveTo(320 * ratio, 500 * ratio, 480 * ratio, 500 * ratio, 500 * ratio, 430 * ratio);
    ctx.save();
    ctx.lineWidth = 6 * ratio;
    ctx.stroke();
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