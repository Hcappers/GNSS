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

      graphCanvas.width = graphCanvas.clientWidth;
      graphCanvas.height = graphCanvas.clientHeight;

      constellationCanvas.width = constellationCanvas.clientWidth;
      constellationCanvas.height = constellationCanvas.clientHeight;

      statusCanvas.width = statusCanvas.clientWidth;
      statusCanvas.height = statusCanvas.clientHeight;

      activeStatusCanvas.width = activeStatusCanvas.clientWidth;
      activeStatusCanvas.height = activeStatusCanvas.clientHeight;
    }

    outerCanvas.style.position = "absolute";
    outerCanvas.style.top = "0";
    outerCanvas.style.left = "0";
    outerCanvas.style.backgroundColor = "green";

    graphCanvas.style.position = "absolute";
    graphCanvas.style.top = "50%";
    graphCanvas.style.left = "0";
    graphCanvas.style.backgroundColor = "blue";

    constellationCanvas.style.position = "absolute";
    constellationCanvas.style.top = "0";
    constellationCanvas.style.left = "0";
    constellationCanvas.style.backgroundColor = "red";

    // statusCanvas.style.position = "absolute";
    // statusCanvas.style.top = "0";
    // statusCanvas.style.left = "0";
    // statusCanvas.style.backgroundColor = "white";

    // activeStatusCanvas.style.position = "absolute";
    // activeStatusCanvas.style.top = "50%";
    // activeStatusCanvas.style.left = "0";
    // activeStatusCanvas.style.backgroundColor = "pink";
  }
};
