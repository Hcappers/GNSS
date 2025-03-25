class ContextualMenu {
    constructor(_title, _elements) {
        this.title = _title;
        this.elements = _elements;
    }
    constructContextualMenuElements(_gps) {
        let elementsHTML = "";
        for (let i = 0; i < this.elements.length; i++) {
            elementsHTML += this.elements[i].constructHtmlElement();
        }
        diffAndSetHTML(_gps.contextualMenuElements, elementsHTML);
    }
    Update(_gps, _maxElems = 6) {
        if (this.needFullReload(_gps)) {
            this.constructContextualMenuElements(_gps);
        }
        diffAndSetHTML(_gps.contextualMenuTitle, this.title);
        _gps.UpdateSlider(_gps.menuSlider, _gps.menuSliderCursor, _gps.contextualMenuDisplayBeginIndex, _gps.currentContextualMenu.elements.length, _maxElems);
        let element;
        let htmlElement;
        for (let i = 0; i < this.elements.length; i++) {
            htmlElement = (i < _gps.contextualMenuElements.children.length) ? _gps.contextualMenuElements.children[i] : null;
            if (i < _gps.contextualMenuDisplayBeginIndex || i >= _gps.contextualMenuDisplayBeginIndex + _maxElems) {
                diffAndSetStyle(htmlElement, StyleProperty.display, "none");
            }
            else {
                diffAndSetStyle(htmlElement, StyleProperty.display, "block");
                element = this.elements[i];
                element.update(htmlElement);
                if (element.isInactive()) {
                    diffAndSetAttribute(htmlElement, "state", "Inactive");
                }
                else {
                    if (i == _gps.cursorIndex) {
                        diffAndSetAttribute(htmlElement, "state", "Selected");
                    }
                    else {
                        diffAndSetAttribute(htmlElement, "state", "Unselected");
                    }
                }
            }
        }
    }
    needFullReload(_gps) {
        if (this.elements.length != _gps.contextualMenuElements.children.length)
            return true;
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].needReload(_gps.contextualMenuElements.children[i]))
                return true;
        }
        return false;
    }
}
class ContextualMenuConfirmation extends ContextualMenu {
    constructor(_title, _elements, _message) {
        super(_title, _elements);
        this.message = _message;
    }
    Update(_gps) {
        diffAndSetHTML(_gps.contextualMenuTitle, this.title);
        var ElementsHTML = "";
        diffAndSetAttribute(_gps.menuSlider, "state", "Inactive");
        ElementsHTML += '<div class="ContextualMenuElement" state="Unselected">' + this.message + '</div>';
        ElementsHTML += '<div id="ContextualMenuSeparator"></div>';
        ElementsHTML += '<div class="ContextualMenuElement Align" state="' + (_gps.cursorIndex == 0 ? 'Selected' : 'Unselected') + '">' + this.elements[0].name + '</div>';
        ElementsHTML += '<div class="ContextualMenuElement Align" state="Unselected">&nbsp;or&nbsp;</div>';
        ElementsHTML += '<div class="ContextualMenuElement Align" state="' + (_gps.cursorIndex == 1 ? 'Selected' : 'Unselected') + '">' + this.elements[1].name + '</div>';
        diffAndSetHTML(_gps.contextualMenuElements, ElementsHTML);
    }
}
class ContextualMenuElement {
    constructor(_name, _callBack, _isInactive = false) {
        this.name = _name;
        this.callBack = _callBack;
        this.inactiveCallback = _isInactive;
        this.domParser = new DOMParser();
    }
    constructHtmlElement() {
        return '<div class="ContextualMenuElement">' + this.name + '</div>';
    }
    SendEvent() {
        if (this.callBack)
            return this.callBack();
        return false;
    }
    isInactive() {
        if (this.inactiveCallback instanceof Function) {
            return this.inactiveCallback();
        }
        else {
            return this.inactiveCallback;
        }
    }
    needReload(_htmlElement) {
        if (_htmlElement)
            return _htmlElement.textContent != this.domParser.parseFromString(this.name, 'text/html').body.textContent;
        return true;
    }
    update(_htmlElement) { }
}
class ContextualMenuElementImage extends ContextualMenuElement {
    constructor(_name, _callBack, _imageSrc, _isInactive = false) {
        super(_name, _callBack, _isInactive);
        this.imageSrc = _imageSrc;
    }
    constructHtmlElement() {
        return '<div class="ContextualMenuElement"><div class="ContextualMenuElementName">' + this.name + '</div><div class="ContextualMenuElementImage"><img src="' + this.imageSrc + '"></div></div>';
    }
    needReload(_htmlElement) {
        let htmlName, htmlImageSrc;
        if (_htmlElement) {
            let nameElement = _htmlElement.getElementsByClassName("ContextualMenuElementName");
            if (nameElement.length > 0) {
                htmlName = nameElement[0].textContent;
            }
            let imageElement = _htmlElement.getElementsByClassName("ContextualMenuElementImage");
            if (imageElement.length > 0) {
                if (imageElement[0].getElementsByTagName("img").length > 0)
                    htmlImageSrc = imageElement[0].getElementsByTagName("img")[0].getAttribute("src");
            }
        }
        if (htmlName && htmlImageSrc)
            return (htmlName != this.domParser.parseFromString(this.name, 'text/html').body.textContent || htmlImageSrc != this.imageSrc);
        return true;
    }
}
class ContextualMenuElementValue extends ContextualMenuElement {
    constructor(_name, _callBack, _valueCallBack, _isInactive = false) {
        super(_name, _callBack, _isInactive);
        this.valueCallbBack = _valueCallBack;
    }
    get value() { return this.valueCallbBack(); }
    constructHtmlElement() {
        return '<div class="ContextualMenuElement"><div class="ContextualMenuElementName">' + this.name + '</div><div class="ContextualMenuElementValue">' + this.value + '</div></div>';
    }
    update(_htmlElement) {
        if (_htmlElement) {
            let valueElement = _htmlElement.getElementsByClassName("ContextualMenuElementValue");
            if (valueElement.length > 0) {
                diffAndSetText(valueElement[0], this.value);
            }
        }
    }
    needReload(_htmlElement) {
        let htmlName;
        if (_htmlElement) {
            let nameElement = _htmlElement.getElementsByClassName("ContextualMenuElementName");
            if (nameElement.length > 0) {
                htmlName = nameElement[0].textContent;
            }
        }
        if (htmlName)
            return (htmlName != this.domParser.parseFromString(this.name, 'text/html').body.textContent);
        return true;
    }
}
//# sourceMappingURL=ContextualMenu.js.map