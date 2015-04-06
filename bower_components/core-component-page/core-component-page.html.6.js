Polymer("core-header-panel", {
    publish: {mode: {value: "", reflect: true}, tallClass: "tall", shadow: false},
    animateDuration: 200,
    modeConfigs: {
        shadowMode: {waterfall: 1, "waterfall-tall": 1},
        noShadow: {seamed: 1, cover: 1, scroll: 1},
        tallMode: {"waterfall-tall": 1},
        outerScroll: {scroll: 1}
    },
    ready: function () {
        this.scrollHandler = this.scroll.bind(this);
        this.addListener()
    },
    detached: function () {
        this.removeListener(this.mode)
    },
    addListener: function () {
        this.scroller.addEventListener("scroll", this.scrollHandler)
    },
    removeListener: function (mode) {
        var s = this.getScrollerForMode(mode);
        s.removeEventListener("scroll", this.scrollHandler)
    },
    domReady: function () {
        this.async("scroll")
    },
    modeChanged: function (old) {
        var header = this.header;
        if (header) {
            var configs = this.modeConfigs;
            if (configs.tallMode[old] && !configs.tallMode[this.mode]) {
                header.classList.remove(this.tallClass);
                this.async(function () {
                    header.classList.remove("animate")
                }, null, this.animateDuration)
            } else {
                header.classList.toggle("animate", configs.tallMode[this.mode])
            }
        }
        if (configs && (configs.outerScroll[this.mode] || configs.outerScroll[old])) {
            this.removeListener(old);
            this.addListener()
        }
        this.scroll()
    },
    get header() {
        return this.$.headerContent.getDistributedNodes()[0]
    },
    getScrollerForMode: function (mode) {
        return this.modeConfigs.outerScroll[mode] ? this.$.outerContainer : this.$.mainContainer
    },
    get scroller() {
        return this.getScrollerForMode(this.mode)
    },
    scroll: function () {
        var configs = this.modeConfigs;
        var main = this.$.mainContainer;
        var header = this.header;
        var sTop = main.scrollTop;
        var atTop = sTop === 0;
        this.$.dropShadow.classList.toggle("hidden", !this.shadow && (atTop && configs.shadowMode[this.mode] || configs.noShadow[this.mode]));
        if (header && configs.tallMode[this.mode]) {
            header.classList.toggle(this.tallClass, atTop || header.classList.contains(this.tallClass) && main.scrollHeight < this.$.outerContainer.offsetHeight)
        }
        this.fire("scroll", {target: this.scroller}, this, false)
    }
});