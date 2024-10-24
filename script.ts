const canvas = document.getElementById("outerCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

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
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  }
}

function drawRing(x: number, y: number, outerRadius: number, innerRadius: number) {
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

function addText(x: number, y: number, text: string, fontSize: number) {
  if (ctx) {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "black";
    ctx.fillText(text, x, y);
  }
}

function raimPrediction() {
  addText(945, 290, "RAIM Prediction", 25);

  addText(945, 330, "Waypoint", 20);
  addText(945, 370, "ARV Time", 20);
  addText(945, 410, "ARV Date", 20);
}

initCanvas();

//Constellation
drawBox(0, 0, 466, 525, "white");

//Satellite Status
drawBox(467, 0, 466, 525, "white");

//Active GPS Status
drawBox(934, 0, 466, 262, "white");

//RAIM Prediction
drawBox(934, 263, 466, 262, "white");
raimPrediction();

//GPS Signal Strength
drawBox(0, 525, 1400, 525, "white");
