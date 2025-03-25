var SlipSkidDisplayMode;
(function (SlipSkidDisplayMode) {
    SlipSkidDisplayMode[SlipSkidDisplayMode["ROUND"] = 0] = "ROUND";
    SlipSkidDisplayMode[SlipSkidDisplayMode["DEFAULT"] = 1] = "DEFAULT";
})(SlipSkidDisplayMode || (SlipSkidDisplayMode = {}));
class AttitudeIndicator extends HTMLElement {
    constructor() {
        super();
        this.bankSizeRatio = -24;
        this.backgroundVisible = true;
        this.bottomY = undefined;
        this.turnRateIndicatorShown = false;
        this.turnRateIndicatorMarkerX = 80;
        this.flightDirectorActive = false;
        this.flightDirectorPitch = 0;
        this.flightDirectorBank = 0;
        this.lowBankModeHeight = 500;
        this.lowMaxBankAngle = 15;
        this.aspectRatio = 1.0;
        this.isBackup = false;
        this.horizonTopColor = "#00569d";
        this.horizonBottomColor = "#48432e";
        this.isVerticalCenter = false;
    }
    static get observedAttributes() {
        return [
            "pitch",
            "bank",
            "slip_skid",
            "background",
            "flight_director-active",
            "flight_director-pitch",
            "flight_director-bank",
            "bank_size_ratio",
            "aspect-ratio",
            "is-backup",
            "low-bank-mode"
        ];
    }
    parseDefinitionAttributes() {
        let isVerticalCenter = this.getAttribute("vertical-center");
        if (isVerticalCenter) {
            this.isVerticalCenter = (isVerticalCenter == "True");
        }
        switch (this.getAttribute("slip-skid-display-mode")) {
            case "Round":
                this.slipSkidDisplayMode = SlipSkidDisplayMode.ROUND;
                break;
            default:
                this.slipSkidDisplayMode = SlipSkidDisplayMode.DEFAULT;
                break;
        }
        let turnRateIndicatorShown = this.getAttribute("show-turn-rate");
        if (turnRateIndicatorShown) {
            this.turnRateIndicatorShown = (turnRateIndicatorShown == "True");
        }
        let bottomY = this.getAttribute("bottom-y");
        if (bottomY) {
            this.bottomY = parseFloat(bottomY);
        }
    }
    connectedCallback() {
        this.parseDefinitionAttributes();
        this.construct();
    }
    buildGraduations() {
        if (!this.attitude_pitch)
            return;
        this.attitude_pitch.innerHTML = "";
        let maxDash = 80;
        let fullPrecisionLowerLimit = -20;
        let fullPrecisionUpperLimit = 20;
        let halfPrecisionLowerLimit = -30;
        let halfPrecisionUpperLimit = 45;
        let unusualAttitudeLowerLimit = -30;
        let unusualAttitudeUpperLimit = 50;
        let bigWidth = 120;
        let bigHeight = 3;
        let mediumWidth = 60;
        let mediumHeight = 3;
        let smallWidth = 40;
        let smallHeight = 2;
        let fontSize = 20;
        let angle = -maxDash;
        let nextAngle;
        let width;
        let height;
        let text;
        while (angle <= maxDash) {
            if (angle % 10 == 0) {
                width = bigWidth;
                height = bigHeight;
                text = true;
                if (angle >= fullPrecisionLowerLimit && angle < fullPrecisionUpperLimit) {
                    nextAngle = angle + 2.5;
                }
                else if (angle >= halfPrecisionLowerLimit && angle < halfPrecisionUpperLimit) {
                    nextAngle = angle + 5;
                }
                else {
                    nextAngle = angle + 10;
                }
            }
            else {
                if (angle % 5 == 0) {
                    width = mediumWidth;
                    height = mediumHeight;
                    text = true;
                    if (angle >= fullPrecisionLowerLimit && angle < fullPrecisionUpperLimit) {
                        nextAngle = angle + 2.5;
                    }
                    else {
                        nextAngle = angle + 5;
                    }
                }
                else {
                    width = smallWidth;
                    height = smallHeight;
                    nextAngle = angle + 2.5;
                    text = false;
                }
            }
            if (angle != 0) {
                let rect = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(rect, "fill", "white");
                diffAndSetAttribute(rect, "x", (-width / 2) + '');
                diffAndSetAttribute(rect, "y", (this.bankSizeRatio * angle - height / 2) + '');
                diffAndSetAttribute(rect, "width", width + '');
                diffAndSetAttribute(rect, "height", height + '');
                this.attitude_pitch.appendChild(rect);
                if (text) {
                    let leftText = document.createElementNS(Avionics.SVG.NS, "text");
                    diffAndSetText(leftText, Math.abs(angle) + '');
                    diffAndSetAttribute(leftText, "x", ((-width / 2) - 5) + '');
                    diffAndSetAttribute(leftText, "y", (this.bankSizeRatio * angle - height / 2 + fontSize / 2) + '');
                    diffAndSetAttribute(leftText, "text-anchor", "end");
                    diffAndSetAttribute(leftText, "font-size", fontSize + '');
                    diffAndSetAttribute(leftText, "font-family", "Roboto-Bold");
                    diffAndSetAttribute(leftText, "fill", "white");
                    this.attitude_pitch.appendChild(leftText);
                    let rightText = document.createElementNS(Avionics.SVG.NS, "text");
                    diffAndSetText(rightText, Math.abs(angle) + '');
                    diffAndSetAttribute(rightText, "x", ((width / 2) + 5) + '');
                    diffAndSetAttribute(rightText, "y", (this.bankSizeRatio * angle - height / 2 + fontSize / 2) + '');
                    diffAndSetAttribute(rightText, "text-anchor", "start");
                    diffAndSetAttribute(rightText, "font-size", fontSize + '');
                    diffAndSetAttribute(rightText, "font-family", "Roboto-Bold");
                    diffAndSetAttribute(rightText, "fill", "white");
                    this.attitude_pitch.appendChild(rightText);
                }
                if (angle < unusualAttitudeLowerLimit) {
                    let chevron = document.createElementNS(Avionics.SVG.NS, "path");
                    let path = "M" + -smallWidth / 2 + " " + (this.bankSizeRatio * nextAngle - bigHeight / 2) + " l" + smallWidth + "  0 ";
                    path += "L" + bigWidth / 2 + " " + (this.bankSizeRatio * angle - bigHeight / 2) + " l" + -smallWidth + " 0 ";
                    path += "L0 " + (this.bankSizeRatio * nextAngle + 20) + " ";
                    path += "L" + (-bigWidth / 2 + smallWidth) + " " + (this.bankSizeRatio * angle - bigHeight / 2) + " l" + -smallWidth + " 0 Z";
                    diffAndSetAttribute(chevron, "d", path);
                    diffAndSetAttribute(chevron, "fill", "red");
                    this.attitude_pitch.appendChild(chevron);
                }
                if (angle >= unusualAttitudeUpperLimit && nextAngle <= maxDash) {
                    let chevron = document.createElementNS(Avionics.SVG.NS, "path");
                    let path = "M" + -smallWidth / 2 + " " + (this.bankSizeRatio * angle - bigHeight / 2) + " l" + smallWidth + "  0 ";
                    path += "L" + (bigWidth / 2) + " " + (this.bankSizeRatio * nextAngle + bigHeight / 2) + " l" + -smallWidth + " 0 ";
                    path += "L0 " + (this.bankSizeRatio * angle - 20) + " ";
                    path += "L" + (-bigWidth / 2 + smallWidth) + " " + (this.bankSizeRatio * nextAngle + bigHeight / 2) + " l" + -smallWidth + " 0 Z";
                    diffAndSetAttribute(chevron, "d", path);
                    diffAndSetAttribute(chevron, "fill", "red");
                    this.attitude_pitch.appendChild(chevron);
                }
            }
            angle = nextAngle;
        }
    }
    construct() {
        Utils.RemoveAllChildren(this);
        if (!this.bottomY) {
            this.bottomY = this.isVerticalCenter ? 150 : 100;
        }
        {
            this.horizon = document.createElementNS(Avionics.SVG.NS, "svg");
            diffAndSetAttribute(this.horizon, "width", "100%");
            diffAndSetAttribute(this.horizon, "height", "100%");
            diffAndSetAttribute(this.horizon, "viewBox", this.isVerticalCenter ? "-200 -150 400 300" : "-200 -200 400 300");
            diffAndSetAttribute(this.horizon, "x", "-100");
            diffAndSetAttribute(this.horizon, "y", "-100");
            diffAndSetAttribute(this.horizon, "overflow", "visible");
            diffAndSetAttribute(this.horizon, "style", "position:absolute; z-index: -2; width: 100%; height:100%;");
            this.appendChild(this.horizon);
            this.horizonTop = document.createElementNS(Avionics.SVG.NS, "rect");
            diffAndSetAttribute(this.horizonTop, "fill", (this.backgroundVisible) ? this.horizonTopColor : "transparent");
            diffAndSetAttribute(this.horizonTop, "x", "-1000");
            diffAndSetAttribute(this.horizonTop, "y", "-1000");
            diffAndSetAttribute(this.horizonTop, "width", "2000");
            diffAndSetAttribute(this.horizonTop, "height", "2000");
            this.horizon.appendChild(this.horizonTop);
            this.bottomPart = document.createElementNS(Avionics.SVG.NS, "g");
            this.horizon.appendChild(this.bottomPart);
            this.horizonBottom = document.createElementNS(Avionics.SVG.NS, "rect");
            diffAndSetAttribute(this.horizonBottom, "fill", (this.backgroundVisible) ? this.horizonBottomColor : "transparent");
            diffAndSetAttribute(this.horizonBottom, "x", "-1500");
            diffAndSetAttribute(this.horizonBottom, "y", "0");
            diffAndSetAttribute(this.horizonBottom, "width", "3000");
            diffAndSetAttribute(this.horizonBottom, "height", "3000");
            this.bottomPart.appendChild(this.horizonBottom);
            let separator = document.createElementNS(Avionics.SVG.NS, "rect");
            diffAndSetAttribute(separator, "fill", "#e0e0e0");
            diffAndSetAttribute(separator, "x", "-1500");
            diffAndSetAttribute(separator, "y", "-3");
            diffAndSetAttribute(separator, "width", "3000");
            diffAndSetAttribute(separator, "height", "6");
            this.bottomPart.appendChild(separator);
        }
        let attitudeContainer = document.createElement("div");
        diffAndSetAttribute(attitudeContainer, "id", "Attitude");
        attitudeContainer.style.width = "100%";
        attitudeContainer.style.height = "100%";
        attitudeContainer.style.position = "absolute";
        this.appendChild(attitudeContainer);
        this.root = document.createElementNS(Avionics.SVG.NS, "svg");
        diffAndSetAttribute(this.root, "width", "100%");
        diffAndSetAttribute(this.root, "height", "100%");
        diffAndSetAttribute(this.root, "viewBox", this.isVerticalCenter ? "-200 -150 400 300" : "-200 -200 400 300");
        diffAndSetAttribute(this.root, "overflow", "visible");
        diffAndSetAttribute(this.root, "style", "position:absolute");
        attitudeContainer.appendChild(this.root);
        let refHeight = (this.isBackup) ? 330 : 230;
        let y = (this.isVerticalCenter) ? -80 : -130;
        let attitude_pitch_container = document.createElementNS(Avionics.SVG.NS, "svg");
        diffAndSetAttribute(attitude_pitch_container, "width", "230");
        diffAndSetAttribute(attitude_pitch_container, "height", refHeight + '');
        diffAndSetAttribute(attitude_pitch_container, "x", "-115");
        diffAndSetAttribute(attitude_pitch_container, "y", y + '');
        diffAndSetAttribute(attitude_pitch_container, "viewBox", "-115 " + y + " 230 " + refHeight + '');
        diffAndSetAttribute(attitude_pitch_container, "overflow", "hidden");
        this.root.appendChild(attitude_pitch_container);
        this.attitude_pitch = document.createElementNS(Avionics.SVG.NS, "g");
        attitude_pitch_container.appendChild(this.attitude_pitch);
        this.buildGraduations();
        this.flightDirector = document.createElementNS(Avionics.SVG.NS, "g");
        attitude_pitch_container.appendChild(this.flightDirector);
        let triangleOuterLeft = document.createElementNS(Avionics.SVG.NS, "path");
        diffAndSetAttribute(triangleOuterLeft, "d", "M-140 30 l50 0 L0 0 Z");
        diffAndSetAttribute(triangleOuterLeft, "fill", "#d12bc7");
        this.flightDirector.appendChild(triangleOuterLeft);
        let triangleOuterRight = document.createElementNS(Avionics.SVG.NS, "path");
        diffAndSetAttribute(triangleOuterRight, "d", "M140 30 l-50 0 L0 0 Z");
        diffAndSetAttribute(triangleOuterRight, "fill", "#d12bc7");
        this.flightDirector.appendChild(triangleOuterRight);
        let topY = this.isVerticalCenter ? -120 : -170;
        {
            this.attitude_bank = document.createElementNS(Avionics.SVG.NS, "g");
            this.root.appendChild(this.attitude_bank);
            let topTriangle = document.createElementNS(Avionics.SVG.NS, "path");
            diffAndSetAttribute(topTriangle, "d", "M0 " + topY + " l -20 -30 l40 0 Z");
            diffAndSetAttribute(topTriangle, "fill", "white");
            this.attitude_bank.appendChild(topTriangle);
            let bigDashes = [-60, -30, 30, 60];
            let smallDashes = [-45, -20, -10, 10, 20, 45];
            let radius = -topY;
            let width = 4;
            let height = 30;
            for (let i = 0; i < bigDashes.length; i++) {
                let dash = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(dash, "x", (-width / 2) + '');
                diffAndSetAttribute(dash, "y", (-radius - height) + '');
                diffAndSetAttribute(dash, "height", height + '');
                diffAndSetAttribute(dash, "width", width + '');
                diffAndSetAttribute(dash, "fill", "white");
                diffAndSetAttribute(dash, "transform", "rotate(" + bigDashes[i] + ",0,0)");
                this.attitude_bank.appendChild(dash);
            }
            width = 4;
            height = 20;
            for (let i = 0; i < smallDashes.length; i++) {
                let dash = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(dash, "x", (-width / 2) + '');
                diffAndSetAttribute(dash, "y", (-radius - height) + '');
                diffAndSetAttribute(dash, "height", height + '');
                diffAndSetAttribute(dash, "width", width + '');
                diffAndSetAttribute(dash, "fill", "white");
                diffAndSetAttribute(dash, "transform", "rotate(" + smallDashes[i] + ",0,0)");
                this.attitude_bank.appendChild(dash);
            }
        }
        {
            if (this.turnRateIndicatorShown) {
                let turnRateIndicatorGroup = document.createElementNS(Avionics.SVG.NS, 'g');
                diffAndSetAttribute(turnRateIndicatorGroup, "id", "turnRateIndicator");
                this.turnRateIndicatorY = this.bottomY - 15;
                this.turnRateIndicatorHeight = 15;
                let w = 2;
                this.turnRateIndicator = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(this.turnRateIndicator, "fill", "#eb008b");
                diffAndSetAttribute(this.turnRateIndicator, "width", "0");
                diffAndSetAttribute(this.turnRateIndicator, "height", this.turnRateIndicatorHeight + '');
                diffAndSetAttribute(this.turnRateIndicator, "x", "0");
                diffAndSetAttribute(this.turnRateIndicator, "y", this.turnRateIndicatorY + '');
                turnRateIndicatorGroup.appendChild(this.turnRateIndicator);
                let leftMarker = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(leftMarker, "fill", "white");
                diffAndSetAttribute(leftMarker, "width", w + '');
                diffAndSetAttribute(leftMarker, "height", this.turnRateIndicatorHeight + '');
                diffAndSetAttribute(leftMarker, "x", (-this.turnRateIndicatorMarkerX - w / 2) + '');
                diffAndSetAttribute(leftMarker, "y", this.turnRateIndicatorY + '');
                turnRateIndicatorGroup.appendChild(leftMarker);
                let rightMarker = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(rightMarker, "fill", "white");
                diffAndSetAttribute(rightMarker, "width", w + '');
                diffAndSetAttribute(rightMarker, "height", this.turnRateIndicatorHeight + '');
                diffAndSetAttribute(rightMarker, "x", (this.turnRateIndicatorMarkerX - w / 2) + '');
                diffAndSetAttribute(rightMarker, "y", this.turnRateIndicatorY + '');
                turnRateIndicatorGroup.appendChild(rightMarker);
                let centerMarker = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(centerMarker, "fill", "black");
                diffAndSetAttribute(centerMarker, "width", '1');
                diffAndSetAttribute(centerMarker, "height", this.turnRateIndicatorHeight + '');
                diffAndSetAttribute(centerMarker, "x", '-0.5');
                diffAndSetAttribute(centerMarker, "y", this.turnRateIndicatorY + '');
                turnRateIndicatorGroup.appendChild(centerMarker);
                this.root.appendChild(turnRateIndicatorGroup);
            }
        }
        {
            let cursors = document.createElementNS(Avionics.SVG.NS, "g");
            this.root.appendChild(cursors);
            let leftLower = document.createElementNS(Avionics.SVG.NS, "path");
            diffAndSetAttribute(leftLower, "d", "M-190 0 l-10 12 l50 0 l10 -12 Z");
            diffAndSetAttribute(leftLower, "fill", "#cccc00");
            cursors.appendChild(leftLower);
            let leftUpper = document.createElementNS(Avionics.SVG.NS, "path");
            diffAndSetAttribute(leftUpper, "d", "M-190 0 l-10 -12 l50 0 l10 12 Z");
            diffAndSetAttribute(leftUpper, "fill", "#ffff00");
            cursors.appendChild(leftUpper);
            let rightLower = document.createElementNS(Avionics.SVG.NS, "path");
            diffAndSetAttribute(rightLower, "d", "M190 0 l10 12 l-50 0 l-10 -12 Z");
            diffAndSetAttribute(rightLower, "fill", "#cccc00");
            cursors.appendChild(rightLower);
            let rightUpper = document.createElementNS(Avionics.SVG.NS, "path");
            diffAndSetAttribute(rightUpper, "d", "M190 0 l10 -12 l-50 0 l-10 12 Z");
            diffAndSetAttribute(rightUpper, "fill", "#ffff00");
            cursors.appendChild(rightUpper);
            let triangleInnerLeft = document.createElementNS(Avionics.SVG.NS, "path");
            diffAndSetAttribute(triangleInnerLeft, "d", "M-90 30 l30 0 L0 0 Z");
            diffAndSetAttribute(triangleInnerLeft, "fill", "#ffff00");
            cursors.appendChild(triangleInnerLeft);
            let triangleInnerRight = document.createElementNS(Avionics.SVG.NS, "path");
            diffAndSetAttribute(triangleInnerRight, "d", "M90 30 l-30 0 L0 0 Z");
            diffAndSetAttribute(triangleInnerRight, "fill", "#ffff00");
            cursors.appendChild(triangleInnerRight);
            let topTriangle = document.createElementNS(Avionics.SVG.NS, "path");
            diffAndSetAttribute(topTriangle, "d", "M0 " + topY + " l-13 20 l26 0 Z");
            diffAndSetAttribute(topTriangle, "fill", "white");
            this.root.appendChild(topTriangle);
        }
        {
            switch (this.slipSkidDisplayMode) {
                case SlipSkidDisplayMode.ROUND:
                    let slipSkidGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    diffAndSetAttribute(slipSkidGroup, "id", "slipSkid");
                    let y = this.bottomY - 30;
                    this.slipSkid = document.createElementNS(Avionics.SVG.NS, "circle");
                    diffAndSetAttribute(this.slipSkid, "cx", "0");
                    diffAndSetAttribute(this.slipSkid, "cy", y + '');
                    diffAndSetAttribute(this.slipSkid, "r", "10");
                    diffAndSetAttribute(this.slipSkid, "fill", "white");
                    diffAndSetAttribute(this.slipSkid, "stroke", "black");
                    slipSkidGroup.appendChild(this.slipSkid);
                    let slipSkidLeft = document.createElementNS(Avionics.SVG.NS, "rect");
                    diffAndSetAttribute(slipSkidLeft, "x", "-15");
                    diffAndSetAttribute(slipSkidLeft, "y", (y - 11) + '');
                    diffAndSetAttribute(slipSkidLeft, "width", "4");
                    diffAndSetAttribute(slipSkidLeft, "height", "22");
                    diffAndSetAttribute(slipSkidLeft, "fill", "white");
                    diffAndSetAttribute(slipSkidLeft, "stroke", "black");
                    slipSkidGroup.appendChild(slipSkidLeft);
                    let slipSkidRight = document.createElementNS(Avionics.SVG.NS, "rect");
                    diffAndSetAttribute(slipSkidRight, "x", "11");
                    diffAndSetAttribute(slipSkidRight, "y", (y - 11) + '');
                    diffAndSetAttribute(slipSkidRight, "width", "4");
                    diffAndSetAttribute(slipSkidRight, "height", "22");
                    diffAndSetAttribute(slipSkidRight, "fill", "white");
                    diffAndSetAttribute(slipSkidRight, "stroke", "black");
                    slipSkidGroup.appendChild(slipSkidRight);
                    this.root.appendChild(slipSkidGroup);
                    break;
                case SlipSkidDisplayMode.DEFAULT:
                default:
                    this.slipSkid = document.createElementNS(Avionics.SVG.NS, "path");
                    diffAndSetAttribute(this.slipSkid, "id", "slipSkid");
                    diffAndSetAttribute(this.slipSkid, "d", "M-20 " + (topY + 30) + " l4 -6 h32 l4 6 Z");
                    diffAndSetAttribute(this.slipSkid, "fill", "white");
                    this.root.appendChild(this.slipSkid);
                    break;
            }
        }
        {
            let radius = -topY;
            let maskDef = document.createElementNS(Avionics.SVG.NS, "defs");
            this.root.appendChild(maskDef);
            {
                let clipPath = document.createElementNS(Avionics.SVG.NS, "clipPath");
                maskDef.appendChild(clipPath);
                diffAndSetAttribute(clipPath, "id", "topMask");
                this.lowBankModeMask = document.createElementNS(Avionics.SVG.NS, "path");
                clipPath.appendChild(this.lowBankModeMask);
            }
            this.lowBankMode = document.createElementNS(Avionics.SVG.NS, "g");
            let green_arc = document.createElementNS(Avionics.SVG.NS, "circle");
            diffAndSetAttribute(green_arc, "cx", "0");
            diffAndSetAttribute(green_arc, "cy", "0");
            diffAndSetAttribute(green_arc, "r", (radius + ""));
            diffAndSetAttribute(green_arc, "fill", "transparent");
            diffAndSetAttribute(green_arc, "stroke", "green");
            diffAndSetAttribute(green_arc, "stroke-width", "5");
            this.lowBankMode.appendChild(green_arc);
            diffAndSetAttribute(this.lowBankMode, "clip-path", "url(#topMask)");
            this.root.appendChild(this.lowBankMode);
        }
        this.applyAttributes();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue == newValue)
            return;
        switch (name) {
            case "is-backup":
                this.isBackup = newValue == "true";
                break;
            case "aspect-ratio":
                this.aspectRatio = parseFloat(newValue);
                this.construct();
                break;
            case "pitch":
                this.pitch = parseFloat(newValue);
                break;
            case "bank":
                this.bank = parseFloat(newValue);
                break;
            case "slip_skid":
                this.slipSkidValue = parseFloat(newValue);
                break;
            case "background":
                if (newValue == "false")
                    this.backgroundVisible = false;
                else
                    this.backgroundVisible = true;
                break;
            case "flight_director-active":
                this.flightDirectorActive = newValue == "true";
                break;
            case "flight_director-pitch":
                this.flightDirectorPitch = parseFloat(newValue);
                break;
            case "flight_director-bank":
                this.flightDirectorBank = parseFloat(newValue);
                break;
            case "bank_size_ratio":
                this.bankSizeRatio = parseFloat(newValue);
                this.buildGraduations();
                break;
            case "low-bank-mode":
                this.lowBankModeVisible = SimVar.GetSimVarValue("AUTOPILOT MAX BANK ID", "Bool");
                this.lowMaxBankAngle = parseFloat(newValue);
                break;
            default:
                return;
        }
        this.applyAttributes();
    }
    applyAttributes() {
        if (this.bottomPart)
            diffAndSetAttribute(this.bottomPart, "transform", "rotate(" + this.bank + ", 0, 0) translate(0," + (this.pitch * this.bankSizeRatio) + ")");
        if (this.attitude_pitch)
            diffAndSetAttribute(this.attitude_pitch, "transform", "rotate(" + this.bank + ", 0, 0) translate(0," + (this.pitch * this.bankSizeRatio) + ")");
        if (this.attitude_bank)
            diffAndSetAttribute(this.attitude_bank, "transform", "rotate(" + this.bank + ", 0, 0)");
        if (this.slipSkid)
            diffAndSetAttribute(this.slipSkid, "transform", "translate(" + (this.slipSkidValue * 40) + ", 0)");
        if (this.horizonTop) {
            if (this.backgroundVisible) {
                diffAndSetAttribute(this.horizonTop, "fill", this.horizonTopColor);
                diffAndSetAttribute(this.horizonBottom, "fill", this.horizonBottomColor);
            }
            else {
                diffAndSetAttribute(this.horizonTop, "fill", "transparent");
                diffAndSetAttribute(this.horizonBottom, "fill", "transparent");
            }
        }
        if (this.flightDirector) {
            if (this.flightDirectorActive) {
                diffAndSetAttribute(this.flightDirector, "transform", "rotate(" + (this.bank - this.flightDirectorBank) + ") translate(0 " + ((this.pitch - this.flightDirectorPitch) * this.bankSizeRatio) + ")");
                diffAndSetAttribute(this.flightDirector, "display", "");
            }
            else {
                diffAndSetAttribute(this.flightDirector, "display", "none");
            }
        }
        if (this.turnRateIndicator) {
            let turnRate = Simplane.getTurnRate();
            turnRate *= Avionics.Utils.RAD2DEG;
            if (turnRate < 0) {
                diffAndSetAttribute(this.turnRateIndicator, "transform", "rotate(180, 0, " + (this.turnRateIndicatorY + this.turnRateIndicatorHeight / 2) + ")");
            }
            else {
                diffAndSetAttribute(this.turnRateIndicator, "transform", "rotate(0, 0, " + (this.turnRateIndicatorY + this.turnRateIndicatorHeight / 2) + ")");
            }
            diffAndSetAttribute(this.turnRateIndicator, "width", (Math.abs(turnRate) * (this.turnRateIndicatorMarkerX / 3)).toFixed(6));
        }
        if (this.lowBankModeVisible) {
            diffAndSetAttribute(this.lowBankMode, "display", "");
            diffAndSetAttribute(this.lowBankMode, "transform", "rotate(" + this.bank + ", 0, 0)");
            if (!isNaN(this.lowMaxBankAngle)) {
                let arcAngle = Math.tan(this.lowMaxBankAngle * Avionics.Utils.DEG2RAD) * this.lowBankModeHeight;
                diffAndSetAttribute(this.lowBankModeMask, "d", "M 0 0 L " +
                    -arcAngle + " " + -this.lowBankModeHeight +
                    " L " + arcAngle + " " + -this.lowBankModeHeight + " L 0 0");
            }
        }
        else {
            diffAndSetAttribute(this.lowBankMode, "display", "none");
        }
    }
}
customElements.define('glasscockpit-attitude-indicator', AttitudeIndicator);
//# sourceMappingURL=AttitudeIndicator.js.map