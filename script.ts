const outerCanvas = document.getElementById('outerCanvas') as HTMLCanvasElement; //This is going to be the background of the screen
const constellationScreen = document.createElement('canvas');
const satelliteScreen = document.createElement('canvas');

const ctxOuter = outerCanvas.getContext('2d');
const ctxConstellation = constellationScreen.getContext('2d');
const ctxSatallite = satelliteScreen.getContext('2d');

if (!ctxOuter || !ctxConstellation) {
    throw new Error("Failed to get canvas context");
}

// Set Background of the background canvas
ctxOuter.fillStyle = 'gray';
ctxOuter.fillRect(0, 0, outerCanvas.width, outerCanvas.height);

// Constellation Screen
constellationScreen.width = 100;
constellationScreen.height = 100;
constellationScreen.id = 'constellation'
outerCanvas.parentElement?.appendChild(constellationScreen)
ctxConstellation.fillStyle = 'orange';
ctxConstellation.fillRect(0, 0, constellationScreen.width, constellationScreen.height);
//Need to add border around box
//Need to add text at the top of the box with the word Constellation
//Need to add a GPS rings in the box

//Satellite Status Screen
satelliteScreen.width = 100;
satelliteScreen.height = 100;
satelliteScreen.id = 'satellite'
outerCanvas.parentElement?.appendChild(satelliteScreen)
ctxSatallite.fillStyle = 'black'
ctxSatallite?.fillRect(0,0,satelliteScreen.width, satelliteScreen.height);

//Need to add the following:
//  -EPU
//  -HDOP
//  -VFOM
//Seperation Bar
//  -Position
//  -Time
//  -ALT GSL
//  -GS
//  -Track
//Border with the words 'Satallite Statu' at the top

//Active GPS Status
//  -Pilot
//  -Copilot
//  -Status
//  -SBAS

//RAIM Prediction
//  -Waypoint
//  ARV Time
//  ARV Date

//GPS Signal Strength
//  -15 spots for bar graphs to be added
//
