Polymer("core-icon-button", {
    src: "", active: false, icon: "", activeChanged: function () {
        this.classList.toggle("selected", this.active)
    }
});