import { initCanvas, initBoxes } from "./utils"
import { activeGPSStatus, raimPrediction, gpsSignalStrength, constellation, satelliteStatus } from "./windows"

initCanvas();
initBoxes();
activeGPSStatus();
raimPrediction();
gpsSignalStrength();
constellation();
satelliteStatus();

