window.onload = () => {
  const outerCanvas = document.getElementById(
    "outerCanvas",
  ) as HTMLCanvasElement;
  const graphCanvas = document.getElementById(
    "graphCanvas",
  ) as HTMLCanvasElement;
  const constellationCanvas = document.getElementById(
    "constellationCanvas",
  ) as HTMLCanvasElement;
  const statusCanvas = document.getElementById(
    "statusCanvas",
  ) as HTMLCanvasElement;
  const activeStatusCanvas = document.getElementById(
    "activeStatusCanvas",
  ) as HTMLCanvasElement;
  const raimCanvas = document.getElementById("raimCanvas") as HTMLCanvasElement;

  if (
    outerCanvas &&
    graphCanvas &&
    constellationCanvas &&
    statusCanvas &&
    activeStatusCanvas &&
    raimCanvas
  ) {
    const outerCtx = outerCanvas.getContext("2d");
    const graphCtx = graphCanvas.getContext("2d");
    const constellationCtx = constellationCanvas.getContext("2d");
    const statusCtx = statusCanvas.getContext("2d");
    const activeStatusCtx = activeStatusCanvas.getContext("2d");
    const raimCtx = raimCanvas.getContext("2d");

    if (
      outerCtx &&
      graphCtx &&
      constellationCtx &&
      statusCtx &&
      activeStatusCtx &&
      raimCtx
    ) {
      outerCanvas.width = outerCanvas.clientWidth;
      outerCanvas.height = outerCanvas.clientHeight;

      graphCanvas.width = outerCanvas.width;
      graphCanvas.height = outerCanvas.height / 2;

      constellationCanvas.width = outerCanvas.width / 3;
      constellationCanvas.height = outerCanvas.height / 2;

      statusCanvas.width = outerCanvas.width / 3;
      statusCanvas.height = outerCanvas.height / 2;

      activeStatusCanvas.width = outerCanvas.width / 3;
      activeStatusCanvas.height = outerCanvas.height / 4;

      raimCanvas.width = outerCanvas.width / 3;
      raimCanvas.height = outerCanvas.height / 4;

      outerCtx.fillStyle = "gray";
      outerCtx.fillRect(0, 0, outerCanvas.width, outerCanvas.height);

      // graphCtx.fillStyle = "yellow";
      // graphCtx.fillRect(0, 0, graphCanvas.width, graphCanvas.height);

      // constellationCtx.fillStyle = "green";
      // constellationCtx.fillRect(
      //   0,
      //   0,
      //   constellationCanvas.width,
      //   constellationCanvas.height,
      // );

      // statusCtx.fillStyle = "blue";
      // statusCtx.fillRect(0, 0, statusCanvas.width, statusCanvas.height);

      // activeStatusCtx.fillStyle = "red";
      // activeStatusCtx.fillRect(
      //   0,
      //   0,
      //   activeStatusCanvas.width,
      //   activeStatusCanvas.height,
      // );

      // raimCtx.fillStyle = "purple";
      // raimCtx.fillRect(0, 0, raimCanvas.width, raimCanvas.height);
      //
      graphCtx.fillStyle = "rgba(255, 0, 0, 0.5)";
      graphCtx.beginPath();
      graphCtx.arc(
        graphCanvas.width / 2,
        graphCanvas.height / 2,
        50,
        0,
        Math.PI * 2,
      );
      graphCtx.fill();
    }
  }
};
