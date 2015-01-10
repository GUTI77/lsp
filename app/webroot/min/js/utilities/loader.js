(function(){window.LSP=window.LSP||{},window.LSP.utilities=window.LSP.utilities||{};var e={home:{element:".page-home",js:["controllers/home"],priority:"critical"},netsuite:{element:"#handle_loginMainPortlet, #handle_cartMainPortlet",js:["controllers/netsuite","controllers/checkout","vendors/netsuite/interface"],priority:"critical"},product:{element:'.page-productDetail, .productScope, *[data-controller="product"]',js:["controllers/product"],priority:"critical"},wishlist:{element:".page-wishlist, .wishlist-messages",js:["controllers/wishlist"],css:["pages/wishlist.css"],priority:document.location.href.indexOf("Wishlist")>0?"critical":"secondary"},reviews:{element:".aggregateReviews, .page-generic .reviews",js:["controllers/reviews"],priority:"secondary"},trackOrder:{element:".page-trackOrder",js:["controllers/shipping"],priority:"critical"},badges:{element:"*[data-badge]",js:["plugins/badges"],priority:"secondary"},definitions:{element:"*[data-def]",js:["plugins/definitions"],priority:"secondary"},suggestions:{element:".dynamicItemSuggestions",js:["plugins/suggestions"],priority:"secondary"},validation:{element:'*[class*="validation-"]',js:["plugins/validation"],priority:"secondary"},zoom:{element:"#zoom-mainImage",js:["vendors/jqzoom/jqzoom"],priority:"secondary"},ads:{element:'*[class*="bsa-"], .productAd',js:["plugins/ads"],priority:"secondary"},category:{element:".page-category",js:["controllers/category"],priority:"critical"},schoolCategory:{element:".page-school-category",js:["controllers/category"],priority:"critical"},checkout:{element:".header.small",js:["controllers/checkout","controllers/netsuite"],priority:"critical"}},t=require.toUrl("").indexOf("min")>0;window.LSP.utilities.loader={load:function(n){var r={},i=[];for(var s in e)if(e.hasOwnProperty(s)){var o=e[s];if($(o.element,n).length>0||o.always)o.js&&o.minjs&&(o.js=t?o.minjs:o.js),o.js&&(r[o.priority]=r[o.priority]||[],r[o.priority]=r[o.priority].concat(o.js)),o.css&&(i=i.concat(o.css))}this.loadJS(r),i.length>0&&this.loadCSS($(i).not(this.loadedCSS).get())},loadJS:function(e,t){var n=(e.critical||[]).concat(e.secondary||[]);require(n,function(){(t||function(){})()})},getStylesheetUrls:function(){var e=document.getElementsByTagName("link"),t=[];for(var n=0;n<e.length;n++)t.push(e[n].href.replace(/https?\:/,""));return t},loadCSS:function(e){var t=this.getStylesheetUrls();for(var n=0;n<e.length;n++){var r=CDN+"/min/css/"+e[n]+"?v="+VERSION;t.indexOf(r)===-1&&googleAsyncCSSLoader(r)}}},window.LSP.utilities.loader.loadJS({critical:["jquery","combined/core"]}),window.LSP.utilities.loader.loadCSS(["combined/category.css","combined/home.css","combined/product.css","combined/search.css","ns-checkout.css"])})();