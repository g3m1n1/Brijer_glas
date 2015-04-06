Polymer("core-iconset", {
    src: "",
    width: 0,
    icons: "",
    iconSize: 24,
    offsetX: 0,
    offsetY: 0,
    type: "iconset",
    created: function () {
        this.iconMap = {};
        this.iconNames = [];
        this.themes = {}
    },
    ready: function () {
        if (this.src && this.ownerDocument !== document) {
            this.src = this.resolvePath(this.src, this.ownerDocument.baseURI)
        }
        this.super();
        this.updateThemes()
    },
    iconsChanged: function () {
        var ox = this.offsetX;
        var oy = this.offsetY;
        this.icons && this.icons.split(/\s+/g).forEach(function (name, i) {
            this.iconNames.push(name);
            this.iconMap[name] = {offsetX: ox, offsetY: oy};
            if (ox + this.iconSize < this.width) {
                ox += this.iconSize
            } else {
                ox = this.offsetX;
                oy += this.iconSize
            }
        }, this)
    },
    updateThemes: function () {
        var ts = this.querySelectorAll("property[theme]");
        ts && ts.array().forEach(function (t) {
            this.themes[t.getAttribute("theme")] = {
                offsetX: parseInt(t.getAttribute("offsetX")) || 0,
                offsetY: parseInt(t.getAttribute("offsetY")) || 0
            }
        }, this)
    },
    getOffset: function (icon, theme) {
        var i = this.iconMap[icon];
        if (!i) {
            var n = this.iconNames[Number(icon)];
            i = this.iconMap[n]
        }
        var t = this.themes[theme];
        if (i && t) {
            return {offsetX: i.offsetX + t.offsetX, offsetY: i.offsetY + t.offsetY}
        }
        return i
    },
    applyIcon: function (element, icon, scale) {
        var offset = this.getOffset(icon);
        scale = scale || 1;
        if (element && offset) {
            var icon = element._icon || document.createElement("div");
            var style = icon.style;
            style.backgroundImage = "url(" + this.src + ")";
            style.backgroundPosition = -offset.offsetX * scale + "px" + " " + (-offset.offsetY * scale + "px");
            style.backgroundSize = scale === 1 ? "auto" : this.width * scale + "px";
            if (icon.parentNode !== element) {
                element.appendChild(icon)
            }
            return icon
        }
    }
});