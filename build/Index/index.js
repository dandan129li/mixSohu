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

	var $app_template$ = __webpack_require__(2)
	var $app_style$ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!../../node_modules/mix-tools/lib/json-loader.js!../../node_modules/mix-tools/lib/style-loader.js?index=0&type=styles!./index.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var $app_script$ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!../../node_modules/mix-tools/lib/script-loader.js!babel-loader?presets[]=/Users/ldd/WorkSpace/mixSohu/node_modules/babel-preset-env&presets=/Users/ldd/WorkSpace/mixSohu/node_modules/babel-preset-env&plugins[]=/Users/ldd/WorkSpace/mixSohu/node_modules/mix-tools/lib/jsx-loader.js&plugins=/Users/ldd/WorkSpace/mixSohu/node_modules/mix-tools/lib/jsx-loader.js&comments=false!./index.js?isEntry=true\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
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
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "attr": {},
	  "classList": [
	    "page"
	  ],
	  "children": [
	    {
	      "type": "tabs",
	      "attr": {
	        "id": "tabList",
	        "index": "0"
	      },
	      "classList": [
	        "scroll-view_H"
	      ],
	      "id": "tabList",
	      "events": {
	        "change": "changeTabactive"
	      },
	      "children": [
	        {
	          "type": "image",
	          "attr": {
	            "src": "../Common/logo.png"
	          },
	          "classList": [
	            "nav-logo"
	          ]
	        },
	        {
	          "type": "tab-bar",
	          "attr": {
	            "mode": "scrollable"
	          },
	          "children": [
	            {
	              "type": "text",
	              "attr": {
	                "id": function () {return this.$item.channel_id}
	              },
	              "id": function () {return this.$item.channel_id},
	              "repeat": function () {return this.channelList},
	              "classList": [
	                "scroll-view-item_H",
	                "tab-text"
	              ],
	              "children": [
	                {
	                  "type": "span",
	                  "attr": {
	                    "value": function () {return this.$item.name}
	                  }
	                }
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
	              "repeat": function () {return this.playList},
	              "children": [
	                {
	                  "type": "div",
	                  "attr": {},
	                  "classList": [
	                    "item-content-circular"
	                  ],
	                  "shown": function () {return this.$item.length<1},
	                  "children": [
	                    {
	                      "type": "progress",
	                      "attr": {
	                        "type": "circular"
	                      },
	                      "classList": [
	                        "circular-1"
	                      ]
	                    },
	                    {
	                      "type": "text",
	                      "attr": {
	                        "value": "正在努力加载中······"
	                      },
	                      "classList": [
	                        "item-title"
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "refresh",
	                  "attr": {
	                    "refreshing": function () {return this.isRefreshing}
	                  },
	                  "classList": [
	                    "refresh"
	                  ],
	                  "events": {
	                    "refresh": "refresh"
	                  },
	                  "children": [
	                    {
	                      "type": "list",
	                      "attr": {
	                        "scrollpage": function () {return this.scrollPage}
	                      },
	                      "classList": [
	                        "section"
	                      ],
	                      "events": {
	                        "scrollbottom": "onReachBottom"
	                      },
	                      "shown": function () {return this.$item.channel_id==this.currentChannelId&&this.playList.length>0},
	                      "children": [
	                        {
	                          "type": "list-item",
	                          "attr": {
	                            "type": "listItem",
	                            "id": function () {return this.$item.vid}
	                          },
	                          "id": function () {return this.$item.vid},
	                          "repeat": function () {return this.playList},
	                          "classList": [
	                            "play-list"
	                          ],
	                          "children": [
	                            {
	                              "type": "stack",
	                              "attr": {},
	                              "children": [
	                                {
	                                  "type": "block",
	                                  "attr": {},
	                                  "shown": function () {return this.$idx!==this.currPlayIndex},
	                                  "children": [
	                                    {
	                                      "type": "div",
	                                      "attr": {
	                                        "id": function () {return this.$item.vid}
	                                      },
	                                      "classList": [
	                                        "player-container"
	                                      ],
	                                      "id": function () {return this.$item.vid},
	                                      "children": [
	                                        {
	                                          "type": "div",
	                                          "attr": {},
	                                          "classList": [
	                                            "v-cover-container"
	                                          ],
	                                          "events": {
	                                            "click": function (evt) {this.play({vid:this.$item.vid,site:this.$item.site,index:this.$idx},evt)}
	                                          },
	                                          "children": [
	                                            {
	                                              "type": "list",
	                                              "attr": {
	                                                "scrollpage": function () {return this.scrollPage}
	                                              },
	                                              "classList": [
	                                                "section"
	                                              ],
	                                              "events": {
	                                                "scrollbottom": "onReachBottom"
	                                              },
	                                              "shown": function () {return this.$idx==this.currentIndex},
	                                              "children": [
	                                                {
	                                                  "type": "list-item",
	                                                  "attr": {
	                                                    "type": "listItem",
	                                                    "id": function () {return this.$item.vid}
	                                                  },
	                                                  "id": function () {return this.$item.vid},
	                                                  "repeat": function () {return this.$item},
	                                                  "classList": [
	                                                    "play-list"
	                                                  ],
	                                                  "children": [
	                                                    {
	                                                      "type": "stack",
	                                                      "attr": {},
	                                                      "children": [
	                                                        {
	                                                          "type": "block",
	                                                          "attr": {},
	                                                          "shown": function () {return this.$idx!==this.currPlayIndex},
	                                                          "children": [
	                                                            {
	                                                              "type": "div",
	                                                              "attr": {
	                                                                "id": function () {return this.$item.vid}
	                                                              },
	                                                              "classList": [
	                                                                "player-container"
	                                                              ],
	                                                              "id": function () {return this.$item.vid},
	                                                              "children": [
	                                                                {
	                                                                  "type": "div",
	                                                                  "attr": {},
	                                                                  "classList": [
	                                                                    "v-cover-container"
	                                                                  ],
	                                                                  "events": {
	                                                                    "click": function (evt) {this.play({vid:this.$item.vid,site:this.$item.site,index:this.$idx},evt)}
	                                                                  },
	                                                                  "children": [
	                                                                    {
	                                                                      "type": "stack",
	                                                                      "attr": {},
	                                                                      "children": [
	                                                                        {
	                                                                          "type": "image",
	                                                                          "attr": {
	                                                                            "src": function () {return this.$item.cover}
	                                                                          },
	                                                                          "classList": [
	                                                                            "v-cover"
	                                                                          ],
	                                                                          "style": {
	                                                                            "resizeMode": "contain"
	                                                                          }
	                                                                        },
	                                                                        {
	                                                                          "type": "div",
	                                                                          "attr": {},
	                                                                          "classList": [
	                                                                            "v-mask"
	                                                                          ]
	                                                                        },
	                                                                        {
	                                                                          "type": "div",
	                                                                          "attr": {},
	                                                                          "classList": [
	                                                                            "v-title"
	                                                                          ],
	                                                                          "children": [
	                                                                            {
	                                                                              "type": "text",
	                                                                              "attr": {
	                                                                                "value": function () {return (this.$item.video_name) + ((this.$idx==0&&this.$item.length<12)?this.$item.length:'')}
	                                                                              }
	                                                                            }
	                                                                          ]
	                                                                        },
	                                                                        {
	                                                                          "type": "div",
	                                                                          "attr": {},
	                                                                          "classList": [
	                                                                            "v-play-btn"
	                                                                          ],
	                                                                          "children": [
	                                                                            {
	                                                                              "type": "image",
	                                                                              "attr": {
	                                                                                "src": "../Common/images/play-ico.png"
	                                                                              },
	                                                                              "classList": [
	                                                                                "v-btn"
	                                                                              ]
	                                                                            }
	                                                                          ]
	                                                                        },
	                                                                        {
	                                                                          "type": "div",
	                                                                          "attr": {},
	                                                                          "classList": [
	                                                                            "v-info"
	                                                                          ],
	                                                                          "children": [
	                                                                            {
	                                                                              "type": "text",
	                                                                              "attr": {
	                                                                                "value": function () {return (this.$item.play_count_short) + '播放 | ' + (this.$item.time_length_format)}
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
	                                                        },
	                                                        {
	                                                          "type": "div",
	                                                          "attr": {},
	                                                          "classList": [
	                                                            "player"
	                                                          ],
	                                                          "style": {
	                                                            "height": "422px"
	                                                          },
	                                                          "children": [
	                                                            {
	                                                              "type": "video",
	                                                              "attr": {
	                                                                "id": function () {return 'player_' + (this.$idx) + '_' + (this.currentChannelId)},
	                                                                "src": function () {return this.currPlayUrl},
	                                                                "autoplay": function () {return this.isWIFI},
	                                                                "poster": "https://photocdn.tv.sohu.com/img/20180302/pic_compress_2d4e7934-f71a-411c-a404-0a1d326f42e5_q_mini.png"
	                                                              },
	                                                              "id": function () {return 'player_' + (this.$idx) + '_' + (this.currentChannelId)},
	                                                              "shown": function () {return this.$idx===this.currPlayIndex&&this.currPlayUrl!==''},
	                                                              "events": {
	                                                                "finish": "playNext"
	                                                              }
	                                                            }
	                                                          ]
	                                                        }
	                                                      ]
	                                                    },
	                                                    {
	                                                      "type": "div",
	                                                      "attr": {},
	                                                      "classList": [
	                                                        "v-opt-container",
	                                                        "cf"
	                                                      ],
	                                                      "children": [
	                                                        {
	                                                          "type": "div",
	                                                          "attr": {},
	                                                          "classList": [
	                                                            "v-user"
	                                                          ],
	                                                          "children": [
	                                                            {
	                                                              "type": "image",
	                                                              "attr": {
	                                                                "src": function () {return this.$item.header}
	                                                              },
	                                                              "classList": [
	                                                                "v-user-avatar"
	                                                              ]
	                                                            },
	                                                            {
	                                                              "type": "text",
	                                                              "attr": {
	                                                                "value": function () {return this.$item.userName}
	                                                              },
	                                                              "shown": function () {return this.$item.header!=undefined},
	                                                              "classList": [
	                                                                "v-user-name"
	                                                              ]
	                                                            }
	                                                          ]
	                                                        },
	                                                        {
	                                                          "type": "div",
	                                                          "attr": {},
	                                                          "classList": [
	                                                            "like-wrap"
	                                                          ]
	                                                        },
	                                                        {
	                                                          "type": "div",
	                                                          "attr": {},
	                                                          "classList": [
	                                                            "link-to-playpage"
	                                                          ],
	                                                          "events": {
	                                                            "click": function (evt) {this.routePush('Play',{vid:this.$item.vid,site:this.$item.site,aid:this.$item.aid,user_id:this.$item.user_id},evt)}
	                                                          }
	                                                        },
	                                                        {
	                                                          "type": "div",
	                                                          "attr": {},
	                                                          "classList": [
	                                                            "share_area"
	                                                          ],
	                                                          "events": {
	                                                            "click": function (evt) {this.shareText({title:this.$item.video_name,cover:this.$item.cover,playUrl:this.$item.play_url},evt)}
	                                                          },
	                                                          "children": [
	                                                            {
	                                                              "type": "image",
	                                                              "attr": {
	                                                                "src": "../Common/images/share-ico.png"
	                                                              }
	                                                            }
	                                                          ]
	                                                        }
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
	                                                  "shown": function () {return this.loadingMore},
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
	                                            },
	                                            {
	                                              "type": "div",
	                                              "attr": {},
	                                              "classList": [
	                                                "v-opt-container",
	                                                "cf"
	                                              ],
	                                              "children": [
	                                                {
	                                                  "type": "div",
	                                                  "attr": {},
	                                                  "classList": [
	                                                    "v-user"
	                                                  ],
	                                                  "children": [
	                                                    {
	                                                      "type": "image",
	                                                      "attr": {
	                                                        "src": function () {return this.$item.header}
	                                                      },
	                                                      "classList": [
	                                                        "v-user-avatar"
	                                                      ]
	                                                    },
	                                                    {
	                                                      "type": "text",
	                                                      "attr": {
	                                                        "value": function () {return this.$item.userName}
	                                                      },
	                                                      "shown": function () {return this.$item.header!=undefined},
	                                                      "classList": [
	                                                        "v-user-name"
	                                                      ]
	                                                    }
	                                                  ]
	                                                },
	                                                {
	                                                  "type": "div",
	                                                  "attr": {},
	                                                  "classList": [
	                                                    "like-wrap"
	                                                  ],
	                                                  "shown": function () {return this.likeList[this.$item.vid]!=undefined},
	                                                  "events": {
	                                                    "click": function (evt) {this.like({vid:this.$item.vid,likenum:this.likeList[this.$item.vid]},evt)}
	                                                  },
	                                                  "children": [
	                                                    {
	                                                      "type": "image",
	                                                      "attr": {
	                                                        "src": "../Common/images/like-ico.png"
	                                                      }
	                                                    },
	                                                    {
	                                                      "type": "text",
	                                                      "attr": {
	                                                        "value": function () {return this.likeList[this.$item.vid.likeNum]}
	                                                      },
	                                                      "classList": [
	                                                        "like-num"
	                                                      ],
	                                                      "shown": function () {return this.likeList[this.$item.vid]!=undefined}
	                                                    }
	                                                  ]
	                                                },
	                                                {
	                                                  "type": "div",
	                                                  "attr": {},
	                                                  "classList": [
	                                                    "link-to-playpage"
	                                                  ],
	                                                  "events": {
	                                                    "click": function (evt) {this.routePush('Play',{vid:this.$item.vid,site:this.$item.site,aid:this.$item.aid,user_id:this.$item.user_id},evt)}
	                                                  }
	                                                },
	                                                {
	                                                  "type": "div",
	                                                  "attr": {},
	                                                  "classList": [
	                                                    "share_area"
	                                                  ],
	                                                  "events": {
	                                                    "click": function (evt) {this.shareText({title:this.$item.video_name,cover:this.$item.cover,playUrl:this.$item.play_url},evt)}
	                                                  },
	                                                  "children": [
	                                                    {
	                                                      "type": "image",
	                                                      "attr": {
	                                                        "src": "../Common/images/share-ico.png"
	                                                      }
	                                                    }
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
	                                              "shown": function () {return this.loadingMore},
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