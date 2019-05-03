define(function (require, exports, module) {
    "use strict";
    
	const docIndex = 1,
		DocumentManager = brackets.getModule("document/DocumentManager"),
		Commands = brackets.getModule("command/Commands"),
		CommandManager = brackets.getModule("command/CommandManager"),
		KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
		EditorManager = brackets.getModule("editor/EditorManager"),
		MainViewManager = brackets.getModule("view/MainViewManager"),
		Menus = brackets.getModule("command/Menus"),
		HTMLTemplate = require("text!templates/basicHtml.html"),
        vueTemplate = require("text!templates/basicVue.html"),
        ajaxTemplate = require("text!templates/basicAjax.html"),
        PHPTemplate = require("text!templates/basicphp.php");
    
    function templateHandler(template) {
        let editor = EditorManager.getFocusedEditor();
        if (editor) {
            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange(template, insertionPos);
        }
    }
    function newAjaxHandle() {
		let defaultExtension = ".html",
            doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);

		MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
		templateHandler(ajaxTemplate);
		return new $.Deferred().resolve(doc).promise();
	}
    
     function newPHPHandle() {
		let defaultExtension = ".php",
            doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);

		MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
		templateHandler(PHPTemplate);
		return new $.Deferred().resolve(doc).promise();
	}
    
    function newVueHandle() {
		let defaultExtension = ".html",
            doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);

		MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
		templateHandler(vueTemplate);
		return new $.Deferred().resolve(doc).promise();
	}
    
    function newHTMLHandle() {
		let defaultExtension = ".html",
            doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);

		MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
		templateHandler(HTMLTemplate);
		return new $.Deferred().resolve(doc).promise();
	}
    
    let menuLabel = "fileTemplate";
    let menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    
    let menuID1 = "yeohsoonkeat.phpTemplate";
    
    CommandManager.register(menuLabel, menuID1, newPHPHandle);
    menu.addMenuItem(menuID1, undefined, Menus.AFTER, Commands.FILE_NEW_UNTITLED);
    KeyBindingManager.addBinding(menuID1, "Ctrl-P", "mac");
    KeyBindingManager.addBinding(menuID1, "Ctrl-P", "win");
    
    let menuID2 = "yeohsoonkeat.vueTemplate";
    
    CommandManager.register(menuLabel, menuID2, newVueHandle);
    menu.addMenuItem(menuID2, undefined, Menus.AFTER, Commands.FILE_NEW_UNTITLED);
    KeyBindingManager.addBinding(menuID2, "Ctrl-Shift-V", "mac");
    KeyBindingManager.addBinding(menuID2, "Ctrl-Shift-V", "win");
    
    let menuID3 = "yeohsoonkeat.ajaxTemplate";
    
    CommandManager.register(menuLabel, menuID3, newAjaxHandle);
    menu.addMenuItem(menuID3, undefined, Menus.AFTER, Commands.FILE_NEW_UNTITLED);
    KeyBindingManager.addBinding(menuID3, "Ctrl-Shift-A", "mac");
    KeyBindingManager.addBinding(menuID3, "Ctrl-Shift-A", "win");
    
    let menuID4 = "yeohsoonkeat.htmlTemplate";
    
	CommandManager.register(menuLabel, menuID4, newHTMLHandle);
	menu.addMenuItem(menuID4, undefined, Menus.AFTER, Commands.FILE_NEW_UNTITLED);
    KeyBindingManager.addBinding(menuID4, "Ctrl-Shift-N", "mac");
    KeyBindingManager.addBinding(menuID4, "Ctrl-Shift-N", "win");
});
