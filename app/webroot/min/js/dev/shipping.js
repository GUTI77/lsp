(function(){define(["utilities/global","controllers/application"],function(){var e=window.LSP.utilities,t=function(){var t={},n=window.LSP,r=n.models.api,i={bodyNoTrackingNumbersFoundClass:"shipping-noTrackingNumbersFound",trackingNumberSelector:".testOnly-trackingNumbers"};return t={name:"shipping",events:{application:{onAttachEvents:function(n,r){$("form#shipping-inputForm").bind("submit",function(e){return e.preventDefault(),!1}).bind("afterValidation",function(n){t.submit(e.formToObject(this,null,!1))})}}},assets:{},submit:function(e){e.search.substr(0,2).toUpperCase()==="1Z"?t.redirectToUPS(e.search):(t.clearTrackingNumbers(),$.when(t.requestTrackingNumber(e.search,e.emailAddress)).done(function(e){t.getTrackingData(((e.response.data||{}).trackingnumbers||"").toUpperCase())}))},getTrackingData:function(e){if(e.length!==0){var n=e.split(" ");for(var r=0;r<n.length;r++)$.when(t.requestTrackingData(n[r])).done(function(e){t.displayTrackingData(e.response.data)}).fail(function(e){$("body").addClass(i.bodyNoTrackingNumbersFoundClass)})}else $("body").addClass(i.bodyNoTrackingNumbersFoundClass)},clearTrackingNumbers:function(){$(i.trackingNumberSelector).html(""),$("body").removeClass(i.bodyNoTrackingNumbersFoundClass)},displayTrackingData:function(e){console.log(e),$(i.trackingNumberSelector).append(JSON.stringify(e))},requestTrackingNumber:function(e,n){return r.request(t,"getTrackingNumber","getTrackingNumber",{salesOrderNumber:e.replace(/[^0-9]+/,""),emailAddress:$.trim(n)})},requestTrackingData:function(e){return r.request(t,"getUPSTrackingData","getUPSTrackingData",{trackingNumber:e})}},t}();e.register("controller","shipping",t)})})();