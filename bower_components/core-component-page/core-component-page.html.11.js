Polymer("core-xhr", {
    request: function (options) {
        var xhr = new XMLHttpRequest;
        var url = options.url;
        var method = options.method || "GET";
        var async = !options.sync;
        var params = this.toQueryString(options.params);
        if (params && method == "GET") {
            url += (url.indexOf("?") > 0 ? "&" : "?") + params
        }
        var xhrParams = this.isBodyMethod(method) ? options.body || params : null;
        xhr.open(method, url, async);
        if (options.responseType) {
            xhr.responseType = options.responseType
        }
        if (options.withCredentials) {
            xhr.withCredentials = true
        }
        this.makeReadyStateHandler(xhr, options.callback);
        this.setRequestHeaders(xhr, options.headers);
        xhr.send(xhrParams);
        if (!async) {
            xhr.onreadystatechange(xhr)
        }
        return xhr
    }, toQueryString: function (params) {
        var r = [];
        for (var n in params) {
            var v = params[n];
            n = encodeURIComponent(n);
            r.push(v == null ? n : n + "=" + encodeURIComponent(v))
        }
        return r.join("&")
    }, isBodyMethod: function (method) {
        return this.bodyMethods[(method || "").toUpperCase()]
    }, bodyMethods: {POST: 1, PUT: 1, DELETE: 1}, makeReadyStateHandler: function (xhr, callback) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback && callback.call(null, xhr.response, xhr)
            }
        }
    }, setRequestHeaders: function (xhr, headers) {
        if (headers) {
            for (var name in headers) {
                xhr.setRequestHeader(name, headers[name])
            }
        }
    }
});