import { drawBox } from "./utils";

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

    //debugging
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
