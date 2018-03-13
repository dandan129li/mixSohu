(function(){
      
  var createPageHandler = function() {
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var $app_template$ = __webpack_require__(8)
	var $app_style$ = __webpack_require__(9)
	var $app_script$ = __webpack_require__(10)
	
	$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$){
	     $app_script$($app_module$, $app_exports$, $app_require$)
	     if ($app_exports$.__esModule && $app_exports$.default) {
	            $app_module$.exports = $app_exports$.default
	        }
	     $app_module$.exports.template = $app_template$
	     $app_module$.exports.style = $app_style$
	})
	
	$app_bootstrap$('@app-component/index',{ packagerVersion: '0.0.5'})


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "attr": {},
	  "classList": [
	    "container"
	  ],
	  "children": [
	    {
	      "type": "div",
	      "attr": {},
	      "classList": [
	        "page-title-wrap"
	      ],
	      "children": [
	        {
	          "type": "text",
	          "attr": {
	            "value": function () {return this.componentName}
	          },
	          "classList": [
	            "page-title"
	          ]
	        }
	      ]
	    },
	    {
	      "type": "tabs",
	      "attr": {
	        "index": "0"
	      },
	      "classList": [
	        "tabs"
	      ],
	      "events": {
	        "change": "changeTabactive"
	      },
	      "children": [
	        {
	          "type": "tab-bar",
	          "attr": {},
	          "classList": [
	            "tab-bar"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "attr": {
	                "value": "基础组件"
	              },
	              "classList": [
	                "tab-text"
	              ]
	            },
	            {
	              "type": "text",
	              "attr": {
	                "value": "表单组件"
	              },
	              "classList": [
	                "tab-text"
	              ]
	            },
	            {
	              "type": "text",
	              "attr": {
	                "value": "列表组件"
	              },
	              "classList": [
	                "tab-text"
	              ]
	            }
	          ]
	        },
	        {
	          "type": "tab-content",
	          "attr": {},
	          "classList": [
	            "tab-content"
	          ],
	          "children": [
	            {
	              "type": "div",
	              "attr": {},
	              "classList": [
	                "item-container"
	              ],
	              "children": [
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "a"
	                      },
	                      "classList": [
	                        "item-title",
	                        "item-title-first"
	                      ]
	                    },
	                    {
	                      "type": "a",
	                      "attr": {
	                        "href": "Index",
	                        "value": "OPPO官网"
	                      },
	                      "style": {
	                        "color": "#09ba07"
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "image"
	                      },
	                      "classList": [
	                        "item-title"
	                      ]
	                    },
	                    {
	                      "type": "image",
	                      "attr": {
	                        "src": "/Common/img/oppo.png"
	                      },
	                      "classList": [
	                        "image"
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "progerss type=\"horizontal\""
	                      },
	                      "classList": [
	                        "item-title"
	                      ]
	                    },
	                    {
	                      "type": "progress",
	                      "attr": {
	                        "color": "#0faeff",
	                        "percent": "20",
	                        "strokeWidth": "10"
	                      },
	                      "style": {
	                        "marginTop": "20px"
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "progerss type=\"circular\""
	                      },
	                      "classList": [
	                        "item-title"
	                      ]
	                    },
	                    {
	                      "type": "progress",
	                      "attr": {
	                        "color": "#A020F0",
	                        "type": "circular"
	                      },
	                      "classList": [
	                        "circular"
	                      ],
	                      "style": {
	                        "marginTop": "20px"
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "text"
	                      },
	                      "classList": [
	                        "item-title"
	                      ]
	                    },
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "I am text"
	                      },
	                      "style": {
	                        "color": "#f76160"
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "span"
	                      },
	                      "classList": [
	                        "item-title"
	                      ]
	                    },
	                    {
	                      "type": "text",
	                      "attr": {},
	                      "children": [
	                        {
	                          "type": "span",
	                          "attr": {
	                            "value": "I am span"
	                          },
	                          "style": {
	                            "color": "#09ba07"
	                          }
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "attr": {},
	              "classList": [
	                "item-container"
	              ],
	              "children": [
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "input"
	                      },
	                      "classList": [
	                        "item-title",
	                        "item-title-first"
	                      ]
	                    },
	                    {
	                      "type": "input",
	                      "attr": {
	                        "type": "text",
	                        "placeholder": "I am input"
	                      },
	                      "classList": [
	                        "item-input"
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "picker"
	                      },
	                      "classList": [
	                        "item-title"
	                      ]
	                    },
	                    {
	                      "type": "picker",
	                      "attr": {
	                        "type": "time",
	                        "value": function () {return this.time}
	                      },
	                      "classList": [
	                        "item-picker"
	                      ],
	                      "events": {
	                        "change": "setTime"
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "slider"
	                      },
	                      "classList": [
	                        "item-title"
	                      ]
	                    },
	                    {
	                      "type": "slider",
	                      "attr": {
	                        "selectedColor": "#0faeff",
	                        "min": "50",
	                        "max": "200",
	                        "value": "100",
	                        "enable": "true"
	                      },
	                      "classList": [
	                        "item-slider"
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "attr": {},
	              "classList": [
	                "item-container"
	              ],
	              "children": [
	                {
	                  "type": "input",
	                  "attr": {
	                    "type": "button",
	                    "name": "",
	                    "value": "切换滚动模式"
	                  },
	                  "classList": [
	                    "btn"
	                  ],
	                  "events": {
	                    "click": "switchScrollMode"
	                  }
	                },
	                {
	                  "type": "input",
	                  "attr": {
	                    "type": "button",
	                    "name": "",
	                    "value": "回到第一个item"
	                  },
	                  "classList": [
	                    "btn"
	                  ],
	                  "events": {
	                    "click": "goIndex"
	                  }
	                },
	                {
	                  "type": "list",
	                  "attr": {
	                    "id": "list",
	                    "scrollpage": function () {return this.scrollPage}
	                  },
	                  "classList": [
	                    "list"
	                  ],
	                  "events": {
	                    "scrollbottom": "scrollbottom"
	                  },
	                  "id": "list",
	                  "children": [
	                    {
	                      "type": "list-item",
	                      "attr": {
	                        "type": "listItem"
	                      },
	                      "classList": [
	                        "item",
	                        "item_color"
	                      ],
	                      "repeat": function () {return this.list_data},
	                      "children": [
	                        {
	                          "type": "text",
	                          "attr": {
	                            "value": function () {return (this.$item.name) + '--' + (this.$idx)}
	                          },
	                          "classList": [
	                            "txt"
	                          ]
	                        }
	                      ]
	                    },
	                    {
	                      "type": "list-item",
	                      "attr": {
	                        "type": "loadMore"
	                      },
	                      "classList": [
	                        "load-more"
	                      ],
	                      "shown": function () {return this.loadMore},
	                      "children": [
	                        {
	                          "type": "progress",
	                          "attr": {
	                            "type": "circular"
	                          }
	                        },
	                        {
	                          "type": "text",
	                          "attr": {
	                            "value": "加载更多"
	                          }
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
	  ".tabs": {
	    "flex": 1,
	    "marginTop": "20px",
	    "marginRight": "30px",
	    "marginLeft": "30px",
	    "backgroundColor": "#ffffff"
	  },
	  ".tab-content": {
	    "flex": 1
	  },
	  ".tab-bar": {
	    "height": "100px",
	    "borderTopColor": "#bbbbbb",
	    "borderRightColor": "#bbbbbb",
	    "borderBottomColor": "#bbbbbb",
	    "borderLeftColor": "#bbbbbb",
	    "color": "#bbbbbb",
	    "borderBottomWidth": "1px"
	  },
	  ".tab-text": {
	    "textAlign": "center",
	    "color:active": "#f76160"
	  },
	  ".item-container": {
	    "paddingTop": "30px",
	    "paddingLeft": "30px",
	    "paddingRight": "30px",
	    "flexDirection": "column"
	  },
	  ".item-content": {
	    "flexDirection": "column",
	    "paddingBottom": "30px"
	  },
	  ".item-title": {
	    "paddingTop": "50px",
	    "paddingBottom": "20px",
	    "color": "#aaaaaa"
	  },
	  ".item-title-first": {
	    "paddingTop": "0px"
	  },
	  ".item-input": {
	    "height": "80px",
	    "marginRight": "60px",
	    "marginLeft": "60px",
	    "paddingTop": "20px",
	    "paddingRight": "20px",
	    "paddingBottom": "20px",
	    "paddingLeft": "20px",
	    "borderTopWidth": "1px",
	    "borderRightWidth": "1px",
	    "borderBottomWidth": "1px",
	    "borderLeftWidth": "1px",
	    "borderTopColor": "#bbbbbb",
	    "borderRightColor": "#bbbbbb",
	    "borderBottomColor": "#bbbbbb",
	    "borderLeftColor": "#bbbbbb",
	    "borderRadius": "5px",
	    "fontSize": "30px"
	  },
	  ".item-picker": {
	    "marginRight": "60px",
	    "marginLeft": "60px",
	    "paddingTop": "20px",
	    "paddingRight": "20px",
	    "paddingBottom": "20px",
	    "paddingLeft": "20px",
	    "borderTopWidth": "1px",
	    "borderRightWidth": "1px",
	    "borderBottomWidth": "1px",
	    "borderLeftWidth": "1px",
	    "borderTopColor": "#bbbbbb",
	    "borderRightColor": "#bbbbbb",
	    "borderBottomColor": "#bbbbbb",
	    "borderLeftColor": "#bbbbbb",
	    "borderRadius": "5px"
	  },
	  ".item-slider": {
	    "paddingTop": "20px",
	    "paddingRight": "20px",
	    "paddingBottom": "20px",
	    "paddingLeft": "20px"
	  },
	  ".circular": {
	    "width": "40px",
	    "height": "40px"
	  },
	  ".list": {
	    "flex": 1
	  },
	  ".load-more": {
	    "justifyContent": "center",
	    "alignItems": "center",
	    "height": "100px"
	  },
	  ".item": {
	    "height": "150px",
	    "alignItems": "center",
	    "justifyContent": "center",
	    "marginBottom": "15px"
	  },
	  ".item_color": {
	    "backgroundColor": "#f76160"
	  }
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(module, exports, $app_require$){'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: {
	    componentName: 'tabs',
	    time: '',
	    loadMore: true,
	    scrollPage: false,
	    list_data: [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }]
	  },
	  onInit: function onInit() {
	    this.$page.setTitleBar({ text: 'Tabs' });
	
	    this.time = new Date().getHours() + ":" + new Date().getMinutes();
	  },
	  changeTabactive: function changeTabactive(e) {
	    console.log('----------切换tab: ' + e.index);
	  },
	  setTime: function setTime(e) {
	    this.time = e.hour + ":" + e.minute;
	  },
	  scrollbottom: function scrollbottom() {
	    var that = this;
	
	    setTimeout(function () {
	      that.list_data = that.list_data.concat([{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }]);
	    }, 1000);
	  },
	  goIndex: function goIndex() {
	    this.$element('list').scrollTo({ index: 0, smooth: true });
	  },
	  switchScrollMode: function switchScrollMode() {
	    this.goIndex();
	    this.scrollPage = !this.scrollPage;
	  }
	};}

/***/ }
/******/ ]);
  };
  if (typeof window === "undefined") {
    return createPageHandler();
  }
  else {
    window.createPageHandler = createPageHandler
  }
})();
//# sourceMappingURL=index.js.map