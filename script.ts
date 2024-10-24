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

function activeGPSStatus() {
  addText(945, 30, "Active GPS Status", 25);

  addText(945, 90, "Pilot", 20);
  addText(945, 130, "Copilot", 20);
  addText(945, 170, "Status", 20);
  addText(945, 210, "SBAS", 20);
}

initCanvas();

//Constellation
drawBox(0, 0, 466, 525, "white");

//Satellite Status
drawBox(467, 0, 466, 525, "white");

//Active GPS Status
drawBox(934, 0, 466, 262, "white");
activeGPSStatus();

//RAIM Prediction
drawBox(934, 263, 466, 262, "white");

//GPS Signal Strength
drawBox(0, 525, 1400, 525, "white");
