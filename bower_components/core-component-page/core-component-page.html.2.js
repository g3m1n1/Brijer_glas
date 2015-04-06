(function () {
    var meta;
    Polymer("core-icon", {
        src: "",
        icon: "",
        alt: null,
        observe: {icon: "updateIcon", alt: "updateAlt"},
        defaultIconset: "icons",
        ready: function () {
            if (!meta) {
                meta = document.createElement("core-iconset")
            }
            if (this.hasAttribute("aria-label")) {
                if (!this.hasAttribute("role")) {
                    this.setAttribute("role", "img")
                }
                return
            }
            this.updateAlt()
        },
        srcChanged: function () {
            var icon = this._icon || document.createElement("div");
            icon.textContent = "";
            icon.setAttribute("fit", "");
            icon.style.backgroundImage = "url(" + this.src + ")";
            icon.style.backgroundPosition = "center";
            icon.style.backgroundSize = "100%";
            if (!icon.parentNode) {
                this.appendChild(icon)
            }
            this._icon = icon
        },
        getIconset: function (name) {
            return meta.byId(name || this.defaultIconset)
        },
        updateIcon: function (oldVal, newVal) {
            if (!this.icon) {
                this.updateAlt();
                return
            }
            var parts = String(this.icon).split(":");
            var icon = parts.pop();
            if (icon) {
                var set = this.getIconset(parts.pop());
                if (set) {
                    this._icon = set.applyIcon(this, icon);
                    if (this._icon) {
                        this._icon.setAttribute("fit", "")
                    }
                }
            }
            if (oldVal) {
                if (oldVal.split(":").pop() == this.getAttribute("aria-label")) {
                    this.updateAlt()
                }
            }
        },
        updateAlt: function () {
            if (this.getAttribute("aria-hidden")) {
                return
            }
            if (this.alt === "") {
                this.setAttribute("aria-hidden", "true");
                if (this.hasAttribute("role")) {
                    this.removeAttribute("role")
                }
                if (this.hasAttribute("aria-label")) {
                    this.removeAttribute("aria-label")
                }
            } else {
                this.setAttribute("aria-label", this.alt || this.icon.split(":").pop());
                if (!this.hasAttribute("role")) {
                    this.setAttribute("role", "img")
                }
                if (this.hasAttribute("aria-hidden")) {
                    this.removeAttribute("aria-hidden")
                }
            }
        }
    })
})();