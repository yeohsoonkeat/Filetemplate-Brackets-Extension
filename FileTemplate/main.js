define(function (require, exports, module) {
    "use strict";
    
	var docIndex = 1,
		DocumentManager = brackets.getModule("document/DocumentManager"),
		Commands = brackets.getModule("command/Commands"),
		CommandManager = brackets.getModule("command/CommandManager"),
		KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
		EditorManager = brackets.getModule("editor/EditorManager"),
		MainViewManager = brackets.getModule("view/MainViewManager"),
		Menus = brackets.getModule("command/Menus"),
		HTMLTemplate = require("text!templates/basicHtml.html"),
        PHPTemplate = require("text!templates/basicphp.php");
    
    function templateHandler(template) {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange(template, insertionPos);
        }
    }
    function newHTMLHandle() {
		var defaultExtension = ".html",
		    doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);

		MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
		templateHandler(HTMLTemplate);
		return new $.Deferred().resolve(doc).promise();
	}
    
     function newPHPHandle() {
		var defaultExtension = ".php",
		    doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);

		MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
		templateHandler(PHPTemplate);
		return new $.Deferred().resolve(doc).promise();
	}
    
    var menuLabel = "fileTemplate";
    var menuID = "yeohsoonkeat.htmlTemplate";
    
	CommandManager.register(menuLabel, menuID, newHTMLHandle);
	var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
	menu.addMenuItem(menuID, undefined, Menus.AFTER, Commands.FILE_NEW_UNTITLED);
    KeyBindingManager.addBinding(menuID, "Ctrl-H", "mac");
	KeyBindingManager.addBinding(menuID, "Ctrl-H", "win");
    
    var menuID1 = "yeohsoonkeat.phpTemplate"
    
    CommandManager.register(menuLabel, menuID1, newPHPHandle);
    menu.addMenuItem(menuID1, undefined, Menus.AFTER, Commands.FILE_NEW_UNTITLED);
    KeyBindingManager.addBinding(menuID1, "Ctrl-P", "mac");
	KeyBindingManager.addBinding(menuID1, "Ctrl-P", "win");
    
});