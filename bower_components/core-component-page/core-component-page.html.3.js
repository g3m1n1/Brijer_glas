Polymer("core-iconset-svg", {
    iconSize: 24, type: "iconset", created: function () {
        this._icons = {}
    }, ready: function () {
        this.super();
        this.updateIcons()
    }, iconById: function (id) {
        return this._icons[id] || (this._icons[id] = this.querySelector("#" + id))
    }, cloneIcon: function (id) {
        var icon = this.iconById(id);
        if (icon) {
            var content = icon.cloneNode(true);
            content.removeAttribute("id");
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 " + this.iconSize + " " + this.iconSize);
            svg.style.pointerEvents = "none";
            svg.appendChild(content);
            return svg
        }
    }, get iconNames() {
        if (!this._iconNames) {
            this._iconNames = this.findIconNames()
        }
        return this._iconNames
    }, findIconNames: function () {
        var icons = this.querySelectorAll("[id]").array();
        if (icons.length) {
            return icons.map(function (n) {
                return n.id
            })
        }
    }, applyIcon: function (element, icon) {
        var root = element;
        var old = root.querySelector("svg");
        if (old) {
            old.remove()
        }
        var svg = this.cloneIcon(icon);
        if (!svg) {
            return
        }
        svg.setAttribute("height", "100%");
        svg.setAttribute("width", "100%");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.display = "block";
        root.insertBefore(svg, root.firstElementChild);
        return svg
    }, updateIcons: function (selector, method) {
        selector = selector || "[icon]";
        method = method || "updateIcon";
        var deep = window.ShadowDOMPolyfill ? "" : "html /deep/ ";
        var i$ = document.querySelectorAll(deep + selector);
        for (var i = 0, e; e = i$[i]; i++) {
            if (e[method]) {
                e[method].call(e)
            }
        }
    }
});