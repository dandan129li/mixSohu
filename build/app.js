(function(){
      
  var createAppHandler = function() {
    return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var $app_script$ = __webpack_require__(13)
	
	$app_define$('@app-application/app', [], function($app_require$, $app_exports$, $app_module$){
	     $app_script$($app_module$, $app_exports$, $app_require$)
	     if ($app_exports$.__esModule && $app_exports$.default) {
	            $app_module$.exports = $app_exports$.default
	        }
	})
	
	$app_bootstrap$('@app-application/app',{ packagerVersion: '0.0.5'})


/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = function(module, exports, $app_require$){"use strict";
	
	module.exports = {};
	(exports.default || module.exports).manifest = {"package":"com.sohu.module","name":"搜狐视频","versionName":"1.0.0","versionCode":"1","minPlatformVersion":"101","icon":"/Common/logoB.png","features":[{"name":"system.prompt"},{"name":"system.router"},{"name":"system.shortcut"},{"name":"system.fetch"},{"name":"system.device"},{"name":"system.share"},{"name":"system.network"}],"permissions":[{"origin":"*"}],"config":{"logLevel":"debug"},"router":{"entry":"Index","pages":{"Index":{"component":"index"},"Demo":{"component":"index"},"Play":{"component":"play","path":"/play"}}},"display":{"titleBarBackgroundColor":"#f2f2f2","titleBarTextColor":"#414141","menu":false,"fullScreen":true,"titleBar":false}};
	}

/***/ }

/******/ });
  };
  if (typeof window === "undefined") {
    return createAppHandler();
  }
  else {
    window.createAppHandler = createAppHandler
    // H5注入manifest以获取features
    global.manifest = {"package":"com.sohu.module","name":"搜狐视频","versionName":"1.0.0","versionCode":"1","minPlatformVersion":"101","icon":"/Common/logoB.png","features":[{"name":"system.prompt"},{"name":"system.router"},{"name":"system.shortcut"},{"name":"system.fetch"},{"name":"system.device"},{"name":"system.share"},{"name":"system.network"}],"permissions":[{"origin":"*"}],"config":{"logLevel":"debug"},"router":{"entry":"Index","pages":{"Index":{"component":"index"},"Demo":{"component":"index"},"Play":{"component":"play","path":"/play"}}},"display":{"titleBarBackgroundColor":"#f2f2f2","titleBarTextColor":"#414141","menu":false,"fullScreen":true,"titleBar":false}};
  }
})();
//# sourceMappingURL=app.js.map