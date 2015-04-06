Polymer("core-doc-page", {
    hilight: function (event, detail, sender) {
        detail.code = prettyPrintOne((detail.code || "").replace(/</g, "&lt;").replace(/>/g, "&gt;"))
    }, homepageFilter: function (data) {
        if (!data) {
            return ""
        }
        if (!data.homepage || data.homepage === "github.io") {
            return "//polymer.github.io/" + data.name
        } else {
            return data.homepage
        }
    }, dataChanged: function () {
        this.async(function () {
            var elementToFocus = this.shadowRoot.getElementById(window.location.hash.slice(1));
            if (elementToFocus) {
                elementToFocus.scrollIntoView()
            }
        })
    }
});