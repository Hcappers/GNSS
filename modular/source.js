System.register("utils", [], function (exports_1, context_1) {
    "use strict";
    var canvas, ctx;
    var __moduleName = context_1 && context_1.id;
    function initCanvas() {
        if (ctx) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            canvas.style.position = "absolute";
            canvas.style.top = "0";
            canvas.style.backgroundColor = "black";
            //debugging``
            console.log("Canvas initialized: ", canvas.width, canvas.height);
        }
    }
    exports_1("initCanvas", initCanvas);
    function initBoxes() {
        drawBox(0, 0, 466, 525, "#2f2f2f"); //Constellation
        drawBox(467, 0, 466, 525, "#2f2f2f"); //Satellite Status
        drawBox(934, 0, 466, 262, "#2f2f2f"); //Active GPS Status
        drawBox(934, 263, 466, 262, "#2f2f2f"); //RAIM Prediction
        drawBox(0, 525, 1400, 525, "#2f2f2f"); //GPS Signal Strengthi
        //debugging
        console.log("Boxes initialized");
    }
    exports_1("initBoxes", initBoxes);
    function drawLine(x1, x2, y1, y2, width, color) {
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.stroke();
        }
    }
    exports_1("drawLine", drawLine);
    function drawBox(x, y, width, height, color) {
        if (ctx) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, width, height);
        }
    }
    exports_1("drawBox", drawBox);
    function drawRing(x, y, outerRadius, gap) {
        if (ctx) {
            var innerRadius1 = outerRadius - gap;
            var innerRadius2 = outerRadius - 2 * gap;
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
    exports_1("drawRing", drawRing);
    function addText(x, y, text, fontSize) {
        if (ctx) {
            ctx.font = "".concat(fontSize, "px Arial");
            ctx.fillStyle = "white";
            ctx.fillText(text, x, y);
        }
    }
    exports_1("addText", addText);
    return {
        setters: [],
        execute: function () {
            exports_1("canvas", canvas = document.getElementById("outerCanvas"));
            exports_1("ctx", ctx = canvas.getContext("2d"));
            //const width = canvas.clientWidth;
            //const height = canvas.clientHeight;
            //debugging
            if (!ctx) {
                console.error("Failed to get canvas context.");
            }
        }
    };
});
System.register("windows", ["utils"], function (exports_2, context_2) {
    "use strict";
    var utils_1;
    var __moduleName = context_2 && context_2.id;
    function constellation() {
        utils_1.drawRing(200, 200, 100, 30);
    }
    exports_2("constellation", constellation);
    function satelliteStatus() {
        utils_1.addText(480, 30, "Satellite Status", 25);
        utils_1.addText(480, 70, "EPU", 20);
        utils_1.addText(800, 70, "_.__NM", 20);
        utils_1.addText(480, 110, "HDOP", 20);
        utils_1.addText(800, 110, "_._", 20);
        utils_1.addText(480, 150, "HFOM", 20);
        utils_1.addText(800, 150, "____NM", 20);
        utils_1.addText(480, 190, "VFOM", 20);
        utils_1.addText(800, 190, "____NM", 20);
        utils_1.addText(480, 230, "Position", 20);
        utils_1.addText(800, 230, "_ __\u00B0__.__'", 20);
        utils_1.addText(800, 270, "_ __\u00B0__.__'", 20);
        utils_1.addText(480, 310, "Time", 20);
        utils_1.addText(800, 310, "__:__:__UTC", 20);
        utils_1.addText(480, 350, "ALT GSL", 20);
        utils_1.addText(800, 350, "_____", 20);
        utils_1.addText(480, 390, "GS", 20);
        utils_1.addText(800, 390, "____._KT", 20);
        utils_1.addText(480, 430, "Track", 20);
        utils_1.addText(800, 430, "___\u00B0", 20);
    }
    exports_2("satelliteStatus", satelliteStatus);
    function activeGPSStatus() {
        utils_1.addText(945, 30, "Active GPS Status", 25);
        utils_1.addText(945, 70, "Pilot", 20);
        utils_1.addText(1275, 70, "____", 20);
        utils_1.addText(945, 110, "Copilot", 20);
        utils_1.addText(1275, 110, "____", 20);
        utils_1.addText(945, 150, "Status", 20);
        utils_1.addText(1275, 150, "____", 20);
        utils_1.addText(945, 190, "SBAS", 20);
        utils_1.addText(1275, 190, "____", 20);
    }
    exports_2("activeGPSStatus", activeGPSStatus);
    function raimPrediction() {
        utils_1.addText(945, 290, "RAIM Prediction", 25);
        utils_1.addText(945, 330, "Waypoint", 20);
        utils_1.addText(1275, 330, "____", 20);
        utils_1.addText(945, 370, "ARV Time", 20);
        utils_1.addText(1275, 370, "__:__UTC", 20);
        utils_1.addText(945, 410, "ARV Date", 20);
        utils_1.addText(1275, 410, "__-___-__", 20);
    }
    exports_2("raimPrediction", raimPrediction);
    function gpsSignalStrength() {
        utils_1.addText(50, 560, "GPS Signal Strength", 25);
        utils_1.drawBox(50, 575, 1300, 425, "#2f2f2f");
        for (var i = 0; i < 3; i++) {
            utils_1.drawLine(50, 1350, 1000 - (425 / 4) * (i + 1), 1000 - (425 / 4) * (i + 1), 2, "white");
        }
        var percents = [0.8, 0.6, 0.4, 0.2];
        for (var i = 0; i < percents.length; i++) {
            utils_1.drawBox(60 + 85 * i, 575 + 425 * (1 - percents[i]), 75, 425 * percents[i], "#ACE5EE");
        }
    }
    exports_2("gpsSignalStrength", gpsSignalStrength);
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("script", ["utils", "windows"], function (exports_3, context_3) {
    "use strict";
    var utils_2, windows_1;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (utils_2_1) {
                utils_2 = utils_2_1;
            },
            function (windows_1_1) {
                windows_1 = windows_1_1;
            }
        ],
        execute: function () {
            utils_2.initCanvas();
            utils_2.initBoxes();
            windows_1.activeGPSStatus();
            windows_1.raimPrediction();
            windows_1.gpsSignalStrength();
            windows_1.constellation();
            windows_1.satelliteStatus();
        }
    };
});
