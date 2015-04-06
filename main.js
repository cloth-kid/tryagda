$(function () {
    var textArea = $("textarea").get(0);
    var editor = CodeMirror.fromTextArea(textArea, {
        lineNumbers: true,
        mode: "haskell",
        styleActiveLine: true
    });

    editor.setOption("theme", "blackboard");

    var rules = {
        "\\bn": "\u2115",
        "\\->": "\u2192"
    };

    function unicodify(line, n) {
        for (var rule in rules) {
            var m = line.indexOf(rule);
            
            if (m + 1) {
                editor.doc.replaceRange(rules[rule], { line: n, ch: m }, { line: n, ch: m + 3 });
            }
        }
    }

    editor.on("change", function (editor, event) {
        var n = event.from.line;
        var line = editor.doc.getLine(n);

        unicodify(line, n);
    });

    $("#compile").click(function () {
        if (editor.doc.getValue().length % 2 == 0) {
            $("#error").addClass("hidden");
            $("#success").removeClass("hidden");
        }
        else {
            $("#error").removeClass("hidden");
            $("#success").addClass("hidden");
        }
    });
});
