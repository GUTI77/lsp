(function(){define(["utilities/global","controllers/application"],function(){var e=window.LSP.utilities;e.register("controller","clearable",function(){var e={},t=window.LSP;return e={name:"clearable",events:{clearable:{onClear:function(e,t){$(t.passthrough.targetInput).val(""),$(t.passthrough.targetInput).trigger("change")},onShowHideButton:function(e,t){var n=$(t.passthrough.targetInput);$(t.passthrough.targetInput).val().length>0?n.next("button").fadeIn(200):n.next("button").fadeOut(200)},onSelectedInput:function(e,t){$(t.selector).select()}},application:{onAttachEvents:function(t,n){$(".clearable:not([data-isclearablehandled])",n.selector).each(function(t,n){e.attach(n)}),$('input[type="text"], input[type="number"], input[type="tel"]',n.selector).off("focusable").on("click.lsp.focusable",function(t){$(e).triggerHandler("onSelectedInput",{selector:$(this)})}).change()}}},assets:{},attach:function(n){var r=$('<button type="button" class="b5 clearContents" tabindex="-1">Clear Contents</button>').on("click.lsp.clearable",t.controllers.application.createHandlerBridge(e,"clear",{targetInput:n}));$(n).off(".clearable").on("keyup.lsp.clearable change.lsp.clearable",t.controllers.application.createHandlerBridge(e,"showHideButton",{targetInput:n})).wrap('<div class="clearableContainer" />').after(r).attr("data-isclearablehandled",!0),t.controllers.application.attachEvents(n)},makeElement:function(e,t){return'<div class="badges-badge badge-'+$(this).data("badge")+'">'+$(this).data("badge")+"</div>"}},e}())})})();