!function(){define(["utilities/global","controllers/application"],function(){var a=window.LSP.utilities;a.register("controller","netsuite",function(){{var b={};window.LSP}return b={events:{application:{onReady:function(){b.attachEnterKey(),b.fixSignInUrlForRedirection(document),b.injectRedirectInput(),b.fixLogoutUrl(document)},onAttachEvents:function(a,c){b.fixSignInUrlForRedirection(c.selector)}},netsuite:{onInit:function(){b.handlePostSignInRedirection()}}},assets:{},injectRedirectInput:function(){var b=a.getURLParameters();b.lsppassthrough&&document.forms.login&&$(document.forms.login).prepend('<input type="hidden" name="redirect" value="'+b.lsppassthrough+'">')},fixLogoutUrl:function(a){var b=($('[href*="logoff=T"]',a).attr("href")||"").replace("sc=4","sc=30");$('[href*="logoff=T"]',a).attr("href",b)},fixSignInUrlForRedirection:function(b){var c=-1===document.location.href.indexOf("lsppassthrough=")?encodeURIComponent(document.location.href):a.findBetween("lsppassthrough=","&",document.location.href);-1===c.indexOf("login=T")&&$('a[href*="login=T"]:not([href*="'+c+'"], [href*="logoff=T"])',b).each(function(a,b){var d=$(b);d.attr("href",d.attr("href")+"&lsppassthrough="+c)})},handlePostSignInRedirection:function(){if(parseInt($(".page-generic").data("uid"),10)>0){var b=a.getURLParameters();b.lspredirectto&&(document.location=b.lspredirectto)}},attachEnterKey:function(){$(".page-generic table table table input").off(".submitter").on("keyup.lsp.submitter",function(a){$(this);switch(a.which){case 13:$(this).data("isDirty")&&($(this).parents().each(function(b,c){var d=$(c).find('#tbl_recalc *[type="submit"], #tbl_submitter *[onclick]')[0];return d?($(d).attr("onclick")?d.click():($('input[name="redirect"]').val(""),d.form.submit()),!1):void a.stopPropagation()}),$(this).data("isDirty",!1));break;case 40:case 38:$(this).data("isDirty",!1);break;default:$(this).data("isDirty",!0)}}).data("isDirty",!0)}}}())})}();