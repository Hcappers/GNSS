var outerCanvas = document.getElementById("outerCanvas");
var canvasCTX = outerCanvas.getContext("2d");
function initCanvas() {
    if (canvasCTX) {
        outerCanvas.width = outerCanvas.clientWidth;
        outerCanvas.height = outerCanvas.clientHeight;
        outerCanvas.style.position = "absolute";
        outerCanvas.style.top = "0";
        outerCanvas.style.left = "0";
        outerCanvas.style.backgroundColor = "black";
    }
}
function drawBox(x, y, width, height, color) {
    if (canvasCTX) {
        canvasCTX.fillStyle = color;
        canvasCTX.fillRect(x, y, width, height);
        canvasCTX.strokeStyle = "gray";
        canvasCTX.lineWidth = 1;
        canvasCTX.strokeRect(x, y, width, height);
    }
}
function drawRings(x, y, outerRadius, gap) {
    if (canvasCTX) {
        var innerRadius1 = outerRadius - gap;
        var innerRadius2 = outerRadius - 2 * gap;
        // Draw outer ring
        canvasCTX.beginPath();
        canvasCTX.arc(x, y, outerRadius, 0, Math.PI * 2, false);
        canvasCTX.strokeStyle = "white";
        canvasCTX.lineWidth = 2;
        canvasCTX.stroke();
        // Draw middle ring
        canvasCTX.beginPath();
        canvasCTX.arc(x, y, innerRadius1, 0, Math.PI * 2, false);
        canvasCTX.strokeStyle = "white";
        canvasCTX.lineWidth = 2;
        canvasCTX.stroke();
        // Draw inner ring
        canvasCTX.beginPath();
        canvasCTX.arc(x, y, innerRadius2, 0, Math.PI * 2, false);
        canvasCTX.strokeStyle = "white";
        canvasCTX.lineWidth = 2;
        canvasCTX.stroke();
    }
}
function addText(x, y, text, fontSize, color) {
    if (color === void 0) { color = "white"; }
    if (canvasCTX) {
        canvasCTX.font = "".concat(fontSize, "px Arial");
        canvasCTX.fillStyle = color;
        canvasCTX.fillText(text, x, y);
    }
}
// Draw GPS signal strength graph (This is in a grid format need to change to just 3-4 lines across)
function drawSignalStrength(x, y, width, height) {
    if (canvasCTX) {
        drawBox(x, y, width, height, "black");
        canvasCTX.strokeStyle = "gray";
        var gridSpacing = 50;
        for (var i = x + gridSpacing; i < x + width; i += gridSpacing) {
            canvasCTX.beginPath();
            canvasCTX.moveTo(i, y);
            canvasCTX.lineTo(i, y + height);
            canvasCTX.stroke();
        }
        for (var j = y + gridSpacing; j < y + height; j += gridSpacing) {
            canvasCTX.beginPath();
            canvasCTX.moveTo(x, j);
            canvasCTX.lineTo(x + width, j);
            canvasCTX.stroke();
        }
    }
}
function createConstellationRings() {
    drawBox(0, 0, 400, 400, "black"); // Bounding box for constellation
    drawRings(200, 200, 100, 30); // Concentric rings at (200, 200)
}
function createSatelliteStatus() {
    drawBox(400, 0, 400, 400, "black");
    addText(420, 40, "Satellite Status", 20);
    addText(420, 80, "EPU:", 20);
    addText(420, 120, "HDOP:", 20);
    addText(420, 160, "VFOM:", 20);
    addText(420, 200, "Position:", 20);
    addText(420, 240, "Time: 14:50:09", 20);
    addText(420, 280, "ALT GSL: ----FT", 20);
    addText(420, 320, "GS: ---- KT", 20);
    addText(420, 360, "Track: ----", 20);
}
function createActive() {
    drawBox(800, 0, 400, 200, "black");
    addText(820, 40, "Active GPS Status", 25);
    addText(820, 75, "Pilot: GPS1", 20);
    addText(820, 110, "Copilot: GPS2", 20);
    addText(820, 145, "Status: ACQUIRING", 20);
    addText(820, 180, "SBAS: INACTIVE", 20);
}
function createRAIM() {
    drawBox(800, 200, 400, 200, "black");
    addText(820, 240, "RAIM Prediction", 20);
    addText(820, 280, "Waypoint: P.POS", 20);
    addText(820, 320, "ARV Time: 14:48UTC", 20);
    addText(820, 360, "ARV Date: 11-JUL-24", 20);
}
function createGPSSignal() {
    drawSignalStrength(0, 400, 1200, 300);
    addText(20, 720, "GPS Signal Strength", 20);
}
initCanvas();
createConstellationRings();
createSatelliteStatus();
createActive();
createRAIM();
createGPSSignal();
//need to make the center ring smaller and keep the same size for the rest
//Need to add the labels for each bar graph
//Need to remove the grid and make just 3-4 lines accross
//Need to make static bars for now that are a full stregth
//look at how to make it dynamtic
//
