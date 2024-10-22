window.onload = function () {
    var outerCanvas = document.getElementById("outerCanvas");
    if (outerCanvas) {
        var outerCtx = outerCanvas.getContext("2d");
        if (outerCtx) {
            outerCanvas.width = outerCanvas.clientWidth;
            outerCanvas.height = outerCanvas.clientHeight;
            outerCanvas.style.position = "absolute";
            outerCanvas.style.top = "0";
            outerCanvas.style.left = "0";
            outerCanvas.style.backgroundColor = "black";
            //Constellation
            outerCtx.fillStyle = "white";
            outerCtx.fillRect(0, 0, 466, 525);
            outerCtx.strokeStyle = "black";
            outerCtx.lineWidth = 1;
            outerCtx.strokeRect(0, 0, 466, 525);
            outerCtx.fillStyle = "black";
            outerCtx.font = "30px Arial";
            outerCtx.fillText("Constellation", 150, 50);
            //Satellite Status
            outerCtx.fillStyle = "white";
            outerCtx.fillRect(467, 0, 466, 525);
            outerCtx.strokeStyle = "black";
            outerCtx.lineWidth = 1;
            outerCtx.strokeRect(467, 0, 466, 525);
            outerCtx.fillStyle = "black";
            outerCtx.font = "30px Arial";
            outerCtx.fillText("Satellite Status", 600, 50);
            //Active GPS Status
            outerCtx.fillStyle = "white";
            outerCtx.fillRect(934, 0, 466, 262);
            outerCtx.strokeStyle = "black";
            outerCtx.lineWidth = 1;
            outerCtx.strokeRect(934, 0, 466, 262);
            outerCtx.fillStyle = "black";
            outerCtx.font = "30px Arial";
            outerCtx.fillText("Active GPS Status", 1050, 50);
            //RAIM Prediction
            outerCtx.fillStyle = "white";
            outerCtx.fillRect(934, 263, 466, 262);
            outerCtx.strokeStyle = "black";
            outerCtx.lineWidth = 1;
            outerCtx.strokeRect(934, 263, 466, 262);
            outerCtx.fillStyle = "black";
            outerCtx.font = "30px Arial";
            outerCtx.fillText("RAIM Prediction", 1050, 313);
            //GPS Signal Strength
            outerCtx.fillStyle = "white";
            outerCtx.fillRect(0, 525, 1400, 525);
            outerCtx.strokeStyle = "black";
            outerCtx.lineWidth = 1;
            outerCtx.strokeRect(0, 525, 1400, 525);
            outerCtx.fillStyle = "black";
            outerCtx.font = "30px Arial";
            outerCtx.fillText("GPS Signal Strength", 600, 575);
        }
    }
};
