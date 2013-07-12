(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'home', (function(){
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _remainOpen = true;

		_this = {
			
			events : {
				search : {
					onAfterAPICallSuccess : function(){
						_this.closePermanentFlyout();
					}
				},
				flyout : {
					onAfterAttach : function(e, data){
						if(_remainOpen){
							_app.controllers.flyout.openFlyout(true);
						}
					}
				},
				application : {
					onReady : function(e, data){
						$('#mainSlider').touchCarousel({
							
							// This is a custom patch for Lone Star Percussion
							// It assumes uniform width of items, and calculates
							// how many items per page automatically. This solves
							// the responsive design problem of hardcoding too many
							// items per page
							_calculatePageWidth: true,
							
							scrollbar: false,
							pagingNav: true,
							pagingNavControls: false,
							itemsPerPage: 1,
							scrollToLast: true,
							loopItems: true,

							// Testing this out
							//useWebkit3d : true
						});
					},
					onInit : function(e, data){}
				}
			},
			
			assets : {},
			
			closePermanentFlyout : function(){
				_remainOpen = false;
				_app.controllers.flyout.closeFlyout(true);
			}
		};
		
		return _this;

	})());

})();