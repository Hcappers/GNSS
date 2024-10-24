const outerCanvas = document.getElementById("outerCanvas") as HTMLCanvasElement;
const canvasCTX = outerCanvas.getContext("2d");

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

function drawBox(x: number, y: number, width: number, height: number, color: string) {
  if (canvasCTX) {
    canvasCTX.fillStyle = color;
    canvasCTX.fillRect(x, y, width, height);
    canvasCTX.strokeStyle = "gray";
    canvasCTX.lineWidth = 1;
    canvasCTX.strokeRect(x, y, width, height);
  }
}

function drawRings(x: number, y: number, outerRadius: number, gap: number) {
  if (canvasCTX) {
    const innerRadius1 = outerRadius - gap; 
    const innerRadius2 = outerRadius - 2 * gap;

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

function addText(x: number, y: number, text: string, fontSize: number, color: string = "white") {
  if (canvasCTX) {
    canvasCTX.font = `${fontSize}px Arial`;
    canvasCTX.fillStyle = color;
    canvasCTX.fillText(text, x, y);
  }
}

// Draw GPS signal strength graph placeholder (empty grid)
function drawSignalStrength(x: number, y: number, width: number, height: number) {
  if(canvasCTX){
    drawBox(x, y, width, height, "black");
    canvasCTX.strokeStyle = "gray";
    const gridSpacing = 50;

    for (let i = x + gridSpacing; i < x + width; i += gridSpacing) {
      canvasCTX.beginPath();
      canvasCTX.moveTo(i, y);
      canvasCTX.lineTo(i, y + height);
      canvasCTX.stroke();
    }

    for (let j = y + gridSpacing; j < y + height; j += gridSpacing) {
      canvasCTX.beginPath();
      canvasCTX.moveTo(x, j);
      canvasCTX.lineTo(x + width, j);
      canvasCTX.stroke();
    }
  }
}

initCanvas();

// Drawing Constellation (Rings)
drawBox(0, 0, 400, 400, "black");  // Bounding box for constellation
drawRings(200, 200, 100, 30); // Concentric rings at (200, 200)

// Satellite Status
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

// Active GPS Status
drawBox(800, 0, 400, 200, "black");
addText(820, 40, "Active GPS Status", 20);
addText(820, 80, "Pilot: GPS1", 20);
addText(820, 120, "Copilot: GPS2", 20);
addText(820, 160, "Status: ACQUIRING", 20);
addText(820, 200, "SBAS: INACTIVE", 20);

// RAIM Prediction
drawBox(800, 200, 400, 200, "black");
addText(820, 240, "RAIM Prediction", 20);
addText(820, 280, "Waypoint: P.POS", 20);
addText(820, 320, "ARV Time: 14:48UTC", 20);
addText(820, 360, "ARV Date: 11-JUL-24", 20);

// GPS Signal Strength
drawSignalStrength(0, 400, 1200, 300);
addText(20, 720, "GPS Signal Strength", 20);
