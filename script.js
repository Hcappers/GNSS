var canvas = document.getElementById("outerCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.clientWidth;
var height = canvas.clientHeight;
var bgColor = "#2f2f2f";
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
  drawBox(0, 0, width / 3, height / 2, bgColor); //Constellation
  drawBox(width / 3, 0, width / 3, height / 2, bgColor); //Satellite Status
  drawBox(2 * (width / 3), 0, width / 3, height / 4, bgColor); //Active GPS Status
  drawBox(2 * (width / 3), height / 4, width / 3, height / 4, bgColor); //RAIM Prediction
  drawBox(0, height / 2, width, height / 2, bgColor); //GPS Signal Strength
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
    var middleRadius = outerRadius + gap * 1.5;
    var innerRadius = outerRadius - gap * 2;
    // Draw outer ring
    ctx.beginPath();
    ctx.arc(x, y, outerRadius + gap * 4, 0, Math.PI * 2, false);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    // Draw middle ring
    ctx.beginPath();
    ctx.arc(x, y, middleRadius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    // Draw inner ring
    ctx.beginPath();
    ctx.arc(x, y, innerRadius, 0, Math.PI * 2, false);
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
  var boxWidth = width / 3;
  var boxHeight = height / 2;
  drawRing(boxWidth / 2, boxHeight / 2, 100, 30);
}
function satelliteStatus() {
  var lhsLoc = width / 3 + 20;
  var rhsLoc = lhsLoc + 300;
  var yStart = 30;
  addText(lhsLoc, yStart, "Satellite Status", 25);
  addText(lhsLoc, yStart + 40 * 1, "EPU", 20);
  addText(rhsLoc, yStart + 40 * 1, "_.__NM", 20);
  addText(lhsLoc, yStart + 40 * 2, "HDOP", 20);
  addText(rhsLoc, yStart + 40 * 2, "_._", 20);
  addText(lhsLoc, yStart + 40 * 3, "HFOM", 20);
  addText(rhsLoc, yStart + 40 * 3, "____NM", 20);
  addText(lhsLoc, yStart + 40 * 4, "VFOM", 20);
  addText(rhsLoc, yStart + 40 * 4, "____NM", 20);
  addText(lhsLoc, yStart + 40 * 5, "Position", 20);
  addText(rhsLoc, yStart + 40 * 5, "_ __\u00B0__.__'", 20);
  addText(rhsLoc, yStart + 40 * 6, "_ __\u00B0__.__'", 20);
  addText(lhsLoc, yStart + 40 * 7, "Time", 20);
  addText(rhsLoc, yStart + 40 * 7, "__:__:__UTC", 20); //Simvar: ZULU Time
  addText(lhsLoc, yStart + 40 * 8, "ALT GSL", 20);
  addText(rhsLoc, yStart + 40 * 8, "_____", 20);
  addText(lhsLoc, yStart + 40 * 9, "GS", 20);
  addText(rhsLoc, yStart + 40 * 9, "____._KT", 20); //Simvar: GROUND VELOCITY
  addText(lhsLoc, yStart + 40 * 10, "Track", 20);
  addText(rhsLoc, yStart + 40 * 10, "___\u00B0", 20);
}
function activeGPSStatus() {
  var lhsLoc = 2 * (width / 3) + 20;
  var rhsLoc = lhsLoc + 300;
  var yStart = 30;
  addText(lhsLoc, yStart, "Active GPS Status", 25);
  addText(lhsLoc, yStart + 40 * 1, "Pilot", 20);
  addText(rhsLoc, yStart + 40 * 1, "____", 20);
  addText(lhsLoc, yStart + 40 * 2, "Copilot", 20);
  addText(rhsLoc, yStart + 40 * 2, "____", 20);
  addText(lhsLoc, yStart + 40 * 3, "Status", 20);
  addText(rhsLoc, yStart + 40 * 3, "____", 20);
  addText(lhsLoc, yStart + 40 * 4, "SBAS", 20);
  addText(rhsLoc, yStart + 40 * 4, "____", 20);
}
function raimPrediction() {
  var lhsLoc = 2 * (width / 3) + 20;
  var rhsLoc = lhsLoc + 300;
  var boxHeight = height / 4;
  var yStart = 30;
  addText(lhsLoc, boxHeight + 30, "RAIM Prediction", 25);
  addText(lhsLoc, boxHeight + yStart + 40 * 1, "Waypoint", 20);
  addText(rhsLoc, boxHeight + yStart + 40 * 1, "____", 20);
  addText(lhsLoc, boxHeight + yStart + 40 * 2, "ARV Time", 20);
  addText(rhsLoc, boxHeight + yStart + 40 * 2, "__:__UTC", 20);
  addText(lhsLoc, boxHeight + yStart + 40 * 3, "ARV Date", 20);
  addText(rhsLoc, boxHeight + yStart + 40 * 3, "__-___-__", 20);
}
function gpsSignalStrength() {
  var boxHeight = height / 2;
  var boxWidth = width;
  var graphHeight = boxHeight - 100;
  var graphWidth = boxWidth - 100;
  addText(50, boxHeight + 30, "GPS Signal Strength", 25);
  drawBox(50, boxHeight + 50, graphWidth, graphHeight, bgColor);
  for (var i = 0; i < 3; i++) {
    drawLine(
      50,
      boxWidth - 50,
      boxHeight + 50 + graphHeight - (graphHeight / 4) * (i + 1),
      boxHeight + 50 + graphHeight - (graphHeight / 4) * (i + 1),
      2,
      "white",
    );
  }

  var percents = [0.3, 0.4, 0.4, 0.3, 0.2, 0.3, 0.4, 0.4, 0.4, 0.4, 0.3, 0.2, 0.2, 0.5, 0.6];
  for (var i = 0; i < percents.length; i++) {
    drawBox(
      60 + (graphWidth / 15) * i,
      boxHeight + 50 + graphHeight * (1 - percents[i]),
      graphWidth / 15 - 10,
      graphHeight * percents[i],
      "#ACE5EE",
    );
  }
}
initCanvas();
initBoxes();
activeGPSStatus();
raimPrediction();
gpsSignalStrength();
constellation();
satelliteStatus();
