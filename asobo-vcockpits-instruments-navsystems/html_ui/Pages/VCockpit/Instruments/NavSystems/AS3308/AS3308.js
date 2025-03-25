class AS3308 extends NavSystem {
    get templateID() { return "AS3308"; }
    Init() {
        super.Init();
        this.hsIndicator = document.getElementsByTagName("glasscockpit-hsi")[0];
        this.mapInstrument = document.getElementsByTagName("map-instrument")[0];
        this.mapInstrument.init(this);
    }
    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);
        this.hsIndicator.update(_deltaTime);
        this.mapInstrument.update(_deltaTime);
    }
}
registerInstrument("as3308-element", AS3308);
//# sourceMappingURL=AS3308.js.map