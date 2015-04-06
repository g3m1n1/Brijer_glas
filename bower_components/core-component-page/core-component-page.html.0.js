(function () {
    var SKIP_ID = "meta";
    var metaData = {}, metaArray = {};
    Polymer("core-meta", {
        type: "default", alwaysPrepare: true, ready: function () {
            this.register(this.id)
        }, get metaArray() {
            var t = this.type;
            if (!metaArray[t]) {
                metaArray[t] = []
            }
            return metaArray[t]
        }, get metaData() {
            var t = this.type;
            if (!metaData[t]) {
                metaData[t] = {}
            }
            return metaData[t]
        }, register: function (id, old) {
            if (id && id !== SKIP_ID) {
                this.unregister(this, old);
                this.metaData[id] = this;
                this.metaArray.push(this)
            }
        }, unregister: function (meta, id) {
            delete this.metaData[id || meta.id];
            var i = this.metaArray.indexOf(meta);
            if (i >= 0) {
                this.metaArray.splice(i, 1)
            }
        }, get list() {
            return this.metaArray
        }, byId: function (id) {
            return this.metaData[id]
        }
    })
})();