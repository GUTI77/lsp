(function(){
    
    var _util = window.LSP.utilities;
    
    var cart = function(){
        var _this = {};
        var _app = window.LSP;
        var _assets = _app.assets;
        var _api = _app.models.api;
        var _util = _app.utilities;
        var _cartContents = [{quantity : 2, id : 34103}, {id : 2217, quantity: 23}];
        
        _this =  {
            events : {
                application : {
                    onReady : function(e, data){
                    	console.error(_this.assets.listEncoder.encode(_cartContents));
                    	console.error(_this.assets.listEncoder.decode(_this.assets.listEncoder.encode(_cartContents)));
                    	
                    },
                    onInit : function(e, data){}
                }
            },
            assets : {
            	listEncoder : new _assets.listEncoder(_this, 'listEncoder')
            },
        };
        
        return _this;
    }();
    
    _util.register('controller', 'cart', cart);

})();