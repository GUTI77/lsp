(function(){define(["utilities/global","controllers/application","models/api"],function(){var e=window.LSP.utilities,t=window.LSP.models;e.register("model","netsuite",function(){var e=$.extend({},t.api);return $.extend(e,{_url:function(e,t){var n="https://forms.netsuite.com/app/site/hosting/scriptlet.nl";return n=t.method.match("getUPS")?"https://d2bghjaa5qmp6f.cloudfront.net/shipping/"+t.method:n,n},_payload:function(e,t){return $.extend(t.data,{method:t.method,deploy:"1",script:"25",h:"55cda7fb2a0d8a937f00",compid:"665798"})},request:function(e,t,n,r){return this._request("GET","jsonp",e,t,{data:r,method:n})}})}())})})();