Polymer("core-ajax", {
    url: "",
    handleAs: "",
    auto: false,
    params: "",
    response: null,
    error: null,
    method: "",
    headers: null,
    body: null,
    contentType: "application/x-www-form-urlencoded",
    withCredentials: false,
    xhrArgs: null,
    ready: function () {
        this.xhr = document.createElement("core-xhr")
    },
    receive: function (response, xhr) {
        if (this.isSuccess(xhr)) {
            this.processResponse(xhr)
        } else {
            this.processError(xhr)
        }
        this.complete(xhr)
    },
    isSuccess: function (xhr) {
        var status = xhr.status || 0;
        return !status || status >= 200 && status < 300
    },
    processResponse: function (xhr) {
        var response = this.evalResponse(xhr);
        if (xhr === this.activeRequest) {
            this.response = response
        }
        this.fire("core-response", {response: response, xhr: xhr})
    },
    processError: function (xhr) {
        var response = xhr.status + ": " + xhr.responseText;
        if (xhr === this.activeRequest) {
            this.error = response
        }
        this.fire("core-error", {response: response, xhr: xhr})
    },
    complete: function (xhr) {
        this.fire("core-complete", {response: xhr.status, xhr: xhr})
    },
    evalResponse: function (xhr) {
        return this[(this.handleAs || "text") + "Handler"](xhr)
    },
    xmlHandler: function (xhr) {
        return xhr.responseXML
    },
    textHandler: function (xhr) {
        return xhr.responseText
    },
    jsonHandler: function (xhr) {
        var r = xhr.responseText;
        try {
            return JSON.parse(r)
        } catch (x) {
            console.warn("core-ajax caught an exception trying to parse response as JSON:");
            console.warn("url:", this.url);
            console.warn(x);
            return r
        }
    },
    documentHandler: function (xhr) {
        return xhr.response
    },
    blobHandler: function (xhr) {
        return xhr.response
    },
    arraybufferHandler: function (xhr) {
        return xhr.response
    },
    urlChanged: function () {
        if (!this.handleAs) {
            var ext = String(this.url).split(".").pop();
            switch (ext) {
                case"json":
                    this.handleAs = "json";
                    break
            }
        }
        this.autoGo()
    },
    paramsChanged: function () {
        this.autoGo()
    },
    autoChanged: function () {
        this.autoGo()
    },
    autoGo: function () {
        if (this.auto) {
            this.goJob = this.job(this.goJob, this.go, 0)
        }
    },
    go: function () {
        var args = this.xhrArgs || {};
        args.body = this.body || args.body;
        args.params = this.params || args.params;
        if (args.params && typeof args.params == "string") {
            args.params = JSON.parse(args.params)
        }
        args.headers = this.headers || args.headers || {};
        if (args.headers && typeof args.headers == "string") {
            args.headers = JSON.parse(args.headers)
        }
        var hasContentType = Object.keys(args.headers).some(function (header) {
            return header.toLowerCase() === "content-type"
        });
        if (!hasContentType && this.contentType) {
            args.headers["Content-Type"] = this.contentType
        }
        if (this.handleAs === "arraybuffer" || this.handleAs === "blob" || this.handleAs === "document") {
            args.responseType = this.handleAs
        }
        args.withCredentials = this.withCredentials;
        args.callback = this.receive.bind(this);
        args.url = this.url;
        args.method = this.method;
        this.response = this.error = null;
        this.activeRequest = args.url && this.xhr.request(args);
        return this.activeRequest
    }
});