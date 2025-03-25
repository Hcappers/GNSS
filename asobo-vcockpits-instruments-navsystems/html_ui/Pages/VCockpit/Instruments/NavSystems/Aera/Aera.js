class Aera extends NavSystemTouch {
    constructor() {
        super();
        this.lastPageIndex = NaN;
        this.dataFieldsArray = [];
        this.noButtons = false;
        this.history = [];
        this.initDuration = 4000;
    }
    get templateID() {
        return "Aera";
    }
    get IsGlassCockpit() {
        return false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.pagesContainer = this.getChildById("PagesContainer");
        this.currentPageName = this.getChildById("currentPageName");
        this.topLineLocalTime = this.getChildById("topLine_LocalTime");
        this.altimeter = this.getChildById("Altimeter");
        this.airspeed = this.getChildById("Airspeed");
        this.mfdMapElement = this.getChildById("Map_Elements");
        this.mfdMapMapElement = this.mfdMapElement.getElementsByTagName("map-instrument")[0];
        this.FPLElement = new Aera_ActiveFPL();
        this.addIndependentElementContainer(new NavSystemElementContainer("MainMap", "Map_Elements", new Aera_Map()));
        this.addIndependentElementContainer(new NavSystemElementContainer("Compass Element", "CompassElement", new Aera_compass()));
        this.parametersList = new NavSystemElementContainer("ParametersList", "ParametersList", new Aera_ParametersList());
        this.parametersList.setGPS(this);
        this.declutterMenu = new NavSystemElementContainer("DeclutterMenu", "DeclutterMenuContainer", new Aera_DeclutterMenu());
        this.declutterMenu.setGPS(this);
        this.bugIndicatorMode = new NavSystemElementContainer("Bug Indicator Mode", "BugIndicatorMode", new Aera_BugIndicatorMenu());
        this.bugIndicatorMode.setGPS(this);
        this.insertBeforWaypointWindow = new NavSystemElementContainer("insertBeforeWaypointWindow", "insertBeforeWaypointWindow", new Aera_InsertBeforeWaypoint());
        this.insertBeforWaypointWindow.setGPS(this);
        this.fullKeyboard = new NavSystemElementContainer("Full Keyboard", "fullKeyboard", new Aera_FullKeyboard());
        this.fullKeyboard.setGPS(this);
        this.duplicateWaypointSelection = new NavSystemElementContainer("Waypoint Duplicates", "WaypointDuplicateWindow", new Aera_DuplicateWaypointSelection());
        this.duplicateWaypointSelection.setGPS(this);
        this.pageGroups = [
            new Aera_PageGroup("MFD", this, [
                new Aera_NavSystemPage("Main Menu", "MainMenu", new Aera_MainMenu(), "Menu"),
                new Aera_NavSystemPage("Map", "Map", new NavSystemElementGroup([
                    new Aera_MapContainer("Map"),
                    new Aera_DataFieldsElements(),
                ]), "Map"),
                new Aera_NavSystemPage("Setup Map", "SetupMap", new NavSystemElementGroup([
                    new Aera_SetupMap(),
                    new Aera_MapContainer("SetupMap_Map"),
                ]), "STP"),
                new Aera_NavSystemPage("Active FPL", "FPL", new NavSystemElementGroup([
                    this.FPLElement,
                    new Aera_MapContainer("Afpl_Map"),
                ]), "FPL"),
                new Aera_NavSystemPage("3D Vision", "PFD", new NavSystemElementGroup([
                    new PFD_Altimeter("gpsAlt"),
                    new PFD_Airspeed("gpsSpeed"),
                    new PFD_SimpleCompass(),
                    new PFD_CDI(),
                    new MapInstrumentElement(),
                    new PFD_Attitude(),
                    new Aera_SlipSkid(),
                    new Aera_TurnRate(),
                ]), "PFD"),
                new Aera_NavSystemPage("Approach Selection", "ApproachSelection", new Aera_ApproachSelection(), "Appr"),
                new Aera_NavSystemPage("Waypoints Info", "WaypointsInfo", new NavSystemElementGroup([
                    new Aera_WaypointsInfo(),
                    new Aera_MapContainer("WPTInf_Map"),
                ]), "AWPT"),
                new Aera_NavSystemPage("Direct To", "DirectTo", new NavSystemElementGroup([
                    new Aera_DirectTo(),
                    new Aera_MapContainer("Drct_Map"),
                ]), "Drct"),
                new Aera_NavSystemPage("Nearest", "Nearest", new Aera_Nearest(), "Nrst"),
                new Aera_NavSystemPage("Nearest Airport", "NearestAirport", new Aera_NRST_Airport(), "Apt"),
                new Aera_NavSystemPage("Nearest VOR", "NearestVOR", new Aera_NRST_VOR(), "VOR"),
                new Aera_NavSystemPage("Nearest NDB", "NearestNDB", new Aera_NRST_NDB(), "NDB"),
                new Aera_NavSystemPage("Nearest Int", "NearestIntersection", new Aera_NRST_Intersection(), "INT"),
                new Aera_NavSystemPage("Tools", "Tools", new Aera_Tools(), "TOOLS"),
                new Aera_NavSystemPage("Lighting Configs", "LightingConfigs", new Aera_LightingConfigs(), "LGT"),
                new Aera_NavSystemPage("Show/Hide", "ShowHide", new Aera_ShowHide(), "SH"),
                new Aera_NavSystemPage("Change DataFields", "ChangeDataFieldsMenu", new Aera_ChangeDataFieldsMenu(), "DF"),
            ]),
        ];
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "BRG", this.simVarDatafield, [
            "GPS WP BEARING",
            "degree",
            "°",
            "---.-",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "DTK", this.simVarDatafield, [
            "GPS WP DESIRED TRACK",
            "degree",
            "°",
            "---.-",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "CTS", this.simVarDatafield, [
            "GPS COURSE TO STEER",
            "degree",
            "°",
            "---.-",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "GS", this.simVarDatafield, [
            "GPS GROUND SPEED",
            "knots",
            " kts",
            "---.-",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "ALT", this.simVarDatafield, [
            "GPS POSITION ALT",
            "feet",
            " ft",
            "----",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "DIST NEXT", this.simVarDatafield, [
            "GPS WP DISTANCE",
            "nautical mile",
            " nm",
            "---.-",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "DIST DEST", this.simVarDatafield, [
            "GPS FLIGHTPLAN TOTAL DISTANCE",
            "nautical mile",
            " nm",
            "---.-",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "ETE DEST", this.hoursToSeconds, [
            "SimVar",
            "GPS ETE",
            "seconds",
            "--:--:--",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "ETA DEST", this.hoursToSeconds, [
            "SimVar",
            "GPS ETA",
            "seconds",
            "--:--:--",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "NEXT WPT", this.simVarDatafield, [
            "GPS WP NEXT ID",
            "string",
            "",
            "----",
            "",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "TIME UTC", this.hoursToSeconds, [
            "GlobalVar",
            "ZULU TIME",
            "seconds",
            "--:--:--",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "TIME LOCAL", this.hoursToSeconds, [
            "GlobalVar",
            "LOCAL TIME",
            "seconds",
            "--:--:--",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "VS", this.simVarDatafield, [
            "VERTICAL SPEED",
            "feet per minute",
            " ft/m",
            "---.-",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "WX TEMP", this.simVarDatafield, [
            "AMBIENT TEMPERATURE",
            "celsius",
            "°C",
            "--.-",
            "tofixed",
        ]));
        this.dataFieldsArray.push(new Aera_dataFieldsElement(this, "WX WIND", this.wxWind, [
            "AMBIENT WIND DIRECTION",
            "degree",
            "AMBIENT WIND VELOCITY",
            "knots",
            "--.- / ---.-°",
        ]));
        SimVar.SetSimVarValue("L:IsChangeDataFieldsMenuOn", "Bool", false);
        if (SimVar.GetSimVarValue("L:Aera_IsLocalVarDefined", "boolean") == 0) {
            SimVar.SetSimVarValue("L:Aera_Brightness", "number", 1);
        }
    }
    parseXMLConfig() {
        super.parseXMLConfig();
        if (this.instrumentXmlConfig) {
            let displayModeConfig = this.instrumentXmlConfig.getElementsByTagName("DisplayMode");
            if (displayModeConfig.length > 0 &&
                displayModeConfig[0].textContent.toLowerCase() == "vertical") {
                diffAndSetAttribute(this, "state", "vertical");
            }
            let NoButtons = this.instrumentXmlConfig.getElementsByTagName("NO_BUTTONS_MODE");
            if (NoButtons.length > 0 &&
                NoButtons[0].textContent.toLowerCase() == "true") {
                this.noButtons = true;
            }
            this.addIndependentElementContainer(new NavSystemElementContainer("Right Menu", "RightMenu", new Aera_RightMenu(this.noButtons)));
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    onInteractionEvent(_args) {
        let event;
        if (_args[0].startsWith("INSTRUMENT_PUSH_")) {
            event = _args[0].slice("INSTRUMENT_PUSH_".length);
            switch (event) {
                case "NRST":
                    this.SwitchToPageName("MFD", "Nearest");
                    break;
                case "DIRECTION":
                    this.SwitchToPageName("MFD", "Direct To");
                    break;
                case "RETURN":
                    if (this.history.length == 0) {
                        this.SwitchToPageName("MFD", "Main Menu");
                    }
                    else {
                        this.SwitchToPageName("MFD", this.getCurrentPageGroup().pages[this.history[this.history.length - 2]].name);
                        this.history.pop();
                    }
                    break;
                case "RETURN_LONG":
                    this.SwitchToPageName("MFD", "Main Menu");
                    break;
                case "MENU":
                    if (this.popUpElement) {
                        this.closePopUpElement();
                    }
                    else {
                        this.switchToPopUpPage(this.parametersList);
                    }
                    break;
            }
        }
    }
    getFullKeyboard() {
        return this.fullKeyboard;
    }
    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);
        if (this.lastPageIndex != this.getCurrentPageGroup().pageIndex) {
            this.lastPageIndex = this.getCurrentPageGroup().pageIndex;
            diffAndSetText(this.currentPageName, this.getCurrentPageGroup().pages[this.lastPageIndex].name);
            if (this.lastPageIndex != this.history[this.history.length - 1]) {
                this.history.push(this.lastPageIndex);
            }
        }
        diffAndSetText(this.topLineLocalTime, this.hoursToSeconds(SimVar.GetSimVarValue("E:LOCAL TIME", "seconds")));
        diffAndSetAttribute(this.altimeter, "no-pressure", "true");
        diffAndSetAttribute(this.altimeter, "no-reference-altitude", "true");
        diffAndSetAttribute(this.airspeed, "no-true-airspeed", "true");
    }
    simVarDatafield(_parameters) {
        let value = SimVar.GetSimVarValue(_parameters[0], _parameters[1]);
        if (value) {
            if (_parameters[4] == "tofixed") {
                return value.toFixed(1) + _parameters[2];
            }
            else {
                return value + _parameters[2];
            }
        }
        return _parameters[3];
    }
    hoursToSeconds(_parameters) {
        let time;
        switch (_parameters[0]) {
            case "SimVar":
                time = SimVar.GetSimVarValue(_parameters[1], _parameters[2]);
                break;
            case "GlobalVar":
                time = SimVar.GetGlobalVarValue(_parameters[1], _parameters[2]);
                break;
            case "Formula":
                time = parseInt(_parameters[1]);
                break;
        }
        if (time) {
            let seconds = Math.floor(time % 60);
            let minutes = Math.floor((time / 60) % 60);
            let hours = Math.floor(Math.min(time / 3600, 99));
            return ((hours < 10 ? "0" : "") +
                hours +
                (minutes < 10 ? ":0" : ":") +
                minutes +
                (seconds < 10 ? ":0" : ":") +
                seconds);
        }
        return _parameters[3];
    }
    wxWind(_parameters) {
        let direction = SimVar.GetSimVarValue(_parameters[0], _parameters[1]);
        let velocity = SimVar.GetSimVarValue(_parameters[2], _parameters[3]);
        if (velocity && direction) {
            return velocity.toFixed(1) + " / " + direction.toFixed(1) + "°";
        }
        return _parameters[4];
    }
    heading_CB(_inc) {
        if (_inc) {
            SimVar.SetSimVarValue("K:HEADING_BUG_INC", "number", 0);
        }
        else {
            SimVar.SetSimVarValue("K:HEADING_BUG_DEC", "number", 0);
        }
    }
    altitude_CB(_inc) {
        if (_inc) {
            SimVar.SetSimVarValue("K:AP_ALT_VAR_INC", "number", 0);
        }
        else {
            SimVar.SetSimVarValue("K:AP_ALT_VAR_DEC", "number", 0);
        }
    }
    baro_CB(_inc) {
        if (_inc) {
            SimVar.SetSimVarValue("K:KOHLSMAN_INC", "number", 1);
        }
        else {
            SimVar.SetSimVarValue("K:KOHLSMAN_DEC", "number", 1);
        }
    }
    zoomMap_CB(_inc) {
        if (_inc) {
            this.mfdMapMapElement.onEvent("RANGE_INC");
        }
        else {
            this.mfdMapMapElement.onEvent("RANGE_DEC");
        }
    }
    zoomMapMain_CB(_inc) {
        if (_inc) {
            this.mainMap.onEvent("RANGE_INC");
        }
        else {
            this.mainMap.onEvent("RANGE_DEC");
        }
    }
    selectPage_CB(_inc) {
        if (_inc) {
            this.computeEvent("NavigationSmallInc");
        }
        else {
            this.computeEvent("NavigationSmallDec");
        }
    }
    computeEvent(_event) {
        super.computeEvent(_event);
    }
}
class RightMenuElement {
    constructor(_pageName, _img, _title, _buttonName) {
        this.pageName = _pageName;
        this.img = _img;
        this.title = _title;
        this.buttonName = _buttonName + "BottomButton";
    }
    getButtonName() {
        return this.buttonName;
    }
    getImgSrc() {
        return this.img;
    }
    getTitle() {
        return this.title;
    }
    getPageName() {
        return this.pageName;
    }
}
class Aera_RightMenu extends NavSystemElement {
    constructor(_noButtons) {
        super();
        this.rightMenuElements = [];
        this.noButtons = _noButtons;
    }
    init() {
        this.rightMenu = this.gps.getChildById("RightMenu");
        if (this.noButtons) {
            this.rightMenuElements.push(new RightMenuElement("Main Menu", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_BUTTONBAR_HOME.png", "Main Menu", "MainMenu"));
            this.rightMenuElements.push(new RightMenuElement("", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_CHARTS_1.png", "Menu", "Menu"));
        }
        else {
            this.rightMenuElements.push(new RightMenuElement("3D Vision", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_SMALL_TERRAIN_1.png", "3D Vision", "PFD"));
            this.rightMenuElements.push(new RightMenuElement("Waypoints Info", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_SMALL_WAYPOINT_INFO.png", "WPT Info", "WPT"));
        }
        this.rightMenuElements.push(new RightMenuElement("Active FPL", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_FLIGHT_PLAN_MED_1.png", "Flight Plan", "FPL"));
        this.rightMenuElements.push(new RightMenuElement("Nearest", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_NEAREST_MED_1.png", "Nearest", "Nearest"));
        this.rightMenuElements.push(new RightMenuElement("Direct To", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_DIRECT_TO_1.png", "Direct-To", "Drct"));
        this.rightMenuElements.push(new RightMenuElement("Map", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_SMALL_1.png", "Map", "Map"));
        let buttons = "";
        for (let i = 0; i < this.rightMenuElements.length; i++) {
            buttons +=
                '<div class="gradientButton" id = "' +
                    this.rightMenuElements[i].getButtonName() +
                    '">';
            buttons +=
                '<img class="img" src="' +
                    this.rightMenuElements[i].getImgSrc() +
                    '" />';
            buttons +=
                '<div class="title">' + this.rightMenuElements[i].getTitle() + "</div>";
            buttons += "</div>";
        }
        diffAndSetHTML(this.rightMenu, buttons);
        for (let i = 0; i < this.rightMenuElements.length; i++) {
            if (this.rightMenuElements[i].getTitle() == "Menu") {
                this.gps.makeButton(this.gps.getChildById(this.rightMenuElements[i].getButtonName()), this.toggleParametersList.bind(this));
            }
            else {
                this.gps.makeButton(this.gps.getChildById(this.rightMenuElements[i].getButtonName()), this.gps.SwitchToPageName.bind(this.gps, "MFD", this.rightMenuElements[i].getPageName()));
            }
        }
    }
    onEnter() { }
    onExit() { }
    onEvent() { }
    onUpdate() { }
    toggleParametersList() {
        if (this.gps.popUpElement) {
            this.gps.closePopUpElement();
        }
        else {
            this.gps.switchToPopUpPage(this.gps.parametersList);
        }
    }
}
class Aera_NavSystemPage extends NavSystemPage {
    constructor(_name, _htmlElemId, _element, _shortName) {
        super(_name, _htmlElemId, _element);
        this.shortName = _shortName;
    }
}
class Aera_MainMenu extends NavSystemElement {
    init(root) {
        this.ActFlightPlanButton = this.gps.getChildById("ActFlightPlanButton");
        this.MapButton = this.gps.getChildById("MapButton");
        this.PFDButton = this.gps.getChildById("PFDButton");
        this.DirectToButton = this.gps.getChildById("DirectToButton");
        this.NearestButton = this.gps.getChildById("NearestButton");
        this.WPTButton = this.gps.getChildById("WPTButton");
        this.ToolsButton = this.gps.getChildById("ToolsButton");
        this.gps.makeButton(this.ActFlightPlanButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Active FPL"));
        this.gps.makeButton(this.MapButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Map"));
        this.gps.makeButton(this.PFDButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "3D Vision"));
        this.gps.makeButton(this.DirectToButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Direct To"));
        this.gps.makeButton(this.NearestButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Nearest"));
        this.gps.makeButton(this.WPTButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Waypoints Info"));
        this.gps.makeButton(this.ToolsButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Tools"));
    }
    onEnter() { }
    onEvent() { }
    onExit() { }
    onUpdate() { }
}
class FPLWaypointButton {
    constructor(_gps, _waypoint, _type, _index) {
        this.gps = _gps;
        this.waypoint = _waypoint;
        this.index = _index;
        this.type = _type;
        this.element = "";
        this.element +=
            '<div class="gradientButton" id="WPTListButton_' + this.index + '">';
        this.element += '<div class="line">';
        this.element +=
            '<img src="/Pages/VCockpit/Instruments/Shared/Map/Images/' +
                this.waypoint.GetInfos().imageFileName() +
                '">';
        this.element += '<div class="mainValue">' + this.waypoint.ident + "</div>";
        this.element += '<div class="value1"></div>';
        this.element += '<div class="value2"></div>';
        this.element += "</div>";
        this.element += "</div>";
    }
    updateValues() {
        let button = this.gps.getChildById("WPTListButton_" + this.index);
        button.getElementsByClassName("value1");
        diffAndSetText(button.getElementsByClassName("value1")[0], fastToFixed(this.waypoint.altitudeinFP, 0) + "ft");
        diffAndSetText(button.getElementsByClassName("value2")[0], fastToFixed(this.waypoint.bearingInFP, 0) +
            "°/" +
            fastToFixed(this.waypoint.distanceInFP, 1) +
            "NM");
    }
    getWaypoint() {
        return this.waypoint;
    }
    getType() {
        return this.type;
    }
}
class Aera_ActiveFPL extends NavSystemTouch_ActiveFPL {
    constructor() {
        super(...arguments);
        this.waypointsList = [];
        this.firstRun = true;
        this.frame = 0;
        this.selectedWPTIndex = -1;
        this.waypointsListLength = -1;
        this.waypointsApproachListLength = -1;
    }
    init() {
        this.containerFPL = this.gps.getChildById("ContainerFPL");
        this.Aera_fplName = this.gps.getChildById("AFPL_Name");
        this.Aera_fplTotalDistance = this.gps.getChildById("AFPL_TotalDistance");
        this.waypointsListScrollElement = new NavSystemTouch_ScrollElement();
        this.waypointsListScrollElement.elementContainer = this.containerFPL;
        this.waypointsListScrollElement.elementSize =
            this.containerFPL.getBoundingClientRect().height / 4;
        this.updateDisplay();
    }
    onEvent() { }
    onEnter() {
        this.gps.currFlightPlanManager.updateFlightPlan(this.updateDisplay.bind(this));
        this.gps.currFlightPlanManager.updateCurrentApproach(this.updateDisplay.bind(this));
        this.gps.parametersList.getElementOfType(Aera_ParametersList).toggleSelectApproachButton(this.waypointsList.length > 1);
    }
    onExit() {
        this.selectedWPTIndex = -1;
        for (let i = 0; i < this.waypointsList.length; i++) {
            diffAndSetAttribute(this.gps.getChildById("WPTListButton_" + i), "state", "");
        }
        this.toggleWaypointButtons(false);
        this.gps.parametersList.getElementOfType(Aera_ParametersList).toggleSelectApproachButton(this.gps.currFlightPlanManager.getApproachWaypoints().length > 0);
    }
    onUpdate() {
        if (this.waypointsListScrollElement.elementSize == 0) {
            this.waypointsListScrollElement.elementSize =
                this.containerFPL.getBoundingClientRect().height / 4;
        }
        this.waypointsListScrollElement.update();
        this.frame++;
        if (this.frame > 10) {
            this.gps.currFlightPlanManager.updateFlightPlan(this.updateDisplay.bind(this));
            this.frame = 0;
        }
    }
    updateDisplay() {
        let container = "";
        let waypoints = this.gps.currFlightPlanManager.getWaypoints();
        let approachWaypoints = this.gps.currFlightPlanManager.getApproachWaypoints();
        if (waypoints.length > 0) {
            diffAndSetText(this.Aera_fplName, waypoints[0].ident + "/" + waypoints[waypoints.length - 1].ident);
            diffAndSetText(this.Aera_fplTotalDistance, fastToFixed(SimVar.GetSimVarValue("GPS FLIGHTPLAN TOTAL DISTANCE", "nautical mile"), 1) + " nm");
        }
        else {
            diffAndSetText(this.Aera_fplName, "_____/_____");
            diffAndSetText(this.Aera_fplTotalDistance, "---.- nm");
        }
        if (waypoints.length != this.waypointsListLength ||
            approachWaypoints.length != this.waypointsApproachListLength ||
            this.firstRun) {
            this.waypointsListLength = waypoints.length;
            this.waypointsApproachListLength = approachWaypoints.length;
            this.waypointsList = [];
            this.firstRun = false;
            let index = 0;
            if (waypoints.length > 0) {
                for (let i = 0; i < waypoints.length - 1; i++) {
                    this.waypointsList.push(new FPLWaypointButton(this.gps, waypoints[i], "waypoint", index));
                    container += this.waypointsList[index].element;
                    index++;
                }
                for (let i = 0; i < approachWaypoints.length; i++) {
                    if (approachWaypoints[i].type != "A") {
                        this.waypointsList.push(new FPLWaypointButton(this.gps, approachWaypoints[i], "approachWaypoint", index));
                        container += this.waypointsList[index].element;
                        index++;
                    }
                }
                this.waypointsList.push(new FPLWaypointButton(this.gps, waypoints[waypoints.length - 1], "waypoint", index));
                container += this.waypointsList[index].element;
            }
            container += '<div class="gradientButton" id="FPL_InsertWaypoint">';
            container += '<div class="mainTitle">Touch to add Waypoint</div>';
            container += "</div>";
            diffAndSetHTML(this.containerFPL, container);
            for (let i = 0; i < this.waypointsList.length; i++) {
                let button = this.gps.getChildById("WPTListButton_" + i);
                this.gps.makeButton(button, this.updateSelectedWaypoint.bind(this, i));
                this.waypointsList[i].updateValues();
            }
            this.gps.makeButton(this.gps.getChildById("FPL_InsertWaypoint"), this.insertAtEnd.bind(this));
            this.gps.parametersList.getElementOfType(Aera_ParametersList).toggleSelectApproachButton(waypoints.length > 1);
            if (this.gps.currFlightPlanManager.getDestination()) {
                if (this.currentDestination !=
                    this.gps.currFlightPlanManager.getDestination().ident) {
                    this.currentDestination = this.gps.currFlightPlanManager.getDestination().ident;
                    if (this.gps.currFlightPlanManager.getApproach() != null) {
                        this.gps.currFlightPlanManager.setApproachIndex(-1);
                    }
                }
            }
        }
    }
    insertAfter() {
        this.gps.fullKeyboard.getElementOfType(Aera_FullKeyboard).setContext(this.insertAfterEndKeyboard.bind(this));
        this.gps.switchToPopUpPage(this.gps.fullKeyboard);
    }
    insertAtEnd() {
        this.selectedWPTIndex = this.waypointsList.length;
        this.gps.fullKeyboard.getElementOfType(Aera_FullKeyboard).setContext(this.insertAfterEndKeyboard.bind(this));
        this.gps.switchToPopUpPage(this.gps.fullKeyboard);
    }
    insertAfterEndKeyboard(_icao) {
        this.gps.currFlightPlanManager.addWaypoint(_icao, this.selectedWPTIndex + 1);
        this.toggleWaypointButtons(false);
        this.gps.closePopUpElement();
    }
    removeWaypoint() {
        let index = this.gps.currFlightPlanManager.indexOfWaypoint(this.waypointsList[this.selectedWPTIndex].getWaypoint());
        this.gps.currFlightPlanManager.removeWaypoint(index, true);
        this.updateSelectedWaypoint(-1);
        this.toggleWaypointButtons(false);
        this.gps.closePopUpElement();
    }
    updateSelectedWaypoint(_index) {
        this.gps.closePopUpElement();
        for (let i = 0; i < this.waypointsList.length; i++) {
            if (i == _index) {
                if (this.gps.getChildById("WPTListButton_" + i).getAttribute("state") ==
                    "selected") {
                    diffAndSetAttribute(this.gps.getChildById("WPTListButton_" + i), "state", "");
                    this.toggleWaypointButtons(false);
                }
                else {
                    diffAndSetAttribute(this.gps.getChildById("WPTListButton_" + i), "state", "selected");
                    if (this.waypointsList[i].getType() == "waypoint") {
                        this.toggleWaypointButtons(true);
                    }
                    else {
                        this.toggleWaypointButtons(false);
                    }
                }
            }
            else {
                diffAndSetAttribute(this.gps.getChildById("WPTListButton_" + i), "state", "");
            }
        }
        this.selectedWPTIndex = _index;
    }
    toggleWaypointButtons(_state) {
        this.gps.parametersList.getElementOfType(Aera_ParametersList).toggleWaypointButtons(_state);
    }
}
class Aera_MapContainer extends NavSystemElement {
    constructor(_containerId) {
        super();
        this.containerId = _containerId;
    }
    init(root) {
        this.mapContainerElement = this.gps.getChildById(this.containerId);
        this.dataFieldsContainer = this.gps.getChildById("DataFieldsContainer");
        this.compassElement = this.gps.getChildById("CompassElement");
    }
    onEnter() {
        if (this.gps.mfdMapElement.parentElement != this.mapContainerElement) {
            this.mapContainerElement.appendChild(this.gps.mfdMapElement);
        }
        this.gps.mfdMapMapElement.resize();
        this.deactiveInfosOnMap();
    }
    onUpdate(_deltaTime) { }
    onExit() {
        this.activeInfosOnMap();
    }
    onEvent(_event) { }
    deactiveInfosOnMap() {
        if (this.containerId == "SetupMap_Map") {
            diffAndSetAttribute(this.dataFieldsContainer, "state", "Inactive");
        }
        if (this.containerId != "Map" && this.containerId != "SetupMap_Map") {
            diffAndSetAttribute(this.dataFieldsContainer, "state", "Inactive");
            diffAndSetAttribute(this.compassElement, "state", "Inactive");
        }
    }
    activeInfosOnMap() {
        if (SimVar.GetSimVarValue("L:isDataFieldActive", "Bool")) {
            diffAndSetAttribute(this.dataFieldsContainer, "state", "Active");
        }
        if (SimVar.GetSimVarValue("L:isCompassDisplayed", "Bool")) {
            diffAndSetAttribute(this.compassElement, "state", "Active");
        }
    }
}
class Aera_Map extends MapInstrumentElement {
    constructor() {
        super(...arguments);
        this.wasOverride = false;
    }
    init(root) {
        super.init(root);
        this.mapPlus = root.querySelector(".mapPlus");
        this.mapLess = root.querySelector(".mapLess");
        this.mapCenter = root.querySelector(".mapCenter");
        this.gps.makeButton(this.mapPlus, this.instrument.onEvent.bind(this.instrument, "RANGE_DEC"));
        this.gps.makeButton(this.mapLess, this.instrument.onEvent.bind(this.instrument, "RANGE_INC"));
        this.gps.makeButton(this.mapCenter, this.centerOnPlane.bind(this));
        this.instrument.addEventListener("mousedown", this.moveMode.bind(this));
        this.instrument.supportMouseWheel(false);
    }
    moveMode(_event) {
        if (_event.button == 0) {
            diffAndSetAttribute(this.instrument, "bing-mode", "vfr");
            diffAndSetAttribute(this.mapCenter, "state", "Active");
            this.gps.closePopUpElement();
        }
    }
    centerOnPlane() {
        this.instrument.setCenteredOnPlane();
        diffAndSetAttribute(this.mapCenter, "state", "Inactive");
        this.gps.closePopUpElement();
    }
    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);
        let isPositionOverride = SimVar.GetSimVarValue("L:Aera_IsPositionOverride", "number") != 0;
        if (isPositionOverride) {
            if (!this.wasOverride) {
                diffAndSetAttribute(this.instrument, "bing-mode", "vfr");
                this.wasOverride = true;
            }
            this.instrument.setCenter(new LatLong(SimVar.GetSimVarValue("L:Aera_OverrideLatitude", "number"), SimVar.GetSimVarValue("L:Aera_OverrideLongitude", "number")));
        }
        else {
            if (this.wasOverride) {
                this.instrument.setCenteredOnPlane();
                this.wasOverride = false;
            }
        }
    }
}
class Aera_compass extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.viewBoxWidth = 800;
        this.viewBoxHeight = 1200;
        this.Xcircle = 400;
        this.Ycircle = 1100;
        this.circleRadius = 1000;
    }
    init() {
        this.compassContainer = this.gps.getChildById("CompassElement");
        diffAndSetAttribute(this.compassContainer, "state", "Inactive");
        this.root = document.createElementNS(Avionics.SVG.NS, "svg");
        diffAndSetAttribute(this.root, "width", "100%");
        diffAndSetAttribute(this.root, "height", "100%");
        diffAndSetAttribute(this.root, "viewBox", "0 0 " + this.viewBoxWidth + " " + this.viewBoxHeight);
        this.compassContainer.appendChild(this.root);
        let maskDef = document.createElementNS(Avionics.SVG.NS, "defs");
        this.root.appendChild(maskDef);
        {
            let clipPath = document.createElementNS(Avionics.SVG.NS, "clipPath");
            maskDef.appendChild(clipPath);
            diffAndSetAttribute(clipPath, "id", "topMask");
            let mask = document.createElementNS(Avionics.SVG.NS, "path");
            clipPath.appendChild(mask);
            diffAndSetAttribute(mask, "d", "M 0 0 L " +
                (this.viewBoxWidth - 50) +
                " 0 L " +
                this.Xcircle +
                " " +
                this.Ycircle +
                " L 50 0");
        }
        let compassElement = document.createElementNS(Avionics.SVG.NS, "g");
        this.root.appendChild(compassElement);
        diffAndSetAttribute(compassElement, "clip-path", "url(#topMask)");
        let fixedGroup = document.createElementNS(Avionics.SVG.NS, "g");
        compassElement.appendChild(fixedGroup);
        {
            let arc = document.createElementNS(Avionics.SVG.NS, "circle");
            fixedGroup.appendChild(arc);
            diffAndSetAttribute(arc, "fill", "transparent");
            diffAndSetAttribute(arc, "stroke", "white");
            diffAndSetAttribute(arc, "stroke-width", "7");
            diffAndSetAttribute(arc, "cx", this.Xcircle.toFixed());
            diffAndSetAttribute(arc, "cy", this.Ycircle.toFixed());
            diffAndSetAttribute(arc, "r", this.circleRadius.toFixed());
            let indicator = document.createElementNS(Avionics.SVG.NS, "path");
            fixedGroup.appendChild(indicator);
            diffAndSetAttribute(indicator, "fill", "transparent");
            diffAndSetAttribute(indicator, "stroke", "white");
            diffAndSetAttribute(indicator, "stroke-width", "5");
            diffAndSetAttribute(indicator, "d", "M 350 65 L 350 80 L 380 80 L 400 100 L 420 80 L 450 80 L 450 65");
            this.indicatorValue = document.createElementNS(Avionics.SVG.NS, "text");
            fixedGroup.appendChild(this.indicatorValue);
            diffAndSetAttribute(this.indicatorValue, "fill", "white");
            diffAndSetAttribute(this.indicatorValue, "x", "360");
            diffAndSetAttribute(this.indicatorValue, "y", "74");
            diffAndSetAttribute(this.indicatorValue, "font-size", "40");
            let MIndicator = document.createElementNS(Avionics.SVG.NS, "text");
            fixedGroup.appendChild(MIndicator);
            diffAndSetAttribute(MIndicator, "fill", "white");
            diffAndSetAttribute(MIndicator, "x", "432");
            diffAndSetAttribute(MIndicator, "y", "74");
            diffAndSetAttribute(MIndicator, "font-size", "20");
            diffAndSetText(MIndicator, "M");
        }
        let textOrientation = ["N", "E", "S", "W"];
        this.rotationGroup = document.createElementNS(Avionics.SVG.NS, "g");
        compassElement.appendChild(this.rotationGroup);
        {
            for (let i = 0; i < 360; i = i + 10) {
                let graduationGroup = document.createElementNS(Avionics.SVG.NS, "g");
                this.rotationGroup.appendChild(graduationGroup);
                diffAndSetAttribute(graduationGroup, "transform", "translate(" +
                    (this.viewBoxWidth / 2).toFixed() +
                    " " +
                    (this.Ycircle - this.circleRadius).toFixed() +
                    ") rotate(" +
                    i +
                    " 0 " +
                    this.circleRadius +
                    ")");
                let graduationLine = document.createElementNS(Avionics.SVG.NS, "line");
                graduationGroup.appendChild(graduationLine);
                diffAndSetAttribute(graduationLine, "stroke", "white");
                diffAndSetAttribute(graduationLine, "x1", "0");
                diffAndSetAttribute(graduationLine, "y1", "30");
                diffAndSetAttribute(graduationLine, "x2", "0");
                diffAndSetAttribute(graduationLine, "y2", "0");
                diffAndSetAttribute(graduationLine, "stroke-width", "3");
                let graduationValue = document.createElementNS(Avionics.SVG.NS, "text");
                graduationGroup.appendChild(graduationValue);
                diffAndSetAttribute(graduationValue, "text-anchor", "middle");
                diffAndSetAttribute(graduationValue, "x", "0");
                diffAndSetAttribute(graduationValue, "y", "60");
                diffAndSetAttribute(graduationValue, "font-size", "30");
                diffAndSetAttribute(graduationValue, "fill", "white");
                diffAndSetAttribute(graduationValue, "font-family", "Roboto");
                if (i % 90 == 0) {
                    diffAndSetText(graduationValue, textOrientation[Math.round(i) / 90]);
                }
                else {
                    diffAndSetText(graduationValue, fastToFixed(i / 10, 0));
                }
            }
        }
        this.bugIndicator = document.createElementNS(Avionics.SVG.NS, "path");
        compassElement.appendChild(this.bugIndicator);
        {
            diffAndSetAttribute(this.bugIndicator, "fill", "transparent");
            diffAndSetAttribute(this.bugIndicator, "stroke", "#be2edd");
            diffAndSetAttribute(this.bugIndicator, "stroke-width", "5");
            diffAndSetAttribute(this.bugIndicator, "d", "M 0 30 L 10 0 L 20 30");
            diffAndSetAttribute(this.bugIndicator, "transform", "translate(390 105) rotate(0 10 995)");
            diffAndSetAttribute(this.bugIndicator, "visibility", "hidden");
        }
    }
    onEnter() { }
    onExit() { }
    onEvent() { }
    onUpdate() {
        let planeBearing = Simplane.getHeadingMagnetic();
        diffAndSetAttribute(this.rotationGroup, "transform", "rotate(" +
            fastToFixed(360 - planeBearing, 3) +
            " " +
            this.Xcircle +
            " " +
            this.Ycircle +
            ")");
        diffAndSetText(this.indicatorValue, fastToFixed(planeBearing, 0).padStart(3, "0") + "°");
        let mode = SimVar.GetSimVarValue("L:Map_BugIndicator_Mode", "number");
        if (SimVar.GetSimVarValue("GPS IS ACTIVE FLIGHT PLAN", "Bool") &&
            mode != 0) {
            diffAndSetAttribute(this.bugIndicator, "visibility", "visible");
            let heading;
            switch (mode) {
                case 1:
                    heading = SimVar.GetSimVarValue("GPS WP BEARING", "degree");
                    break;
                case 2:
                    heading = SimVar.GetSimVarValue("GPS WP DESIRED TRACK", "degree");
                    break;
            }
            diffAndSetAttribute(this.bugIndicator, "transform", "translate(390 105) rotate(" +
                fastToFixed(360 - (planeBearing - heading), 3) +
                " 10 995)");
        }
        else {
            diffAndSetAttribute(this.bugIndicator, "visibility", "hidden");
        }
    }
}
class Aera_SetupMap extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.mapOrientationArray = [
            EMapRotationMode.NorthUp,
            EMapRotationMode.TrackUp,
            EMapRotationMode.HDGUp,
        ];
        this.mapOrientationMode = EMapRotationMode.NorthUp;
        this.isCompassDisplayed = false;
    }
    init() {
        this.setupMap = this.gps.getChildById("SetupMap");
        this.compassElement = this.gps.getChildById("CompassElement");
        this.mapOrientationButton = this.gps.getChildById("MapOrientationButton");
        this.setCompassButton = this.gps.getChildById("SetCompassButton");
        this.mapElement = this.gps.getElementOfType(MapInstrumentElement);
        diffAndSetText(this.mapOrientationButton.children[0], "DTK Up");
        diffAndSetText(this.setCompassButton.children[0], "On");
        diffAndSetAttribute(this.compassElement, "state", "Inactive");
        diffAndSetAttribute(this.setCompassButton, "state", "Greyed");
        this.gps.makeButton(this.mapOrientationButton, this.switchOrientation.bind(this));
        this.gps.makeButton(this.setCompassButton, this.toggleCompass.bind(this));
    }
    onEnter() { }
    onExit() { }
    onEvent() { }
    onUpdate() { }
    switchOrientation() {
        this.mapOrientationMode =
            this.mapOrientationMode >= this.mapOrientationArray.length - 1
                ? 0
                : this.mapOrientationMode + 1;
        this.mapElement.setRotationMode(this.mapOrientationArray[this.mapOrientationMode]);
        switch (this.mapOrientationArray[this.mapOrientationMode]) {
            case EMapRotationMode.NorthUp:
                diffAndSetText(this.mapOrientationButton.children[0], "DTK Up");
                diffAndSetAttribute(this.setCompassButton, "state", "Greyed");
                this.setIsCompassDisplayed(false);
                diffAndSetAttribute(this.compassElement, "state", "Inactive");
                diffAndSetText(this.setCompassButton.children[0], "Off");
                break;
            case EMapRotationMode.TrackUp:
                diffAndSetText(this.mapOrientationButton.children[0], "HDG Up");
                diffAndSetAttribute(this.setCompassButton, "state", "Greyed");
                break;
            case EMapRotationMode.HDGUp:
                diffAndSetText(this.mapOrientationButton.children[0], "North Up");
                diffAndSetAttribute(this.setCompassButton, "state", "");
                this.setIsCompassDisplayed(false);
                diffAndSetAttribute(this.compassElement, "state", "Inactive");
                diffAndSetText(this.setCompassButton.children[0], "On");
                break;
        }
    }
    setIsCompassDisplayed(_state) {
        this.isCompassDisplayed = _state;
        diffAndSetAttribute(this.gps.getChildById("Button_SetBugIndicator"), "state", this.isCompassDisplayed ? "" : "Greyed");
        SimVar.SetSimVarValue("L:isCompassDisplayed", "Bool", this.isCompassDisplayed);
    }
    toggleCompass() {
        this.setIsCompassDisplayed(!this.isCompassDisplayed);
        diffAndSetAttribute(this.compassElement, "state", this.isCompassDisplayed ? "Active" : "Inactive");
        diffAndSetText(this.setCompassButton.children[0], this.isCompassDisplayed ? "Off" : "On");
    }
}
class Aera_PFD extends Aera_NavSystemPage {
    constructor() {
        super("3D Vision", "PFD", null, "3D Vision");
        this.mapInstrument = new MapInstrumentElement();
        this.airspeed = new PFD_Airspeed("gpsspeed");
        this.element = new NavSystemElementGroup([
            new PFD_Altimeter(),
            this.airspeed,
            new PFD_SimpleCompass(),
            new PFD_CDI(),
            this.mapInstrument,
            new PFD_Attitude(),
            new Aera_SlipSkid(),
            new Aera_TurnRate(),
        ]);
        this.mapInstrument.setGPS(this.gps);
    }
    init() {
        super.init();
        this.altimeterElement = this.gps.getChildById("Altimeter");
    }
    onUpdate() {
        diffAndSetAttribute(this.altimeterElement, "selected-altitude-alert", "Empty");
    }
    setVertical(_val) {
        this.airspeed.alwaysDisplaySpeed = _val;
    }
}
class Aera_SlipSkid extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.slipCoeff = 189;
    }
    init() {
        this.slipSkidIndicator = this.gps.getChildById("SlipSkidIndicator");
        let slipIndicatorContainer = document.createElementNS(Avionics.SVG.NS, "svg");
        diffAndSetAttribute(slipIndicatorContainer, "id", "slipIndicatorContainer");
        diffAndSetAttribute(slipIndicatorContainer, "width", "400");
        diffAndSetAttribute(slipIndicatorContainer, "height", "50");
        diffAndSetAttribute(slipIndicatorContainer, "viewBox", "0 0 400 50");
        let slipIndicatorBackground = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(slipIndicatorBackground, "id", "slipIndicatorBackground");
        diffAndSetAttribute(slipIndicatorBackground, "fill", "#1a1d21");
        diffAndSetAttribute(slipIndicatorBackground, "fill-opacity", "0.25");
        diffAndSetAttribute(slipIndicatorBackground, "width", "400");
        diffAndSetAttribute(slipIndicatorBackground, "height", "50");
        diffAndSetAttribute(slipIndicatorBackground, "x", "0");
        diffAndSetAttribute(slipIndicatorBackground, "y", "0");
        diffAndSetAttribute(slipIndicatorBackground, "rx", "20");
        let leftMarker = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(leftMarker, "id", "slipIndicatorLeftMarker");
        diffAndSetAttribute(leftMarker, "fill", "white");
        diffAndSetAttribute(leftMarker, "width", "10");
        diffAndSetAttribute(leftMarker, "height", "50");
        diffAndSetAttribute(leftMarker, "x", "166");
        diffAndSetAttribute(leftMarker, "y", "0");
        let rightMarker = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(rightMarker, "id", "slipIndicatorRightMarker");
        diffAndSetAttribute(rightMarker, "fill", "white");
        diffAndSetAttribute(rightMarker, "width", "10");
        diffAndSetAttribute(rightMarker, "height", "50");
        diffAndSetAttribute(rightMarker, "x", "224");
        diffAndSetAttribute(rightMarker, "y", "0");
        this.slipElement = document.createElementNS(Avionics.SVG.NS, "circle");
        diffAndSetAttribute(this.slipElement, "id", "slipIndicator");
        diffAndSetAttribute(this.slipElement, "fill", "white");
        diffAndSetAttribute(this.slipElement, "r", "24");
        diffAndSetAttribute(this.slipElement, "cx", "200");
        diffAndSetAttribute(this.slipElement, "cy", "25");
        slipIndicatorContainer.appendChild(slipIndicatorBackground);
        slipIndicatorContainer.appendChild(leftMarker);
        slipIndicatorContainer.appendChild(rightMarker);
        slipIndicatorContainer.appendChild(this.slipElement);
        this.slipSkidIndicator.appendChild(slipIndicatorContainer);
    }
    onEnter() { }
    onExit() { }
    onEvent() { }
    onUpdate() {
        let slip = Simplane.getInclinometer();
        if (this.slipElement) {
            diffAndSetAttribute(this.slipElement, "transform", "translate(" + slip * this.slipCoeff + "" + ",0)");
        }
    }
}
class Aera_TurnRate extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.slipCoeff = 40;
    }
    init() {
        this.turnRateIndicator = this.gps.getChildById("TurnRateIndicator");
        let turnRateContainer = document.createElementNS(Avionics.SVG.NS, "svg");
        diffAndSetAttribute(turnRateContainer, "id", "slipIndicatorContainer");
        diffAndSetAttribute(turnRateContainer, "width", "1000");
        diffAndSetAttribute(turnRateContainer, "height", "60");
        diffAndSetAttribute(turnRateContainer, "viewBox", "0 0 1000 60");
        let turnRateIndicatorBackground = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(turnRateIndicatorBackground, "id", "turnRateIndicatorBackground");
        diffAndSetAttribute(turnRateIndicatorBackground, "fill", "#1a1d21");
        diffAndSetAttribute(turnRateIndicatorBackground, "fill-opacity", "0");
        diffAndSetAttribute(turnRateIndicatorBackground, "width", "1000");
        diffAndSetAttribute(turnRateIndicatorBackground, "height", "60");
        diffAndSetAttribute(turnRateIndicatorBackground, "x", "0");
        diffAndSetAttribute(turnRateIndicatorBackground, "y", "0");
        let leftMarker = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(leftMarker, "id", "turnRateIndicatorLeftMarker");
        diffAndSetAttribute(leftMarker, "fill", "white");
        diffAndSetAttribute(leftMarker, "stroke", "black");
        diffAndSetAttribute(leftMarker, "stroke-width", "0.4");
        diffAndSetAttribute(leftMarker, "width", "10");
        diffAndSetAttribute(leftMarker, "height", "60");
        diffAndSetAttribute(leftMarker, "x", "0");
        diffAndSetAttribute(leftMarker, "y", "0");
        let centerMarker = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(centerMarker, "id", "turnRateIndicatorCenterMarker");
        diffAndSetAttribute(centerMarker, "fill", "white");
        diffAndSetAttribute(centerMarker, "stroke", "black");
        diffAndSetAttribute(centerMarker, "stroke-width", "0.4");
        diffAndSetAttribute(centerMarker, "width", "10");
        diffAndSetAttribute(centerMarker, "height", "60");
        diffAndSetAttribute(centerMarker, "x", "495");
        diffAndSetAttribute(centerMarker, "y", "0");
        let rightMarker = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(rightMarker, "id", "turnRateIndicatorRightMarker");
        diffAndSetAttribute(rightMarker, "fill", "white");
        diffAndSetAttribute(rightMarker, "stroke", "black");
        diffAndSetAttribute(rightMarker, "stroke-width", "0.4");
        diffAndSetAttribute(rightMarker, "width", "10");
        diffAndSetAttribute(rightMarker, "height", "60");
        diffAndSetAttribute(rightMarker, "x", "990");
        diffAndSetAttribute(rightMarker, "y", "0");
        this.turnRateElement = document.createElementNS(Avionics.SVG.NS, "rect");
        diffAndSetAttribute(this.turnRateElement, "id", "turnRateIndicator");
        diffAndSetAttribute(this.turnRateElement, "fill", "#be2edd");
        diffAndSetAttribute(this.turnRateElement, "width", "100");
        diffAndSetAttribute(this.turnRateElement, "height", "60");
        diffAndSetAttribute(this.turnRateElement, "x", "495");
        diffAndSetAttribute(this.turnRateElement, "y", "0");
        turnRateContainer.appendChild(turnRateIndicatorBackground);
        turnRateContainer.appendChild(this.turnRateElement);
        turnRateContainer.appendChild(leftMarker);
        turnRateContainer.appendChild(centerMarker);
        turnRateContainer.appendChild(rightMarker);
        this.turnRateIndicator.appendChild(turnRateContainer);
    }
    onEnter() { }
    onExit() { }
    onEvent() { }
    onUpdate() {
        let turnRate = Simplane.getTurnRate();
        if (this.turnRateElement) {
            turnRate *= Avionics.Utils.RAD2DEG;
            if (turnRate < 0) {
                diffAndSetAttribute(this.turnRateElement, "transform", "rotate(180, 495, 30)");
            }
            else {
                diffAndSetAttribute(this.turnRateElement, "transform", "rotate(0, 495, 30)");
            }
            diffAndSetAttribute(this.turnRateElement, "width", (Math.abs(turnRate) * this.slipCoeff).toFixed(6));
        }
    }
}
class Aera_FullKeyboard extends NavSystemTouch_FullKeyboard {
    init(_root) {
        super.init(_root);
        this.cancelButton = this.gps.getChildById("FK_Cancel");
        this.enterButton = this.gps.getChildById("FK_Enter");
        this.gps.makeButton(this.cancelButton, this.cancel.bind(this));
        this.gps.makeButton(this.enterButton, this.validate.bind(this));
    }
    setContext(_endCallback, _types = "AVNW") {
        super.setContext(_endCallback, _types);
        this.lastPopUp = this.gps.popUpElement;
    }
    cancel() {
        this.gps.closePopUpElement();
    }
    validate() {
        let nbMatched = SimVar.GetSimVarValue("C:fs9gps:IcaoSearchMatchedIcaosNumber", "number", this.gps.instrumentIdentifier);
        if (nbMatched > 1) {
            this.gps
                .duplicateWaypointSelection.element.setContext(this.endCallback, this.lastPopUp);
            this.gps.closePopUpElement();
            this.gps.switchToPopUpPage(this.gps.duplicateWaypointSelection);
        }
        else {
            this.endCallback(SimVar.GetSimVarValue("C:fs9gps:IcaoSearchCurrentIcao", "string", this.gps.instrumentIdentifier));
            this.gps.closePopUpElement();
            if (this.lastPopUp) {
                this.gps.switchToPopUpPage(this.lastPopUp);
            }
        }
        return true;
    }
}
class Aera_DuplicateWaypointSelection extends NavSystemTouch_DuplicateWaypointSelection {
    constructor() {
        super(...arguments);
        this.lastPopup = null;
    }
    setContext(_endCallback, _lastPopUp = null) {
        super.setContext(_endCallback);
        this.lastPopup = _lastPopUp;
    }
    onButtonClick(_index) {
        super.onButtonClick(_index);
        this.gps.closePopUpElement();
        if (this.lastPopup) {
            this.gps.switchToPopUpPage(this.lastPopup);
        }
    }
}
class Aera_PageGroup extends NavSystemPageGroup {
    constructor(_name, _gps, _pages) {
        super(_name, _gps, _pages);
    }
}
class Aera_DirectTo extends NavSystemTouch_DirectTo {
    init(_root) {
        super.init(_root);
    }
    onEnter() {
        super.onEnter();
    }
    onExit() {
        super.onExit();
    }
    openKeyboard() {
        this.gps.fullKeyboard.getElementOfType(Aera_FullKeyboard).setContext(this.endKeyboard.bind(this));
        this.gps.switchToPopUpPage(this.gps.fullKeyboard);
    }
}
class Aera_Nearest extends NavSystemElement {
    init(root) {
        this.nearestAirportButton = this.gps.getChildById("NearestAirportButton");
        this.nearestVORButton = this.gps.getChildById("NearestVORButton");
        this.nearestNDBButton = this.gps.getChildById("NearestNDBButton");
        this.nearestIntButton = this.gps.getChildById("NearestIntButton");
        this.gps.makeButton(this.nearestAirportButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Nearest Airport"));
        this.gps.makeButton(this.nearestVORButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Nearest VOR"));
        this.gps.makeButton(this.nearestNDBButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Nearest NDB"));
        this.gps.makeButton(this.nearestIntButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Nearest Int"));
    }
    onEnter() { }
    onEvent() { }
    onExit() { }
    onUpdate() { }
}
class Aera_NRST_Airport extends NavSystemTouch_NRST_Airport {
    directTo() {
        let _icao;
        if (this.selectedElement != -1) {
            this.gps.lastRelevantICAOType = "A";
            this.gps.lastRelevantICAO = this.nearestAirports.airports[this.selectedElement].icao;
            _icao = this.gps.lastRelevantICAO;
            diffAndSetAttribute(this.menu, "state", "Inactive");
            diffAndSetAttribute(this.airportLines[this.selectedElement].identButton, "state", "None");
            this.selectedElement = -1;
        }
        this.gps.SwitchToPageName("MFD", "Direct To", true);
    }
    insertInFpl() {
        this
            .gps.insertBeforWaypointWindow.getElementOfType(Aera_InsertBeforeWaypoint).setContext(this.insertInFplIndexSelectionCallback.bind(this));
        this.gps.switchToPopUpPage(this.gps.insertBeforWaypointWindow);
    }
}
class Aera_NRST_NDB extends NavSystemTouch_NRST_NDB {
    directTo() {
        if (this.selectedElement != -1) {
            this.gps.lastRelevantICAOType = "A";
            this.gps.lastRelevantICAO = this.nearest.ndbs[this.selectedElement].icao;
            diffAndSetAttribute(this.menu, "state", "Inactive");
            diffAndSetAttribute(this.lines[this.selectedElement].identButton, "state", "None");
            this.selectedElement = -1;
        }
        this.gps.SwitchToPageName("MFD", "Direct To", true);
    }
    insertInFpl() {
        this
            .gps.insertBeforWaypointWindow.getElementOfType(Aera_InsertBeforeWaypoint).setContext(this.insertInFplIndexSelectionCallback.bind(this));
        this.gps.switchToPopUpPage(this.gps.insertBeforWaypointWindow);
    }
}
class Aera_NRST_VOR extends NavSystemTouch_NRST_VOR {
    directTo() {
        if (this.selectedElement != -1) {
            this.gps.lastRelevantICAOType = "A";
            this.gps.lastRelevantICAO = this.nearest.vors[this.selectedElement].icao;
            diffAndSetAttribute(this.menu, "state", "Inactive");
            diffAndSetAttribute(this.lines[this.selectedElement].identButton, "state", "None");
            this.selectedElement = -1;
        }
        this.gps.SwitchToPageName("MFD", "Direct To", true);
    }
    insertInFpl() {
        this
            .gps.insertBeforWaypointWindow.getElementOfType(Aera_InsertBeforeWaypoint).setContext(this.insertInFplIndexSelectionCallback.bind(this));
        this.gps.switchToPopUpPage(this.gps.insertBeforWaypointWindow);
    }
}
class Aera_NRST_Intersection extends NavSystemTouch_NRST_Intersection {
    directTo() {
        if (this.selectedElement != -1) {
            this.gps.lastRelevantICAOType = "A";
            this.gps.lastRelevantICAO = this.nearest.intersections[this.selectedElement].icao;
            diffAndSetAttribute(this.menu, "state", "Inactive");
            diffAndSetAttribute(this.lines[this.selectedElement].identButton, "state", "None");
            this.selectedElement = -1;
        }
        this.gps.SwitchToPageName("MFD", "Direct To", true);
    }
    insertInFpl() {
        this
            .gps.insertBeforWaypointWindow.getElementOfType(Aera_InsertBeforeWaypoint).setContext(this.insertInFplIndexSelectionCallback.bind(this));
        this.gps.switchToPopUpPage(this.gps.insertBeforWaypointWindow);
    }
}
class Aera_WaypointButtonElement {
    constructor() {
        this.base = window.document.createElement("div");
        diffAndSetAttribute(this.base, "class", "line");
        {
            this.button = window.document.createElement("div");
            diffAndSetAttribute(this.button, "class", "gradientButton");
            {
                this.ident = window.document.createElement("div");
                diffAndSetAttribute(this.ident, "class", "mainValue");
                this.button.appendChild(this.ident);
                this.name = window.document.createElement("div");
                diffAndSetAttribute(this.name, "class", "title");
                this.button.appendChild(this.name);
                this.symbol = window.document.createElement("img");
                diffAndSetAttribute(this.symbol, "class", "symbol");
                this.button.appendChild(this.symbol);
            }
            this.base.appendChild(this.button);
        }
    }
}
class Aera_InsertBeforeWaypoint extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.elements = [];
    }
    init(root) {
        this.window = root;
        this.tableContainer = root.getElementsByClassName("Container")[0];
        this.table = this.tableContainer.getElementsByClassName("WayPoints")[0];
        this.endButtonLine = this.table.getElementsByClassName("EndButtonLine")[0];
        this.endButton = this.gps.getChildById("EndButton");
        this.scrollElement = new NavSystemTouch_ScrollElement();
        this.scrollElement.elementContainer = this.tableContainer;
        this.scrollElement.elementSize =
            this.elements.length > 0
                ? this.elements[1].base.getBoundingClientRect().height
                : 0;
        this.gps.makeButton(this.endButton, this.endButtonClick.bind(this));
    }
    onEnter() {
        diffAndSetAttribute(this.window, "state", "Active");
    }
    onUpdate(_deltaTime) {
        if (this.scrollElement.elementSize == 0) {
            this.scrollElement.elementSize =
                this.elements.length > 0
                    ? this.elements[0].base.getBoundingClientRect().height
                    : 0;
        }
        this.scrollElement.update();
        for (let i = 0; i < this.gps.currFlightPlanManager.getWaypointsCount(); i++) {
            if (this.elements.length < i + 1) {
                let newElem = new Aera_WaypointButtonElement();
                this.gps.makeButton(newElem.button, this.elementClick.bind(this, i));
                this.table.insertBefore(newElem.base, this.endButtonLine);
                this.elements.push(newElem);
            }
            let infos = this.gps.currFlightPlanManager.getWaypoint(i).infos;
            diffAndSetText(this.elements[i].ident, infos.ident);
            diffAndSetText(this.elements[i].name, infos.name);
            let symbol = infos.imageFileName();
            diffAndSetAttribute(this.elements[i].symbol, "src", symbol != ""
                ? "/Pages/VCockpit/Instruments/Shared/Map/Images/" + symbol
                : "");
        }
        for (let i = this.gps.currFlightPlanManager.getWaypointsCount(); i < this.elements.length; i++) {
            diffAndSetAttribute(this.elements[i].base, "state", "Inactive");
        }
    }
    onExit() {
        diffAndSetAttribute(this.window, "state", "Inactive");
    }
    onEvent(_event) { }
    setContext(_endCallback) {
        this.endCallback = _endCallback;
    }
    elementClick(_index) {
        if (this.endCallback) {
            this.endCallback(_index);
        }
        this.gps.closePopUpElement();
    }
    endButtonClick() {
        this.elementClick(this.elements.length);
    }
}
class Aera_Tools extends NavSystemElement {
    init(root) {
        this.lightingConfigsButton = this.gps.getChildById("LightingConfigsButton");
        this.mapOrientationButton = this.gps.getChildById("MapOrientationButton");
        this.gps.makeButton(this.lightingConfigsButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Lighting Configs"));
        this.gps.makeButton(this.mapOrientationButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Map Orientation"));
    }
    onEnter() { }
    onEvent() { }
    onExit() { }
    onUpdate() { }
}
class Aera_LightingConfigs extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.isCursorMoving = false;
        this.cursorStartPX = 145;
        this.cursorBGWidthPX = 450;
    }
    init(root) {
        this.masterPercentText = this.gps.getChildById("LightingMasterValue");
        this.masterBG = this.gps.getChildById("MasterBacklightBgSVG");
        this.masterBGTriangle = this.gps.getChildById("MasterBacklightTriangle");
        this.masterCursor = this.gps.getChildById("MasterBacklightCursorSVG");
        this.buttonLess = this.gps.getChildById("LightingMasterLess");
        this.buttonMore = this.gps.getChildById("LightingMasterMore");
        this.gps.makeButton(this.buttonLess, this.onLessPress.bind(this));
        this.gps.makeButton(this.buttonMore, this.onMorePress.bind(this));
        this.masterCursor.addEventListener("mousedown", this.cursorMouseDown.bind(this));
        root.addEventListener("mouseup", this.cursorMouseUp.bind(this));
        root.addEventListener("mouseleave", this.cursorMouseUp.bind(this));
        root.addEventListener("mousemove", this.mouseMove.bind(this));
    }
    onEnter() { }
    onExit() { }
    onEvent() { }
    onUpdate() {
        this.updateCursor();
    }
    updateCursor() {
        let backLight = SimVar.GetSimVarValue("L:Aera_Brightness", "number");
        diffAndSetText(this.masterPercentText, (backLight * 100).toFixed(0));
        let length = backLight * 100;
        let height = backLight * 30;
        diffAndSetAttribute(this.masterBGTriangle, "points", "0,30 " + length + "," + (30 - height) + " " + length + ",30");
        this.masterCursor.style.left =
            this.cursorStartPX +
                (this.cursorBGWidthPX - this.cursorStartPX) * backLight +
                "px";
    }
    onLessPress() {
        SimVar.SetSimVarValue("L:Aera_Brightness", "number", Math.max(0, Math.min(1, SimVar.GetSimVarValue("L:Aera_Brightness", "number") - 0.01)));
    }
    onMorePress() {
        SimVar.SetSimVarValue("L:Aera_Brightness", "number", Math.max(0, Math.min(1, SimVar.GetSimVarValue("L:Aera_Brightness", "number") + 0.01)));
    }
    cursorMouseDown(event) {
        this.isCursorMoving = true;
        let clientRect = this.masterBG.getBoundingClientRect();
        this.leftRectangleBoundary = clientRect.left;
        this.rightRectangleBoundary = clientRect.width;
    }
    cursorMouseUp() {
        this.isCursorMoving = false;
    }
    mouseMove(event) {
        let pos;
        if (this.isCursorMoving) {
            pos = Math.max(0, Math.min(1, (event.clientX - this.leftRectangleBoundary) /
                this.rightRectangleBoundary));
            if (!isNaN(pos)) {
                SimVar.SetSimVarValue("L:Aera_Brightness", "number", pos);
            }
        }
    }
}
class Aera_ApproachSelection extends NavSystemTouch_ApproachSelection {
    init(_root) {
        super.init(_root);
        this.window = _root;
    }
    onEnter() {
        super.onEnter();
        diffAndSetAttribute(this.window, "state", "Active");
    }
    onExit() {
        super.onExit();
        diffAndSetAttribute(this.window, "state", "Inactive");
    }
    selectApproach(_index) {
        super.selectApproach(_index);
        this.gps.switchToPopUpPage(this.container);
    }
    selectTransition(_index) {
        super.selectTransition(_index);
        this.gps.switchToPopUpPage(this.container);
    }
    close() {
        this.gps.SwitchToPageName("MFD", "Active FPL");
    }
}
class Aera_AirportInfo_FreqLine {
}
class Aera_AirportInfo_RunwayLine {
}
class Aera_WaypointsInfo extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.frequencyElements = [];
        this.runwayElements = [];
        this.showInMap = true;
    }
    init(root) {
        this.centerDisplay = this.gps.getChildById("CenterDisplay");
        this.infoTab = this.gps.getChildById("Info_InfoTab");
        this.freqsTab = this.gps.getChildById("Info_FreqsTab");
        this.runwaysTab = this.gps.getChildById("Info_RunwaysTab");
        this.activeTab = this.runwaysTab;
        this.waypointSelection = this.gps.getChildById("Info_SelectedWaypoint");
        this.waypointSelection_mainText = this.waypointSelection.getElementsByClassName("mainText")[0];
        this.waypointSelection_mainValue = this.waypointSelection.getElementsByClassName("mainValue")[0];
        this.waypointSelection_symbol = this.waypointSelection.getElementsByClassName("waypointSymbol")[0];
        this.city = root.getElementsByClassName("city")[0];
        this.region = root.getElementsByClassName("region")[0];
        this.bearing_value = root.getElementsByClassName("bearing")[0];
        this.distance_value = root.getElementsByClassName("distance")[0];
        this.latitude = root.getElementsByClassName("latitude")[0];
        this.longitude = root.getElementsByClassName("longitude")[0];
        this.elev_value = root.getElementsByClassName("elev")[0];
        this.time_value = root.getElementsByClassName("time")[0];
        this.fuel_value = root.getElementsByClassName("fuel")[0];
        this.privacy = root.getElementsByClassName("privacy")[0];
        this.frequencyTable = root.getElementsByClassName("Freqs")[0];
        this.frequencyScrollElement = new NavSystemTouch_ScrollElement();
        this.frequencyScrollElement.elementContainer = this.frequencyTable;
        this.frequencyScrollElement.elementSize =
            this.frequencyTable.getBoundingClientRect().height / 4;
        this.runwayTable = root.getElementsByClassName("Runways")[0];
        this.runwaysScrollElement = new NavSystemTouch_ScrollElement();
        this.runwaysScrollElement.elementContainer = this.runwayTable;
        this.runwaysScrollElement.elementSize =
            this.runwayTable.getBoundingClientRect().height / 3;
        this.gps.makeButton(this.runwaysTab, this.switchPage.bind(this, "Runways", this.runwaysTab));
        this.gps.makeButton(this.freqsTab, this.switchPage.bind(this, "Freqs", this.freqsTab));
        this.gps.makeButton(this.waypointSelection, this.openKeyboard.bind(this));
    }
    onEnter() {
        if (this.waypoint && this.showInMap) {
            let infos = this.waypoint.infos;
            SimVar.SetSimVarValue("L:Aera_OverrideLatitude", "number", infos.lat);
            SimVar.SetSimVarValue("L:Aera_OverrideLongitude", "number", infos.long);
            SimVar.SetSimVarValue("L:Aera_IsPositionOverride", "number", 1);
        }
        if (this.gps.lastRelevantICAO) {
            this.endKeyboard(this.gps.lastRelevantICAO);
            this.gps.lastRelevantICAO = null;
        }
    }
    onExit() {
        SimVar.SetSimVarValue("L:Aera_OverrideLatitude", "number", 0);
        SimVar.SetSimVarValue("L:Aera_OverrideLongitude", "number", 0);
        SimVar.SetSimVarValue("L:Aera_IsPositionOverride", "number", 0);
        if (this.waypoint) {
            this.gps.lastRelevantICAOType = "A";
            this.gps.lastRelevantICAO = this.waypoint.infos.icao;
        }
    }
    onEvent() { }
    onUpdate() {
        if (this.frequencyScrollElement.elementSize == 0) {
            this.frequencyScrollElement.elementSize =
                this.frequencyTable.getBoundingClientRect().height / 4;
        }
        this.frequencyScrollElement.update();
        if (this.runwaysScrollElement.elementSize == 0) {
            this.runwaysScrollElement.elementSize =
                this.runwayTable.getBoundingClientRect().height / 3;
        }
        this.runwaysScrollElement.update();
        if (this.waypoint) {
            let infos = this.waypoint.infos;
            if (infos.lat && infos.long) {
                let bearing = Avionics.Utils.computeGreatCircleHeading(new LatLong(SimVar.GetSimVarValue("PLANE LATITUDE", "degree"), SimVar.GetSimVarValue("PLANE LONGITUDE", "degree")), infos.coordinates);
                let distance = Avionics.Utils.computeGreatCircleDistance(new LatLong(SimVar.GetSimVarValue("PLANE LATITUDE", "degree"), SimVar.GetSimVarValue("PLANE LONGITUDE", "degree")), infos.coordinates);
                diffAndSetText(this.bearing_value, "BRG " + fastToFixed(bearing, 0) + "°");
                diffAndSetText(this.distance_value, "DIS " + fastToFixed(distance, 0) + "NM");
            }
        }
    }
    switchPage(_page, _button) {
        this.currPage = _page;
        diffAndSetAttribute(this.centerDisplay, "state", _page);
        if (this.activeTab) {
            diffAndSetAttribute(this.activeTab, "state", "");
        }
        diffAndSetAttribute(_button, "state", "White");
        this.activeTab = _button;
    }
    openKeyboard() {
        this.gps.fullKeyboard.getElementOfType(Aera_FullKeyboard).setContext(this.endKeyboard.bind(this));
        this.gps.switchToPopUpPage(this.gps.fullKeyboard);
    }
    endKeyboard(_icao) {
        if (_icao != "") {
            this.waypoint = new WayPoint(this.gps);
            this.waypoint.type = "A";
            this.gps.facilityLoader.getFacilityCB(_icao, wp => {
                this.waypoint = wp;
                this.onNewInfo();
            });
        }
        else {
            this.waypoint = null;
        }
    }
    onNewInfo() {
        if (this.waypoint) {
            this.cleanPreviousData();
            let infos;
            if (this.waypoint.type == "A") {
                infos = this.waypoint.infos;
                diffAndSetText(this.city, infos.city ? this.truncate(infos.city, 8) : "");
                diffAndSetText(this.region, infos.region ? infos.region : "");
                diffAndSetText(this.latitude, infos.lat ? this.gps.latitudeFormat(infos.lat) : "");
                diffAndSetText(this.longitude, infos.long ? this.gps.longitudeFormat(infos.long) : "");
                diffAndSetText(this.elev_value, "Elev " +
                    (infos.coordinates.alt
                        ? fastToFixed(infos.coordinates.alt, 0) + "FT"
                        : ""));
                diffAndSetText(this.fuel_value, "Fuel " + (infos.fuel ? infos.fuel : ""));
                diffAndSetText(this.time_value, "Time " + (infos.timeInFP ? infos.timeInFP : ""));
                switch (infos.privateType) {
                    case 0:
                        diffAndSetText(this.privacy, "UNKNOWN");
                        break;
                    case 1:
                        diffAndSetText(this.privacy, "PUBLIC");
                        break;
                    case 2:
                        diffAndSetText(this.privacy, "MILITARY");
                        break;
                    case 3:
                        diffAndSetText(this.privacy, "PRIVATE");
                        break;
                }
                diffAndSetText(this.waypointSelection_mainText, "");
                diffAndSetText(this.waypointSelection_mainValue, infos.ident);
                let symbol = infos.imageFileName();
                diffAndSetAttribute(this.waypointSelection_symbol, "src", symbol != ""
                    ? "/Pages/VCockpit/Instruments/Shared/Map/Images/" + symbol
                    : "");
                if (infos.frequencies) {
                    for (let i = 0; i < infos.frequencies.length; i++) {
                        if (i >= this.frequencyElements.length) {
                            let freqLine = new Aera_AirportInfo_FreqLine();
                            freqLine.frequency = infos.frequencies[i];
                            freqLine.lineElem = document.createElement("div");
                            diffAndSetAttribute(freqLine.lineElem, "class", "line");
                            this.frequencyTable.appendChild(freqLine.lineElem);
                            freqLine.freqNameElem = document.createElement("div");
                            diffAndSetAttribute(freqLine.freqNameElem, "class", "frequencyName");
                            freqLine.lineElem.appendChild(freqLine.freqNameElem);
                            freqLine.frequencyElem = document.createElement("div");
                            diffAndSetAttribute(freqLine.frequencyElem, "class", "mainText");
                            freqLine.lineElem.appendChild(freqLine.frequencyElem);
                            this.frequencyElements.push(freqLine);
                            if (i == 0) {
                                this.frequencyScrollElement.elementSize = freqLine.lineElem.getBoundingClientRect().height;
                            }
                        }
                        this.frequencyElements[i].frequency = infos.frequencies[i];
                        diffAndSetText(this.frequencyElements[i].freqNameElem, this.frequencyElements[i].frequency.getTypeName());
                        diffAndSetText(this.frequencyElements[i].frequencyElem, fastToFixed(this.frequencyElements[i].frequency.mhValue, 3));
                        diffAndSetStyle(this.frequencyElements[i].lineElem, StyleProperty.display, "block");
                    }
                    for (let i = infos.frequencies.length; i < this.frequencyElements.length; i++) {
                        diffAndSetStyle(this.frequencyElements[i].lineElem, StyleProperty.display, "none");
                    }
                }
                if (infos.runways) {
                    for (let i = 0; i < infos.runways.length; i++) {
                        if (i >= this.runwayElements.length) {
                            let runwayLine = new Aera_AirportInfo_RunwayLine();
                            runwayLine.runway = infos.runways[i];
                            runwayLine.lineElem = document.createElement("div");
                            diffAndSetAttribute(runwayLine.lineElem, "class", "line");
                            this.runwayTable.appendChild(runwayLine.lineElem);
                            runwayLine.nameElem = document.createElement("div");
                            diffAndSetAttribute(runwayLine.nameElem, "class", "name");
                            runwayLine.lineElem.appendChild(runwayLine.nameElem);
                            runwayLine.sizeElem = document.createElement("div");
                            diffAndSetAttribute(runwayLine.sizeElem, "class", "size");
                            runwayLine.lineElem.appendChild(runwayLine.sizeElem);
                            runwayLine.surfaceElem = document.createElement("div");
                            diffAndSetAttribute(runwayLine.surfaceElem, "class", "surface");
                            runwayLine.lineElem.appendChild(runwayLine.surfaceElem);
                            runwayLine.lightingElem = document.createElement("div");
                            diffAndSetAttribute(runwayLine.lightingElem, "class", "lighting");
                            runwayLine.lineElem.appendChild(runwayLine.lightingElem);
                            this.runwayElements.push(runwayLine);
                            if (i == 0) {
                                this.runwaysScrollElement.elementSize = runwayLine.lineElem.getBoundingClientRect().height;
                            }
                        }
                        this.runwayElements[i].runway = infos.runways[i];
                        diffAndSetText(this.runwayElements[i].nameElem, infos.runways[i].designation);
                        diffAndSetText(this.runwayElements[i].sizeElem, Math.round(infos.runways[i].length * 3.28084) +
                            "FT X " +
                            Math.round(infos.runways[i].width * 3.28084) +
                            "FT");
                        diffAndSetText(this.runwayElements[i].surfaceElem, infos.runways[i].getSurfaceString());
                        let lighting = "Unknown";
                        switch (infos.runways[i].lighting) {
                            case 1:
                                lighting = "None";
                                break;
                            case 2:
                                lighting = "Part Time";
                                break;
                            case 3:
                                lighting = "Full Time";
                                break;
                            case 4:
                                lighting = "Frequency";
                                break;
                        }
                        diffAndSetText(this.runwayElements[i].lightingElem, lighting);
                        diffAndSetStyle(this.runwayElements[i].lineElem, StyleProperty.display, "block");
                    }
                    for (let i = infos.runways.length; i < this.runwayElements.length; i++) {
                        diffAndSetStyle(this.runwayElements[i].lineElem, StyleProperty.display, "none");
                    }
                }
            }
            else if (this.waypoint.type == "V") {
                infos = this.waypoint.infos;
                let vorType = [
                    "UNKNOWN",
                    "VOR",
                    "VOR DME",
                    "DME",
                    "TACAN",
                    "VORTAC",
                    "ILS",
                    "VOT",
                ];
                diffAndSetText(this.privacy, infos.type ? vorType[infos.type] : "");
                diffAndSetText(this.latitude, infos.lat ? this.gps.latitudeFormat(infos.lat) : "");
                diffAndSetText(this.longitude, infos.long ? this.gps.longitudeFormat(infos.long) : "");
                diffAndSetText(this.elev_value, "Type " + infos.type ? infos.type : "");
                diffAndSetText(this.fuel_value, infos.city ? infos.city : "");
                diffAndSetText(this.waypointSelection_mainText, "");
                diffAndSetText(this.waypointSelection_mainValue, infos.ident);
                let symbol = infos.imageFileName();
                diffAndSetAttribute(this.waypointSelection_symbol, "src", symbol != ""
                    ? "/Pages/VCockpit/Instruments/Shared/Map/Images/" + symbol
                    : "");
                if (infos.frequencyMHz) {
                    let freqLine = new Aera_AirportInfo_FreqLine();
                    freqLine.lineElem = document.createElement("div");
                    diffAndSetAttribute(freqLine.lineElem, "class", "line");
                    this.frequencyTable.appendChild(freqLine.lineElem);
                    freqLine.freqNameElem = document.createElement("div");
                    diffAndSetAttribute(freqLine.freqNameElem, "class", "frequencyName");
                    freqLine.lineElem.appendChild(freqLine.freqNameElem);
                    freqLine.frequencyElem = document.createElement("div");
                    diffAndSetAttribute(freqLine.frequencyElem, "class", "mainText");
                    freqLine.lineElem.appendChild(freqLine.frequencyElem);
                    diffAndSetText(freqLine.freqNameElem, infos.type ? vorType[infos.type] : "");
                    diffAndSetText(freqLine.frequencyElem, fastToFixed(infos.frequencyMHz, 3));
                    diffAndSetStyle(freqLine.lineElem, StyleProperty.display, "block");
                }
            }
            if (this.showInMap) {
                if (infos.lat && infos.long) {
                    SimVar.SetSimVarValue("L:Aera_OverrideLatitude", "number", infos.lat);
                    SimVar.SetSimVarValue("L:Aera_OverrideLongitude", "number", infos.long);
                    SimVar.SetSimVarValue("L:Aera_IsPositionOverride", "number", 1);
                }
                else {
                    SimVar.SetSimVarValue("L:Aera_OverrideLatitude", "number", 0);
                    SimVar.SetSimVarValue("L:Aera_OverrideLongitude", "number", 0);
                    SimVar.SetSimVarValue("L:Aera_IsPositionOverride", "number", 0);
                }
            }
        }
    }
    cleanPreviousData() {
        this.frequencyElements = [];
        diffAndSetHTML(this.frequencyTable, "");
        this.runwayElements = [];
        diffAndSetHTML(this.runwayTable, "");
        diffAndSetText(this.privacy, "");
        diffAndSetText(this.city, "");
        diffAndSetText(this.latitude, "");
        diffAndSetText(this.longitude, "");
        diffAndSetText(this.elev_value, "");
        diffAndSetText(this.fuel_value, "");
        diffAndSetText(this.time_value, "");
        diffAndSetText(this.elev_value, "");
    }
    truncate(_city, _nb) {
        return _city.substring(0, _nb) + (_city.length > _nb ? " ..." : "");
    }
    showInMapStatus() {
        return this.showInMap;
    }
}
class ParameterElement {
    constructor(_name, _id, _gps, _callBack, _greyed = false) {
        this.name = _name;
        this.id = _id;
        this.callBack = _callBack;
        this.greyed = _greyed;
        this.element =
            '<div class="gradientButton" id="Button_' +
                this.id +
                '"' +
                (this.greyed ? ' state="Greyed"' : "") +
                ">";
        this.element += '<div class="mainText">' + this.name + "</div>";
        this.element += "</div>";
    }
}
class ParametersMenu {
    constructor(_pageName, _gps) {
        this.pageName = _pageName;
        this.gps = _gps;
        this.parametersListContainer = this.gps.getChildById("ParametersListContainer");
    }
    appendParametersList() {
        diffAndSetStyle(this.parametersListContainer, StyleProperty.display, "block");
        let container = "";
        for (let i = 0; i < this.elements.length; i++) {
            container += this.elements[i].element;
        }
        diffAndSetHTML(this.parametersListContainer, container);
        for (let i = 0; i < this.elements.length; i++) {
            let button = this.gps.getChildById("Button_" + this.elements[i].id);
            this.gps.makeButton(button, this.elements[i].callBack.bind(this));
        }
    }
    deleteParametersList() {
        diffAndSetStyle(this.parametersListContainer, StyleProperty.display, "none");
        diffAndSetHTML(this.parametersListContainer, "");
    }
}
class Aera_ParametersList extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.waypointButtonsState = true;
    }
    init(root) {
        this.mapParametersList = new ParametersMenu("Map", this.gps);
        this.FPLParametersList = new ParametersMenu("Active FPL", this.gps);
        this.parametersList = this.gps.getChildById("ParametersList");
        this.mapParametersList.elements = [
            new ParameterElement("Declutter", "Declutter", this.gps, this.openDeclutterMenu.bind(this)),
            new ParameterElement("Show/Hide", "ShowHide", this.gps, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Show/Hide")),
            new ParameterElement("Set Bug Indicator", "SetBugIndicator", this.gps, this.openSetBugIndicatorMenu.bind(this), !SimVar.GetSimVarValue("L:isCompassDisplayed", "boolean")),
            new ParameterElement("Change Datafields", "ChangeDatafields", this.gps, this.openChangeDatafieldsMenu.bind(this)),
            new ParameterElement("Setup Map", "SetupMap", this.gps, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Setup Map")),
            new ParameterElement("Map Information", "MapInformation", this.gps, () => { }, true),
        ];
        this.FPLParametersList.elements = [
            new ParameterElement("Stop Navigation", "StopNavigation", this.gps, this.removeAllWaypoints.bind(this, "Toggle Navigation")),
            new ParameterElement("Insert Waypoint", "InsertWaypoint", this.gps, this.openFPLKeyboard.bind(this), SimVar.GetSimVarValue("L:WaypointButtonsState", "Bool")),
            new ParameterElement("Remove Waypoint", "RemoveWaypoint", this.gps, this.removeWaypoint.bind(this), SimVar.GetSimVarValue("L:WaypointButtonsState", "Bool")),
            new ParameterElement("Select Approach", "Approach", this.gps, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Approach Selection"), SimVar.GetSimVarValue("L:ApproachButtonsState", "Bool")),
            new ParameterElement("Show Map", "ShowMap", this.gps, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Map")),
        ];
    }
    openFPLKeyboard() {
        this.gps.closePopUpElement();
        this.gps.FPLElement.insertAfter();
    }
    removeWaypoint() {
        this.gps.FPLElement.removeWaypoint();
        this.gps.closePopUpElement();
    }
    removeAllWaypoints() {
        this.gps.currFlightPlanManager.clearFlightPlan();
        this.gps.closePopUpElement();
    }
    openSetBugIndicatorMenu() {
        this.gps.switchToPopUpPage(this.gps.bugIndicatorMode);
    }
    openChangeDatafieldsMenu() {
        SimVar.SetSimVarValue("L:IsChangeDataFieldsMenuOn", "Bool", true);
    }
    openDeclutterMenu() {
        this.gps.switchToPopUpPage(this.gps.declutterMenu);
    }
    toggleChangeDatafieldsButton(_state) {
        diffAndSetAttribute(this.gps.getChildById("Button_ChangeDatafields"), "state", _state ? "" : "Greyed");
    }
    toggleWaypointButtons(_state) {
        diffAndSetAttribute(this.gps.getChildById("Button_InsertWaypoint"), "state", _state ? "" : "Greyed");
        diffAndSetAttribute(this.gps.getChildById("Button_RemoveWaypoint"), "state", _state ? "" : "Greyed");
        SimVar.SetSimVarValue("L:WaypointButtonsState", "Bool", !_state);
    }
    toggleSelectApproachButton(_state) {
        diffAndSetAttribute(this.gps.getChildById("Button_Approach"), "state", _state ? "" : "Greyed");
        SimVar.SetSimVarValue("L:ApproachButtonsState", "Bool", !_state);
    }
    onEnter() {
        let hideParameterList = false;
        if (this.currentPageName != this.gps.getCurrentPage().name) {
            switch (this.gps.getCurrentPage().name) {
                case this.mapParametersList.pageName:
                    this.mapParametersList.appendParametersList();
                    break;
                case this.FPLParametersList.pageName:
                    this.FPLParametersList.appendParametersList();
                    break;
                default:
                    this.mapParametersList.deleteParametersList();
                    hideParameterList = true;
                    break;
            }
            this.currentPageName = this.gps.getCurrentPage().name;
        }
        diffAndSetAttribute(this.parametersList, "state", hideParameterList ? "Inactive" : "Active");
    }
    onExit() {
        diffAndSetAttribute(this.parametersList, "state", "Inactive");
    }
    onEvent() { }
    onUpdate() { }
}
class Aera_DeclutterMenu extends NavSystemElement {
    init() {
        this.declutterMenu = this.gps.getChildById("DeclutterMenu");
        this.noDeclutterButton = this.gps.getChildById("NoDeclutterButton");
        this.LevelOneDeclutterButton = this.gps.getChildById("LevelOneDeclutterButton");
        this.LevelTwoDeclutterButton = this.gps.getChildById("LevelTwoDeclutterButton");
        this.LevelThreeDeclutterButton = this.gps.getChildById("LevelThreeDeclutterButton");
        this.map = this.gps.getChildById("MapInstrument");
        this.gps.makeButton(this.noDeclutterButton, this.changeDeclutterMode.bind(this, 0));
        this.gps.makeButton(this.LevelOneDeclutterButton, this.changeDeclutterMode.bind(this, 1));
        this.gps.makeButton(this.LevelTwoDeclutterButton, this.changeDeclutterMode.bind(this, 2));
        this.gps.makeButton(this.LevelThreeDeclutterButton, this.changeDeclutterMode.bind(this, 3));
    }
    changeDeclutterMode(_mode) {
        this.map.declutterLevel = _mode;
    }
    onEnter() {
        diffAndSetAttribute(this.declutterMenu, "state", "Active");
    }
    onExit() {
        diffAndSetAttribute(this.declutterMenu, "state", "Inactive");
    }
    onEvent() { }
    onUpdate() { }
}
class Aera_ChangeDataFieldsMenu extends NavSystemElement {
    init() {
        this.changeDataFieldsContainer = this.gps.getChildById("ChangeDataFieldsContainer");
        this.validationButton = this.gps.getChildById("ChangeDataFieldsMenuOK");
        this.cancelButton = this.gps.getChildById("ChangeDataFieldsMenuCancel");
        let datafieldsButtons = "";
        datafieldsButtons += '<div class="menuElements">';
        let lineNumber = 0;
        let shortName;
        let shortNameID;
        for (let i = 0; i < this.gps.dataFieldsArray.length; i++) {
            shortName = this.gps.dataFieldsArray[i].getShortName();
            shortNameID = this.gps.dataFieldsArray[i].getShortNameID();
            if (i % 3 == 0) {
                datafieldsButtons += '<div class="line">';
                lineNumber = 0;
            }
            lineNumber++;
            datafieldsButtons +=
                '<div class="gradientButton" id="Button_' + shortNameID + '">';
            datafieldsButtons += '<div class="mainText">' + shortName + "</div>";
            datafieldsButtons += "</div>";
            if (lineNumber == 3) {
                datafieldsButtons += "</div>";
            }
        }
        datafieldsButtons += "</div>";
        diffAndSetHTML(this.changeDataFieldsContainer, datafieldsButtons);
        for (let i = 0; i < this.gps.dataFieldsArray.length; i++) {
            shortNameID = this.gps.dataFieldsArray[i].getShortNameID();
            this.gps.makeButton(this.gps.getChildById("Button_" + shortNameID), this.changeSelectedDatafield.bind(this, i));
        }
        this.gps.makeButton(this.cancelButton, this.gps.SwitchToPageName.bind(this.gps, "MFD", "Map"));
        this.gps.makeButton(this.validationButton, this.setSelectedDatafield.bind(this));
        this.changeDataFieldsScrollElement = new NavSystemTouch_ScrollElement();
        this.changeDataFieldsScrollElement.elementContainer = this.changeDataFieldsContainer;
        this.changeDataFieldsScrollElement.elementSize =
            this.changeDataFieldsContainer.getBoundingClientRect().height / 4;
    }
    onEvent() { }
    onEnter() {
        this.changeSelectedDatafield(SimVar.GetSimVarValue("L:Datafield" + this.gps.selectedDatafield, "number"));
    }
    onExit() { }
    onUpdate() {
        if (this.changeDataFieldsScrollElement.elementSize == 0) {
            this.changeDataFieldsScrollElement.elementSize =
                this.changeDataFieldsContainer.getBoundingClientRect().height / 4;
        }
        this.changeDataFieldsScrollElement.update();
    }
    changeSelectedDatafield(_index) {
        this.selectedDatafield = _index;
        let datafieldElement;
        let shortNameID;
        for (let i = 0; i < this.gps.dataFieldsArray.length; i++) {
            shortNameID = this.gps.dataFieldsArray[i].getShortNameID();
            datafieldElement = this.gps.getChildById("Button_" + shortNameID);
            if (this.selectedDatafield == i) {
                diffAndSetAttribute(datafieldElement, "state", "selected");
            }
            else {
                diffAndSetAttribute(datafieldElement, "state", "");
            }
            this.gps.makeButton(this.gps.getChildById("Button_" + shortNameID), this.changeSelectedDatafield.bind(this, i));
        }
    }
    setSelectedDatafield() {
        SimVar.SetSimVarValue("L:Datafield" + this.gps.selectedDatafield, "number", this.selectedDatafield);
        this.gps.SwitchToPageName("MFD", "Map");
    }
}
class Aera_BugIndicatorMenu extends NavSystemElement {
    init() {
        this.bugIndicatorMenu = this.gps.getChildById("BugIndicatorMode");
        this.bugIndicator_button_off = this.gps.getChildById("BugIndicatorOff");
        this.bugIndicator_button_bearing = this.gps.getChildById("BugIndicatorBearing");
        this.bugIndicator_button_cts = this.gps.getChildById("BugIndicatorCTS");
        diffAndSetAttribute(this.bugIndicator_button_off, "state", "White");
        this.gps.makeButton(this.bugIndicator_button_off, this.changeBugIndicatorMode.bind(this, "off"));
        this.gps.makeButton(this.bugIndicator_button_bearing, this.changeBugIndicatorMode.bind(this, "bearing"));
        this.gps.makeButton(this.bugIndicator_button_cts, this.changeBugIndicatorMode.bind(this, "cts"));
    }
    onEnter() {
        diffAndSetAttribute(this.bugIndicatorMenu, "state", "Active");
    }
    onExit() {
        diffAndSetAttribute(this.bugIndicatorMenu, "state", "Inactive");
    }
    changeBugIndicatorMode(_mode) {
        let mode;
        switch (_mode) {
            case "off":
                mode = 0;
                diffAndSetAttribute(this.bugIndicator_button_off, "state", "White");
                diffAndSetAttribute(this.bugIndicator_button_bearing, "state", "");
                diffAndSetAttribute(this.bugIndicator_button_cts, "state", "");
                break;
            case "bearing":
                mode = 1;
                diffAndSetAttribute(this.bugIndicator_button_off, "state", "");
                diffAndSetAttribute(this.bugIndicator_button_bearing, "state", "White");
                diffAndSetAttribute(this.bugIndicator_button_cts, "state", "");
                break;
            case "cts":
                mode = 2;
                diffAndSetAttribute(this.bugIndicator_button_off, "state", "");
                diffAndSetAttribute(this.bugIndicator_button_bearing, "state", "");
                diffAndSetAttribute(this.bugIndicator_button_cts, "state", "White");
                break;
        }
        SimVar.SetSimVarValue("L:Map_BugIndicator_Mode", "number", mode);
    }
    onEvent() { }
    onUpdate() { }
}
class Aera_ShowHide extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.dataFieldsState = true;
        this.terrainState = false;
    }
    init(_root) {
        this.dataFieldsContainer = this.gps.getChildById("DataFieldsContainer");
        this.dataFieldsButton = this.gps.getChildById("DataFieldsButton");
        this.weatherButton = this.gps.getChildById("WeatherButton");
        this.topographyButton = this.gps.getChildById("TopographyButton");
        this.terrainButton = this.gps.getChildById("TerrainButton");
        this.mapElement = this.gps.getElementOfType(MapInstrumentElement);
        diffAndSetAttribute(this.dataFieldsContainer, "state", this.dataFieldsState ? "Active" : "Inactive");
        this.dataFieldsState = SimVar.GetSimVarValue("L:isDataFieldActive", "Boolean");
        diffAndSetText(this.weatherButton.children[0], this.mapElement.getNexrad() ? "Hide" : "Show");
        diffAndSetText(this.topographyButton.children[0], this.mapElement.getIsolines() ? "Hide" : "Show");
        diffAndSetText(this.dataFieldsButton.children[0], this.dataFieldsState ? "Off" : "Overlay");
        diffAndSetText(this.terrainButton.children[0], this.terrainState ? "Hide" : "Show");
        this.gps.makeButton(this.dataFieldsButton, this.toggleDataFields.bind(this));
        this.gps.makeButton(this.weatherButton, this.toggleNextrad.bind(this));
        this.gps.makeButton(this.topographyButton, this.toggleIsolines.bind(this));
        this.gps.makeButton(this.terrainButton, this.toggleTerrain.bind(this));
    }
    onEnter() { }
    onExit() { }
    onEvent() { }
    onUpdate() { }
    toggleNextrad() {
        this.mapElement.toggleNexrad();
        if (this.mapElement.getNexrad()) {
            diffAndSetText(this.weatherButton.children[0], "Hide");
            diffAndSetAttribute(this.terrainButton, "state", "Greyed");
        }
        else {
            diffAndSetText(this.weatherButton.children[0], "Show");
            diffAndSetAttribute(this.terrainButton, "state", "");
        }
    }
    toggleIsolines() {
        this.mapElement.toggleIsolines();
        if (this.mapElement.getIsolines()) {
            diffAndSetText(this.topographyButton.children[0], "Hide");
        }
        else {
            diffAndSetText(this.topographyButton.children[0], "Show");
        }
    }
    toggleDataFields() {
        this.dataFieldsState = !this.dataFieldsState;
        if (this.dataFieldsState) {
            diffAndSetText(this.dataFieldsButton.children[0], "Off");
            diffAndSetAttribute(this.dataFieldsContainer, "state", "Active");
            this.gps.parametersList.getElementOfType(Aera_ParametersList).toggleChangeDatafieldsButton(true);
            SimVar.SetSimVarValue("L:isDataFieldActive", "Boolean", true);
        }
        else {
            diffAndSetText(this.dataFieldsButton.children[0], "Overlay");
            diffAndSetAttribute(this.dataFieldsContainer, "state", "Inactive");
            this.gps.parametersList.getElementOfType(Aera_ParametersList).toggleChangeDatafieldsButton(false);
            SimVar.SetSimVarValue("L:isDataFieldActive", "Boolean", false);
        }
    }
    toggleTerrain() {
        this.terrainState = !this.terrainState;
        if (this.terrainState) {
            diffAndSetText(this.terrainButton.children[0], "Hide");
            this.mapElement.instrument.mapConfigId = 1;
            this.mapElement.instrument.bingMapRef = EBingReference.PLANE;
            diffAndSetAttribute(this.weatherButton, "state", "Greyed");
            diffAndSetAttribute(this.topographyButton, "state", "Greyed");
            if (this.mapElement.getIsolines()) {
                this.toggleIsolines();
            }
        }
        else {
            diffAndSetText(this.terrainButton.children[0], "Show");
            this.mapElement.instrument.mapConfigId = 0;
            this.mapElement.instrument.bingMapRef = EBingReference.SEA;
            diffAndSetAttribute(this.weatherButton, "state", "");
            diffAndSetAttribute(this.topographyButton, "state", "");
        }
    }
}
class Aera_DataFieldsElements extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.dataFieldsList = [];
    }
    init(_root) {
        this.dataFieldsContainer = this.gps.getChildById("DataFieldsContainer");
        this.mapInstrument = this.gps.getChildById("MapInstrument");
        this.interactions = this.gps.getChildById("Interactions");
        this.dataFieldsTopLeft = document.createElement("div");
        diffAndSetAttribute(this.dataFieldsTopLeft, "id", "DataField_TopLeft");
        this.dataFieldsTopRight = document.createElement("div");
        diffAndSetAttribute(this.dataFieldsTopRight, "id", "DataField_TopRight");
        this.dataFieldsBottomLeft = document.createElement("div");
        diffAndSetAttribute(this.dataFieldsBottomLeft, "id", "DataField_BottomLeft");
        this.dataFieldsBottomRight = document.createElement("div");
        diffAndSetAttribute(this.dataFieldsBottomRight, "id", "DataField_BottomRight");
        this.gps.makeButton(this.dataFieldsTopLeft, this.modifyDataField.bind(this, 0));
        this.gps.makeButton(this.dataFieldsTopRight, this.modifyDataField.bind(this, 1));
        this.gps.makeButton(this.dataFieldsBottomRight, this.modifyDataField.bind(this, 2));
        this.gps.makeButton(this.dataFieldsBottomLeft, this.modifyDataField.bind(this, 3));
        this.dataFieldsContainer.appendChild(this.dataFieldsTopLeft);
        this.dataFieldsContainer.appendChild(this.dataFieldsTopRight);
        this.dataFieldsContainer.appendChild(this.dataFieldsBottomLeft);
        this.dataFieldsContainer.appendChild(this.dataFieldsBottomRight);
        this.updateDataFieldsList(0, this.gps.dataFieldsArray[SimVar.GetSimVarValue("L:Datafield0", "number")]);
        this.updateDataFieldsList(1, this.gps.dataFieldsArray[SimVar.GetSimVarValue("L:Datafield1", "number")]);
        this.updateDataFieldsList(2, this.gps.dataFieldsArray[SimVar.GetSimVarValue("L:Datafield2", "number")]);
        this.updateDataFieldsList(3, this.gps.dataFieldsArray[SimVar.GetSimVarValue("L:Datafield3", "number")]);
    }
    updateDataFieldsList(_index, _dataFieldsList) {
        this.dataFieldsList[_index] = _dataFieldsList;
        switch (_index) {
            case 0:
                diffAndSetHTML(this.dataFieldsTopLeft, this.dataFieldsList[_index].getHTML());
                break;
            case 1:
                diffAndSetHTML(this.dataFieldsTopRight, this.dataFieldsList[_index].getHTML());
                break;
            case 2:
                diffAndSetHTML(this.dataFieldsBottomRight, this.dataFieldsList[_index].getHTML());
                break;
            case 3:
                diffAndSetHTML(this.dataFieldsBottomLeft, this.dataFieldsList[_index].getHTML());
                break;
        }
    }
    onEvent() { }
    onEnter() { }
    onExit() {
        this.deactiveDataFieldsMenu();
    }
    onUpdate() {
        this.updateDataFieldsList(0, this.gps.dataFieldsArray[SimVar.GetSimVarValue("L:Datafield0", "number")]);
        this.updateDataFieldsList(1, this.gps.dataFieldsArray[SimVar.GetSimVarValue("L:Datafield1", "number")]);
        this.updateDataFieldsList(2, this.gps.dataFieldsArray[SimVar.GetSimVarValue("L:Datafield2", "number")]);
        this.updateDataFieldsList(3, this.gps.dataFieldsArray[SimVar.GetSimVarValue("L:Datafield3", "number")]);
        if (SimVar.GetSimVarValue("L:IsChangeDataFieldsMenuOn", "Bool")) {
            this.activeDataFieldsMenu();
            if (SimVar.GetSimVarValue("L:isCompassDisplayed", "Boolean")) {
                this.compassState = true;
                diffAndSetAttribute(this.gps.getChildById("CompassElement"), "state", "Inactive");
            }
            else {
                this.compassState = false;
            }
        }
        for (let i = 0; i < this.dataFieldsList.length; i++) {
            this.dataFieldsList[i].Update(i);
        }
    }
    modifyDataField(_datafieldIndex) {
        this.gps.selectedDatafield = _datafieldIndex;
        if (this.compassState) {
            diffAndSetAttribute(this.gps.getChildById("CompassElement"), "state", "Active");
        }
        this.gps.SwitchToPageName("MFD", "Change DataFields");
    }
    activeDataFieldsMenu() {
        diffAndSetAttribute(this.dataFieldsTopLeft, "class", "gradientButton");
        diffAndSetAttribute(this.dataFieldsTopRight, "class", "gradientButton");
        diffAndSetAttribute(this.dataFieldsBottomLeft, "class", "gradientButton");
        diffAndSetAttribute(this.dataFieldsBottomRight, "class", "gradientButton");
        diffAndSetStyle(this.dataFieldsTopLeft, StyleProperty.pointerEvents, "auto");
        diffAndSetStyle(this.dataFieldsTopRight, StyleProperty.pointerEvents, "auto");
        diffAndSetStyle(this.dataFieldsBottomLeft, StyleProperty.pointerEvents, "auto");
        diffAndSetStyle(this.dataFieldsBottomRight, StyleProperty.pointerEvents, "auto");
        diffAndSetStyle(this.mapInstrument, StyleProperty.opacity, "0.4");
        diffAndSetStyle(this.interactions, StyleProperty.opacity, "0.4");
        diffAndSetStyle(this.mapInstrument, StyleProperty.pointerEvents, "none");
        diffAndSetStyle(this.interactions, StyleProperty.pointerEvents, "none");
        this.gps.closePopUpElement();
    }
    deactiveDataFieldsMenu() {
        diffAndSetAttribute(this.dataFieldsTopLeft, "class", "");
        diffAndSetAttribute(this.dataFieldsTopRight, "class", "");
        diffAndSetAttribute(this.dataFieldsBottomLeft, "class", "");
        diffAndSetAttribute(this.dataFieldsBottomRight, "class", "");
        diffAndSetStyle(this.dataFieldsTopLeft, StyleProperty.pointerEvents, "none");
        diffAndSetStyle(this.dataFieldsTopRight, StyleProperty.pointerEvents, "none");
        diffAndSetStyle(this.dataFieldsBottomLeft, StyleProperty.pointerEvents, "none");
        diffAndSetStyle(this.dataFieldsBottomRight, StyleProperty.pointerEvents, "none");
        diffAndSetStyle(this.mapInstrument, StyleProperty.opacity, "1");
        diffAndSetStyle(this.interactions, StyleProperty.opacity, "1");
        diffAndSetStyle(this.mapInstrument, StyleProperty.pointerEvents, "auto");
        diffAndSetStyle(this.interactions, StyleProperty.pointerEvents, "auto");
        SimVar.SetSimVarValue("L:IsChangeDataFieldsMenuOn", "Bool", false);
        this.gps.closePopUpElement();
    }
}
class Aera_dataFieldsElement {
    constructor(_gps, _shortName, _simVarFunction, _simVarFunctionParameters) {
        this.dataField = "";
        this.simVarFunctionParameters = [];
        this.shortName = _shortName;
        this.gps = _gps;
        this.simVarFunction = _simVarFunction;
        this.simVarFunctionParameters = _simVarFunctionParameters;
        this.shortNameID = this.shortName.replace(/ /g, "_");
        this.dataField += '<div id="ShortName">';
        this.dataField += this.shortName;
        this.dataField += "</div>";
        this.dataField += '<div class="value">';
        this.dataField += "</div>";
    }
    getHTML() {
        return this.dataField;
    }
    Update(_index) {
        let valueElement;
        switch (_index) {
            case 0:
                valueElement = this.gps.getChildById("DataField_TopLeft");
                break;
            case 1:
                valueElement = this.gps.getChildById("DataField_TopRight");
                break;
            case 2:
                valueElement = this.gps.getChildById("DataField_BottomRight");
                break;
            case 3:
                valueElement = this.gps.getChildById("DataField_BottomLeft");
                break;
        }
        let value = this.simVarFunction(this.simVarFunctionParameters);
        diffAndSetText(valueElement.children[1], value);
    }
    getShortName() {
        return this.shortName;
    }
    getShortNameID() {
        return this.shortNameID;
    }
}
registerInstrument("aera-element", Aera);
//# sourceMappingURL=Aera.js.map