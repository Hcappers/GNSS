var canvas = document.getElementById("outerCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.clientWidth;
var height = canvas.clientHeight;
//######################
//##  Init Functions  ##
//######################
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
function initBoxes() {
    drawBox(0, 0, 466, 525, "#2f2f2f"); //Constellation
    drawBox(467, 0, 466, 525, "#2f2f2f"); //Satellite Status
    drawBox(934, 0, 466, 262, "#2f2f2f"); //Active GPS Status
    drawBox(934, 263, 466, 262, "#2f2f2f"); //RAIM Prediction
    drawBox(0, 525, 1400, 525, "#2f2f2f"); //GPS Signal Strength
}
//######################
//##  Util Functions  ##
//######################
function drawLine(x1, x2, y1, y2, width, color) {
    if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
    }
}
function drawBox(x, y, width, height, color) {
    if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
    }
}
function drawRing(x, y, outerRadius, gap) {
    if (ctx) {
        var innerRadius1 = outerRadius - gap;
        var innerRadius2 = outerRadius - 2 * gap;
        //  Draw outer ring
        ctx.arc(x, y, outerRadius, 0, Math.PI * 2, false);
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.stroke();
        // Draw middle ring
        ctx.beginPath();
        ctx.arc(x, y, innerRadius1, 0, Math.PI * 2, false);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Draw inner ring
        ctx.beginPath();
        ctx.arc(x, y, innerRadius2, 0, Math.PI * 2, false);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
function addText(x, y, text, fontSize) {
    if (ctx) {
        ctx.font = "".concat(fontSize, "px Arial");
        ctx.fillStyle = "white";
        ctx.fillText(text, x, y);
    }
}
//########################
//##  Window Functions  ##
//########################
function constellation() {
    drawRing(200, 200, 100, 30);
}
function satelliteStatus() {
    addText(480, 30, "Satellite Status", 25);
    addText(480, 70, "EPU", 20);
    addText(800, 70, "_.__NM", 20);
    addText(480, 110, "HDOP", 20);
    addText(800, 110, "_._", 20);
    addText(480, 150, "HFOM", 20);
    addText(800, 150, "____NM", 20);
    addText(480, 190, "VFOM", 20);
    addText(800, 190, "____NM", 20);
    addText(480, 230, "Position", 20);
    addText(800, 230, "_ __\u00B0__.__'", 20);
    addText(800, 270, "_ __\u00B0__.__'", 20);
    addText(480, 310, "Time", 20);
    addText(800, 310, "__:__:__UTC", 20);
    addText(480, 350, "ALT GSL", 20);
    addText(800, 350, "_____", 20);
    addText(480, 390, "GS", 20);
    addText(800, 390, "____._KT", 20);
    addText(480, 430, "Track", 20);
    addText(800, 430, "___\u00B0", 20);
}
function activeGPSStatus() {
    addText(945, 30, "Active GPS Status", 25);
    addText(945, 70, "Pilot", 20);
    addText(945, 110, "Copilot", 20);
    addText(945, 150, "Status", 20);
    addText(945, 190, "SBAS", 20);
}
function raimPrediction() {
    addText(945, 290, "RAIM Prediction", 25);
    addText(945, 330, "Waypoint", 20);
    addText(945, 370, "ARV Time", 20);
    addText(945, 410, "ARV Date", 20);
}
function gpsSignalStrength() {
    addText(50, 560, "GPS Signal Strength", 25);
    drawBox(50, 575, 1300, 425, "#2f2f2f");
    for (var i = 0; i < 3; i++) {
        drawLine(50, 1350, 1000 - (425 / 4) * (i + 1), 1000 - (425 / 4) * (i + 1), 2, "white");
    }
    var percents = [0.8, 0.6, 0.4, 0.2];
    for (var i = 0; i < percents.length; i++) {
        drawBox(60 + 85 * i, 575 + 425 * (1 - percents[i]), 75, 425 * percents[i], "#ACE5EE");
    }
}
initCanvas();
initBoxes();
activeGPSStatus();
raimPrediction();
gpsSignalStrength();
constellation();
satelliteStatus();
