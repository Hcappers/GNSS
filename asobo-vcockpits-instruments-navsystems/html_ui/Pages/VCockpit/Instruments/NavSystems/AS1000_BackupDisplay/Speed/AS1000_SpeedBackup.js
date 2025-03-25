class NewAS1000_SpeedBackup extends BaseInstrument {
    constructor() {
        super();
    }
    get templateID() {
        return "AS1000_SpeedBackup";
    }
    Init() {
        super.Init();
    }
    connectedCallback() {
        super.connectedCallback();
        const electricityElement = document.getElementById("Electricity");
            const divElement = document.createElement("div");
            divElement.setAttribute("id", "HelloWorld");
            divElement.innerHTML = "Hello World!";
            electricityElement.appendChild(divElement);
    }
}
registerInstrument("simple-glasscockpit-sample", NewAS1000_SpeedBackup);