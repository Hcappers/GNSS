window.onload = () => {
  const outerCanvas = document.getElementById("outerCanvas") as HTMLCanvasElement;

  if (outerCanvas) {
    const outerCtx = outerCanvas.getContext("2d");

    if (outerCtx) {
      outerCanvas.width = outerCanvas.clientWidth;
      outerCanvas.height = outerCanvas.clientHeight;
      outerCanvas.style.position = "absolute";
      outerCanvas.style.top = "0";
      outerCanvas.style.left = "0";
      outerCanvas.style.backgroundColor = "green";

      //Constellation
      outerCtx.fillStyle = "red";
      outerCtx.fillRect(0, 0, 466, 525);
      outerCtx.strokeStyle = "black";
      outerCtx.lineWidth = 1;
      outerCtx.strokeRect(0, 0, 466, 525);

      //Satellite Status
      outerCtx.fillStyle = "blue";
      outerCtx.fillRect(467, 0, 466, 525);
      outerCtx.strokeStyle = "black";
      outerCtx.lineWidth = 1;
      outerCtx.strokeRect(467, 0, 466, 525);

      //Active GPS Status
      outerCtx.fillStyle = "yellow";
      outerCtx.fillRect(934, 0, 466, 262);
      outerCtx.strokeStyle = "black";
      outerCtx.lineWidth = 1;
      outerCtx.strokeRect(934, 0, 466, 262);

      //RAIM Prediction
      outerCtx.fillStyle = "purple";
      outerCtx.fillRect(934, 263, 466, 262);
      outerCtx.strokeStyle = "black";
      outerCtx.lineWidth = 1;
      outerCtx.strokeRect(934, 263, 466, 262);

      //GPS Signal Strength
      outerCtx.fillStyle = "orange";
      outerCtx.fillRect(0, 525, 1400, 525);
      outerCtx.strokeStyle = "black";
      outerCtx.lineWidth = 1;
      outerCtx.strokeRect(0, 525, 1400, 525);
    }
  }
};
