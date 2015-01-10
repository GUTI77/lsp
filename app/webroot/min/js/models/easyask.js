(function(){define(["utilities/global","controllers/application","models/api"],function(){var e=window.LSP.utilities,t=window.LSP.models;e.register("model","easyask",function(){var n=$.extend({},t.api),r="nslonestarpercussion",i="http://lonestarpercussion.prod.easyaskondemand.com",s,o={};return $.extend(n,{_timeout:3e4,_url:function(e,t){return i+"/EasyAsk/apps/Advisor.jsp"},_payload:function(t,i){var s={RequestAction:i.action,RequestData:i.method,currentpage:i.page||1,forcepage:1,ResultsPerPage:i.resultsPerPage||24,defsortcols:i.sort==="default"?"":i.sort,indexed:1,rootprods:1,oneshot:1,defarrangeby:"///NONE///",disp:"json",dct:r,q:i.keywords&&i.keywords.length?i.keywords:undefined,AttribSel:n.combineSimilarAttributesForRequest(i.attribute,i.allAttributes)};s.CatPath=e.cleanArray([(i.category||"").replace("All Products",""),n.combineAndRemoveAllForPath(i.attribute,i.allAttributes),this.buildKeywordString(i.keywords)]).join("/").replace(/^\/{1,}-/,"-"),$.isEmptyObject(i.allAttributes)&&!i.attribute&&i.method==="CA_AttributeSelected"&&(s.RequestData="CA_BreadcrumbClick"),s.RequestData==="CA_BreadcrumbRemove"&&!s.q&&!s.AttribSel&&(s.RequestData="CA_CategoryExpand"),s.RequestData!=="CA_Search"&&delete s.q;if(s.ResultsPerPage>96||(s.ResultsPerPage+""||"").toLowerCase()==="all")s.ResultsPerPage=96;return s.CatPath=s.CatPath.replace(/\/$/,"").replace(/^\//,"").replace(/\/\//g,"/"),s},_isSuccess:function(e){return(e||{}).returnCode===0},isRedirect:function(e){return/((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?/.test(e.errorMsg)||/^\//.test(e.errorMsg)},_afterSuccess:function(e){if(n.isRedirect(e)){document.location=e.errorMsg;return}s=e.sessionID,e.source=n.clean(e.source),e.source.navPath._lsp=e.source.navPath._lsp||{},e.source.navPath._lsp.categoryNodes=n.getCategoryNodes(e.source),e.source.navPath._lsp.refinementNodes=n.getRefinementNodes(e.source),e.source.navPath._lsp.searchNode=n.getSearchNode(e.source),this.cacheAttributes(e.source),e.source.attributes=e.source.attributes||{},e.source.attributes._lsp=e.source.attributes._lsp||{},e.source.attributes._lsp.cached=n.injectCachedAttributes(e.source),e.source._lsp=e.source._lsp||{},e.source._lsp.query=n.parseCommentaryForDidYouMean(e.source.commentary);for(var t=0;t<((e.source.products||{}).items||{}).length;t++)if(e.source.products.items[t].Matrix_Values){var r=$.parseJSON(e.source.products.items[t].Matrix_Values);e.source.products.items[t]._formattedMatrixObject=n.parseMatrixChildren(r)}return e},clean:function(e){for(var t=0;t<((e.categories||{}).categoryList||[]).length;t++)e.categories.categoryList[t].name==="Schools"&&(e.categories.categoryList.splice(t,1),t--);var n;for(var t=0;t<((e.attributes||{}).attribute||{}).length;t++){for(var r=0;r<(e.attributes.attribute[t].attributeValueList||{}).length;r++){n=e.attributes.attribute[t].attributeValueList[r].attributeValue;if(n.substr(0,1)==="!"||n==="None"||n==="Unknown"||n==="Required")e.attributes.attribute[t].attributeValueList.splice(r,1),r--}for(var r=0;r<(e.attributes.attribute[t].initialAttributeValueList||{}).length;r++){n=e.attributes.attribute[t].initialAttributeValueList[r].attributeValue;if(n.substr(0,1)==="!"||n==="None"||n==="Unknown"||n==="Required")e.attributes.attribute[t].initialAttributeValueList.splice(r,1),e.attributes.attribute[t].initDispLimit--,r--}e.attributes.attribute[t].attributeValueList.length===0&&(e.attributes.attribute.splice(t,1),t--)}return((e.attributes||{}).attribute||[]).length===0&&delete e.attributes,e},combineAndRemoveAllForPath:function(e,t){if(t&&e){var n=e.replace(/:.*/,"");t=t.split("/");for(var r=0;r<t.length;r++)t[r].replace(/:.*/,"")===n&&(t.splice(r,1),r--);return t.join("/")}return t},combineSimilarAttributesForRequest:function(e,t){if(t&&e){var n=e.replace(/:.*/,"");t=t.split("/");for(var r=0;r<t.length;r++)t[r].replace(/:.*/,"")===n&&(e+=";"+t[r]);return e}return e},buildKeywordString:function(e){return e?("-"+e).replace(/-{1,}/,"-"):null},buildSingleAttributeString:function(e){return this.buildMultiAttributeString(e).replace("AttribSelect=","").replace(/\/\/\/\/*/,"")},clearCachedAttributes:function(){o={}},cacheAttributes:function(e){var t={};$.each(o,function(e,t){o[t.attribute.name].isFromCached=!0});for(var n=0;n<((e.attributes||{}).attribute||{}).length;n++){var r=e.attributes.attribute[n];o[r.name]={index:n,attribute:r,isFromCached:!1},t[r.name]=!0}return $.each(o,function(n,r){var i=$(e.navPath.navPathNodeList).last()[0].seoPath,s=r.attribute.attributeValueList[0].nodeString.replace(/:.*/,"");!t[r.attribute.name]&&i.indexOf(s+":")<0&&delete o[r.attribute.name]}),t},injectCachedAttributes:function(e){var t=[],n=[];return $.each(o,function(e,t){n.push(t)}),n.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:e.isFromCached&&!t.isFromCached?-1:t.isFromCached&&!e.isFromCached?1:0}),$.each(n,function(n,r){var i=!1;for(var s=0;s<((e.attributes||{}).attribute||{}).length;s++)e.attributes.attribute[s].attributeName===r.attribute.name&&(i=!0,t.push(e.attributes.attribute[s]));i||t.push(r.attribute)}),this.markSelectedAttributes(e,t)},markSelectedAttributes:function(e,t){var t=$.extend(!0,[],t);return $.each(((e.navPath||{})._lsp||{}).refinementNodes,function(e,n){for(var r=0;r<(t||{}).length;r++)if((t[r]||{}).name===n.attribute){for(var e=0;e<(t[r].attributeValueList||{}).length;e++)if(n.value===t[r].attributeValueList[e].attributeValue){t[r].attributeValueList[e].selected=!0;break}break}}),t},getCategoryNodes:function(e){var t=[],n=e.navPath.navPathNodeList,r=this.getCategoriesFromSEOPath(n[n.length-1].seoPath);for(var i=0;i<e.navPath.navPathNodeList.length;i++)if(n[i].navNodePathType===1){n[i].englishName=n[i].englishName.replace(/\/$/,""),n[i].englishName=n[i].englishName==="All-Products"?"All Products":n[i].englishName;if(n[i].englishName!=="All Products"&&n[i].englishName!=="School"){var s=t.push(n[i]),o=t[s-1].seoPath;t[s-1].removePath=r.substr(r.indexOf(o)+o.length,r.length)}}return t},getSearchNode:function(e){for(var t=0;t<e.navPath.navPathNodeList.length;t++)if(e.navPath.navPathNodeList[t].navNodePathType===3)return e.navPath.navPathNodeList[t]},getRefinementNodes:function(t){var n=[];for(var r=0;r<t.navPath.navPathNodeList.length;r++){var i=t.navPath.navPathNodeList[r];if(i.navNodePathType===2){var s=decodeURIComponent(t.navPath.fullPath).replace(/\+/g," "),o=i.englishName.substring(1,i.englishName.length-2);o=o.split("'); (");for(var u=0;u<o.length;u++){var a=o[u].split("' or ");for(var f=0;f<a.length;f++){var l=a[f].split(" = '"),c=this.convertToSEOString(l[0]+":"+l[1]),h=e.findBetween(c,";",i.seoPath);n.push({attribute:l[0],value:l[1],nodeString:c+h})}}}}return n},parseMatrixChildren:function(e){var t={},n={},e=(typeof e=="string"?$.parseJSON(e):e)||[];for(var r=0;r<e.length;r++){var i=e[r][0],s=e[r][1].split("|"),o=s[0],u=s[1],a=s[2],f=s[3],l=s[4],c=s[5],h=s[6],p=s[7];waysToSave=s[8],specialFeature=s[9],t[o]=t[o]||{},t[o][u]=t[o][u]||[],t[o][u].push(i),n[i]=n[i]||{},n[i].options=n[i].options||{},n[i].options[o]=n[i].options[o]||{},n[i].options[o]=u,n[i].data=n[i].data||{},n[i].data.imageUrl=f,n[i].data.mpn=l,n[i].data.onlinePrice=c,n[i].data.msrp=h,n[i].data.stockMessage=p,n[i].data.waysToSave=waysToSave,n[i].data.specialFeature=specialFeature}return{options:t,products:n}},filterMatrixChildren:function(e,t){var n={},r={};return $.each(e.products,function(e,n){for(var i in t)if(t.hasOwnProperty(i)&&n.options[i]&&n.options[i]!=t[i])return;r[e]=n}),$.each(r,function(e,r){$.each(r.options,function(r,i){t[r]||(n[r]=n[r]||{},n[r][i]=n[r][i]||[],n[r][i].push(e))})}),n},convertToSEOString:function(e){return e.replace(/'/g,"").replace(/[^A-Za-z0-9:]/g,"-").replace(/-{1,}/g,"-").replace(/-$/,"").replace(/:-/,":")},getCategoriesFromSEOPath:function(e){var e=e.split("/");for(var t=0;t<e.length;t++)if(e[t].indexOf(":")>0||e[t].indexOf("-")===0)e.splice(t,1),t--;return e.join("/")},getRefinementsFromSEOPath:function(e){var e=e.split("/");for(var t=0;t<e.length;t++)if(e[t].indexOf(":")<0||e[t].indexOf("-")===0)e.splice(t,1),t--;return e.join("/")},getKeywordsFromSEOPath:function(e){var e=unescape(e).split("/");for(var t=0;t<e.length;t++)if(e[t].indexOf("-")===0)return encodeURIComponent(e[t]);return""},parseCommentaryForDidYouMean:function(t){var n={};if(t.length>0&&t.indexOf("Corrected Word")>-1){var r=t.split(" ");n.originalQuery=e.findBetween("Corrected Word: "," is ",t),n.assumedQuery=e.findBetween(" is ","; ",t),n.otherSuggestions=(e.findBetween(" could be  ","~END",t+"~END")||"").split(", ")}return n}})}())})})();