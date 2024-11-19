import { addText, drawBox, drawRing, drawLine } from "./utils"

export function constellation() {
  drawRing(200, 200, 100, 30);
}

export function satelliteStatus() {
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

export function activeGPSStatus() {
  addText(945, 30, "Active GPS Status", 25);

  addText(945, 70, "Pilot", 20);
  addText(1275, 70, "____", 20);

  addText(945, 110, "Copilot", 20);
  addText(1275, 110, "____", 20);

  addText(945, 150, "Status", 20);
  addText(1275, 150, "____", 20);

  addText(945, 190, "SBAS", 20);
  addText(1275, 190, "____", 20);
}

export function raimPrediction() {
  addText(945, 290, "RAIM Prediction", 25);

  addText(945, 330, "Waypoint", 20);
  addText(1275, 330, "____", 20);

  addText(945, 370, "ARV Time", 20);
  addText(1275, 370, "__:__UTC", 20);

  addText(945, 410, "ARV Date", 20);
  addText(1275, 410, "__-___-__", 20);
}

export function gpsSignalStrength() {
  addText(50, 560, "GPS Signal Strength", 25);
  drawBox(50, 575, 1300, 425, "#2f2f2f");

  for (let i = 0; i < 3; i++) {
    drawLine(50, 1350, 1000 - (425 / 4) * (i + 1), 1000 - (425 / 4) * (i + 1), 2, "white");
  }

  let percents: number[] = [0.8, 0.6, 0.4, 0.2];

  for (let i = 0; i < percents.length; i++) {
    drawBox(60 + 85 * i, 575 + 425 * (1 - percents[i]), 75, 425 * percents[i], "#ACE5EE");
  }
}

