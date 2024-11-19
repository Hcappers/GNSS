export const canvas = document.getElementById("outerCanvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d");
//const width = canvas.clientWidth;
//const height = canvas.clientHeight;

//debugging
if(!ctx){
  console.error("Failed to get canvas context.");
}
export function initCanvas(){
  if(ctx){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.backgroundColor = "black";

    //debugging``
    console.log("Canvas initialized: ", canvas.width, canvas.height);
  }
}

export function initBoxes() {
  drawBox(0, 0, 466, 525, "#2f2f2f"); //Constellation
  drawBox(467, 0, 466, 525, "#2f2f2f"); //Satellite Status
  drawBox(934, 0, 466, 262, "#2f2f2f"); //Active GPS Status
  drawBox(934, 263, 466, 262, "#2f2f2f"); //RAIM Prediction
  drawBox(0, 525, 1400, 525, "#2f2f2f"); //GPS Signal Strengthi
  
  //debugging
  console.log("Boxes initialized");
}
export function drawLine(x1: number, x2: number, y1: number, y2: number, width: number, color: string) {
  if (ctx){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}

export function drawBox(x: number, y: number, width: number, height: number, color: string) {
  if(ctx){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  }
}

export function drawRing(x: number, y: number, outerRadius: number, gap: number) {
  if(ctx){
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

export function addText(x: number, y: number, text: string, fontSize: number) {
  if(ctx){
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
  }
}
