(function (scope) {
    var ContextFreeParser = {
        parse: function (text) {
            var top = {};
            var entities = [];
            var current = top;
            var subCurrent = {};
            var scriptDocCommentClause = "\\/\\*\\*([\\s\\S]*?)\\*\\/";
            var htmlDocCommentClause = "<!--([\\s\\S]*?)-->";
            var docCommentRegex = new RegExp(scriptDocCommentClause + "|" + htmlDocCommentClause, "g");
            var docComments = text.match(docCommentRegex) || [];
            docComments.forEach(function (m) {
                var lines = m.replace(/\r\n/g, "\n").replace(/^\s*\/\*\*|^\s*\*\/|^\s*\* ?|^\s*\<\!-\-|^s*\-\-\>/gm, "").split("\n");
                var pragmas = [];
                lines = lines.filter(function (l) {
                    var m = l.match(/\s*@([\w-]*) (.*)/);
                    if (!m) {
                        return true
                    }
                    pragmas.push(m)
                });
                var code = lines.join("\n");
                pragmas.forEach(function (m) {
                    var pragma = m[1], content = m[2];
                    switch (pragma) {
                        case"class":
                        case"element":
                            current = {name: content, description: code};
                            entities.push(current);
                            break;
                        case"attribute":
                        case"property":
                        case"method":
                        case"event":
                            subCurrent = {name: content, description: code};
                            var label = pragma == "property" ? "properties" : pragma + "s";
                            makePragma(current, label, subCurrent);
                            break;
                        case"default":
                        case"type":
                            subCurrent[pragma] = content;
                            break;
                        case"param":
                            var eventParmsRe = /\{(.+)\}\s+(\w+[.\w+]+)\s+(.*)$/;
                            var params = content.match(eventParmsRe);
                            if (params) {
                                var subEventObj = {type: params[1], name: params[2], description: params[3]};
                                makePragma(subCurrent, pragma + "s", subEventObj)
                            }
                            break;
                        default:
                            current[pragma] = content;
                            break
                    }
                });
                function makePragma(object, pragma, content) {
                    var p$ = object;
                    var p = p$[pragma];
                    if (!p) {
                        p$[pragma] = p = []
                    }
                    p.push(content)
                }
            });
            if (entities.length === 0) {
                entities.push({name: "Entity", description: "**Undocumented**"})
            }
            return entities
        }
    };
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ContextFreeParser
    } else {
        scope.ContextFreeParser = ContextFreeParser
    }
})(this);