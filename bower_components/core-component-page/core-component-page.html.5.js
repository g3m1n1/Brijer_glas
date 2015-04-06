(function () {
    Polymer("core-toolbar", {
        justify: "", middleJustify: "", bottomJustify: "", justifyChanged: function (old) {
            this.updateBarJustify(this.$.topBar, this.justify, old)
        }, middleJustifyChanged: function (old) {
            this.updateBarJustify(this.$.middleBar, this.middleJustify, old)
        }, bottomJustifyChanged: function (old) {
            this.updateBarJustify(this.$.bottomBar, this.bottomJustify, old)
        }, updateBarJustify: function (bar, justify, old) {
            if (old) {
                bar.removeAttribute(this.toLayoutAttrName(old))
            }
            if (this.justify) {
                bar.setAttribute(this.toLayoutAttrName(justify), "")
            }
        }, toLayoutAttrName: function (value) {
            return value === "between" ? "justified" : value + "-justified"
        }
    })
})();