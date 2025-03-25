class CDI extends HTMLElement {
    constructor() {
        super(...arguments);
        this.deviation = 0;
        this.isFrom = false;
        this.scale = 5;
        this.noScale = false;
        this.indicatorShape = "Triangle";
    }
    static get observedAttributes() {
        return [
            "deviation",
            "deviation-mode",
            "scale",
            "toFrom",
            "active",
        ];
    }
    connectedCallback() {
        this.parseDefinitionAttributes();
        this.createSVG();
    }
    parseDefinitionAttributes() {
        let noScale = this.getAttribute("no-scale");
        if (noScale) {
            this.noScale = (noScale == "True");
        }
        let indicatorShape = this.getAttribute("indicator-shape");
        if (indicatorShape)
            this.indicatorShape = indicatorShape;
    }
    createSVG() {
        let h = this.noScale ? 10 : 15;
        let cy = h / 2;
        let cx = 100 / 2;
        this.root = document.createElementNS(Avionics.SVG.NS, "svg");
        diffAndSetAttribute(this.root, "width", "100%");
        diffAndSetAttribute(this.root, "height", "100%");
        diffAndSetAttribute(this.root, "viewBox", "0 0 100 " + h);
        this.appendChild(this.root);
        let background = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(background, "x", "0");
        diffAndSetAttribute(background, "y", "0");
        diffAndSetAttribute(background, "width", "100");
        diffAndSetAttribute(background, "height", h + '');
        diffAndSetAttribute(background, "fill", "#1a1d21");
        diffAndSetAttribute(background, "fill-opacity", "0.25");
        diffAndSetAttribute(background, "stroke", "white");
        diffAndSetAttribute(background, "stroke-width", "0.75");
        this.root.appendChild(background);
        for (let i = -4; i <= 4; i++) {
            if (i != 0) {
                let circle = document.createElementNS(Avionics.SVG.NS, "circle");
                diffAndSetAttribute(circle, "cx", (cx + 10 * i) + '');
                diffAndSetAttribute(circle, "cy", cy + '');
                diffAndSetAttribute(circle, "r", "2");
                diffAndSetAttribute(circle, "fill", "none");
                diffAndSetAttribute(circle, "stroke", "white");
                diffAndSetAttribute(circle, "stroke-width", "0.5");
                this.root.appendChild(circle);
            }
        }
        let centerLine = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(centerLine, "x", (cx - 0.5) + '');
        diffAndSetAttribute(centerLine, "y", "0");
        diffAndSetAttribute(centerLine, "width", "0.5");
        diffAndSetAttribute(centerLine, "height", h + '');
        diffAndSetAttribute(centerLine, "fill", "white");
        this.root.appendChild(centerLine);
        if (!this.noScale) {
            let autoText = document.createElementNS(Avionics.SVG.NS, "text");
            diffAndSetAttribute(autoText, "fill", "white");
            diffAndSetAttribute(autoText, "text-anchor", "middle");
            diffAndSetAttribute(autoText, "x", "10");
            diffAndSetAttribute(autoText, "y", (h - 1) + '');
            diffAndSetAttribute(autoText, "font-size", "5");
            diffAndSetAttribute(autoText, "font-family", "Roboto-Bold");
            diffAndSetText(autoText, "AUTO");
            this.root.appendChild(autoText);
            this.scaleText = document.createElementNS(Avionics.SVG.NS, "text");
            diffAndSetAttribute(this.scaleText, "fill", "white");
            diffAndSetAttribute(this.scaleText, "text-anchor", "middle");
            diffAndSetAttribute(this.scaleText, "x", "90");
            diffAndSetAttribute(this.scaleText, "y", (h - 1) + '');
            diffAndSetAttribute(this.scaleText, "font-size", "5");
            diffAndSetAttribute(this.scaleText, "font-family", "Roboto-Bold");
            diffAndSetText(this.scaleText, "5NM");
            this.root.appendChild(this.scaleText);
        }
        {
            let w = this.noScale ? 4 : 5;
            switch (this.indicatorShape.toLowerCase()) {
                case "diamond":
                    this.deviationIndicator = document.createElementNS(Avionics.SVG.NS, "polygon");
                    diffAndSetAttribute(this.deviationIndicator, "points", (cx - w) + "," + cy + " " + cx + "," + (cy + w) + " " + (cx + w) + "," + cy + " " + cx + "," + (cy - w));
                    diffAndSetAttribute(this.deviationIndicator, "fill", "magenta");
                    diffAndSetAttribute(this.deviationIndicator, "stroke", "black");
                    diffAndSetAttribute(this.deviationIndicator, "stroke-width", "0.25");
                    diffAndSetAttribute(this.deviationIndicator, "transform-origin", "center");
                    this.root.appendChild(this.deviationIndicator);
                    break;
                case "triangle":
                default:
                    this.deviationIndicator = document.createElementNS(Avionics.SVG.NS, "polygon");
                    diffAndSetAttribute(this.deviationIndicator, "points", (cx - w) + "," + (cy + w) + " " + (cx + w) + "," + (cy + w) + " " + cx + "," + (cy - w));
                    diffAndSetAttribute(this.deviationIndicator, "fill", "magenta");
                    diffAndSetAttribute(this.deviationIndicator, "stroke", "black");
                    diffAndSetAttribute(this.deviationIndicator, "stroke-width", "0.25");
                    diffAndSetAttribute(this.deviationIndicator, "transform-origin", "center");
                    this.root.appendChild(this.deviationIndicator);
                    break;
            }
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue == newValue) {
            return;
        }
        switch (name) {
            case "deviation":
                this.deviation = parseFloat(newValue);
                this.updateDeviation();
                break;
            case "scale":
                this.scale = parseFloat(newValue);
                if (!this.noScale)
                    diffAndSetText(this.scaleText, newValue + "NM");
                this.updateDeviation();
                break;
            case "toFrom":
                if (newValue == "From") {
                    this.isFrom = true;
                }
                else {
                    this.isFrom = false;
                }
                this.updateDeviation();
                break;
            case "active":
                if (newValue == "True") {
                    diffAndSetAttribute(this.deviationIndicator, "visibility", "");
                }
                else {
                    diffAndSetAttribute(this.deviationIndicator, "visibility", "hidden");
                }
                break;
            case "deviation-mode":
                switch (newValue) {
                    case "VLOC":
                        diffAndSetAttribute(this.deviationIndicator, "fill", "lime");
                        break;
                    case "GPS":
                    default:
                        diffAndSetAttribute(this.deviationIndicator, "fill", "magenta");
                        break;
                }
        }
    }
    updateDeviation() {
        diffAndSetAttribute(this.deviationIndicator, "transform", "translate(" + Math.max(-40, Math.min(40, 40 * this.deviation / this.scale)) + ", 0)" + (this.isFrom ? " scale(1,-1)" : ""));
    }
}
customElements.define('glasscockpit-cdi', CDI);
//# sourceMappingURL=CDI.js.map