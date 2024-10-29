var canvas = document.getElementById("outerCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.clientWidth;
var height = canvas.clientHeight;
function initCanvas() {
    if (ctx) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.backgroundColor = "black";
    }
}
function drawBox(x, y, width, height, color) {
    if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
    }
}
function drawRing(x, y, outerRadius, innerRadius) {
    if (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, outerRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x, y, innerRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}
function addText(x, y, text, fontSize) {
    if (ctx) {
        ctx.font = "".concat(fontSize, "px Arial");
        ctx.fillStyle = "black";
        ctx.fillText(text, x, y);
    }
}
initCanvas();
//Constellation
drawBox(0, 0, width / 3, height / 2, "white");
//Satellite Status
drawBox(467, 0, width / 3, height / 2, "white");
//Active GPS Status
drawBox(934, 0, width / 3, height / 4, "white");
//RAIM Prediction
drawBox(934, 263, width / 3, height / 4, "white");
//GPS Signal Strength
drawBox(0, 525, width, height / 2, "white");
addText(50, 560, "GPS Signal Strength", 25);
drawBox(50, 575, 1300, 425, "white");
