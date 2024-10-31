const canvas = document.getElementById("outerCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const width = canvas.clientWidth;
const height = canvas.clientHeight;

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

function drawBox(x: number, y: number, width: number, height: number, color: string) {
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  }
}

function drawRing(x: number, y: number, outerRadius: number, gap: number) {
  if (ctx) {
    let innerRadius1 = outerRadius - gap;
    let innerRadius2 = outerRadius - 2 * gap;

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

function addText(x: number, y: number, text: string, fontSize: number) {
  if (ctx) {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
  }
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
}

function initBoxes() {
  drawBox(0, 0, 466, 525, "#2f2f2f"); //Constellation
  drawBox(467, 0, 466, 525, "#2f2f2f"); //Satellite Status
  drawBox(934, 0, 466, 262, "#2f2f2f"); //Active GPS Status
  drawBox(934, 263, 466, 262, "#2f2f2f"); //RAIM Prediction
  drawBox(0, 525, 1400, 525, "#2f2f2f"); //GPS Signal Strength
}

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

initCanvas();
initBoxes();
activeGPSStatus();
raimPrediction();
gpsSignalStrength();
constellation();
satelliteStatus();
