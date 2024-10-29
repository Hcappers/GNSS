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
function activeGPSStatus() {
    addText(945, 30, "Active GPS Status", 25);
    addText(945, 90, "Pilot", 20);
    addText(945, 130, "Copilot", 20);
    addText(945, 170, "Status", 20);
    addText(945, 210, "SBAS", 20);
}
function raimPrediction() {
    addText(945, 290, "RAIM Prediction", 25);
    addText(945, 330, "Waypoint", 20);
    addText(945, 370, "ARV Time", 20);
    addText(945, 410, "ARV Date", 20);
}
function gpsSignalStrength() {
    addText(50, 560, "GPS Signal Strength", 25);
    drawBox(50, 575, 1300, 425, "white");
}
function initBoxes() {
    drawBox(0, 0, 466, 525, "white"); //Constellation
    drawBox(467, 0, 466, 525, "white"); //Satellite Status
    drawBox(934, 0, 466, 262, "white"); //Active GPS Status
    drawBox(934, 263, 466, 262, "white"); //RAIM Prediction
    drawBox(0, 525, 1400, 525, "white"); //GPS Signal Strength
}
initCanvas();
initBoxes();
activeGPSStatus();
raimPrediction();
gpsSignalStrength();
