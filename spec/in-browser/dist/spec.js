/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./spec/in-browser/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./spec/in-browser/index.js":
/*!**********************************!*\
  !*** ./spec/in-browser/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


// Our webpack.unit.tests.config.js file uses this to require all unit test files
// so they can be tested in a browser for debugging

// require all test files
var testsContext = __webpack_require__("./spec/unit sync recursive .spec$");
testsContext.keys().forEach(testsContext);


/***/ }),

/***/ "./spec/unit sync recursive .spec$":
/*!*******************************!*\
  !*** ./spec/unit sync .spec$ ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./event-listener.decorator.spec": "./spec/unit/event-listener.decorator.spec.ts",
	"./event-manager.spec": "./spec/unit/event-manager.spec.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./spec/unit sync recursive .spec$";

/***/ }),

/***/ "./spec/unit/event-listener.decorator.spec.ts":
/*!****************************************************!*\
  !*** ./spec/unit/event-listener.decorator.spec.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(/*! ../../src */ "./src/index.ts");
describe('Event Listener Decorator', function () {
    it('should bind and unbind to events', function () {
        var Hub = (function (_super) {
            __extends(Hub, _super);
            function Hub() {
                var _this = _super.call(this) || this;
                _this.cnt = 0;
                _this.init();
                return _this;
            }
            Hub.prototype.init = function () { };
            Hub.prototype.destroy = function () { };
            Hub.prototype.cntListener = function () {
                this.cnt++;
            };
            __decorate([
                src_1.EventListener({
                    eventName: 'cnt-up',
                    initFn: 'init',
                    destroyFn: 'destroy'
                }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Hub.prototype, "cntListener", null);
            return Hub;
        }(src_1.EventManager));
        var hub = new Hub();
        hub.emit('cnt-up');
        expect(hub.cnt).toEqual(1);
        hub.destroy();
        hub.emit('cnt-up');
        expect(hub.cnt).toEqual(1);
    });
    it('should use default angular init and destroy functions', function () {
        var Hub = (function (_super) {
            __extends(Hub, _super);
            function Hub() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cnt = 0;
                return _this;
            }
            Hub.prototype.ngOnInit = function () { this.cnt++; };
            Hub.prototype.ngOnDestroy = function () { };
            Hub.prototype.cntListener = function () {
                this.cnt++;
            };
            __decorate([
                src_1.EventListener('cnt-up'),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Hub.prototype, "cntListener", null);
            return Hub;
        }(src_1.EventManager));
        var hub = new Hub();
        hub['ngOnInit']();
        hub.emit('cnt-up');
        expect(hub.cnt).toEqual(2);
        hub['ngOnDestroy']();
        hub.emit('cnt-up');
        expect(hub.cnt).toEqual(2);
    });
    it('should use property class', function () {
        var EventHub = (function (_super) {
            __extends(EventHub, _super);
            function EventHub() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EventHub;
        }(src_1.EventManager));
        var MyTest = (function () {
            function MyTest(eventHub) {
                this.eventHub = eventHub;
                this.cnt = 0;
                this.init();
            }
            MyTest.prototype.init = function () { };
            MyTest.prototype.destroy = function () { };
            MyTest.prototype.cntListener = function () {
                this.cnt++;
            };
            MyTest.prototype.count = function () {
                this.eventHub.emit('cnt-up');
            };
            __decorate([
                src_1.EventListener({
                    eventName: 'cnt-up',
                    eventClass: EventHub.name,
                    initFn: 'init',
                    destroyFn: 'destroy'
                }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], MyTest.prototype, "cntListener", null);
            return MyTest;
        }());
        var eventHub = new EventHub();
        var myTest = new MyTest(eventHub);
        expect(myTest.cnt).toEqual(0);
        myTest.count();
        expect(myTest.cnt).toEqual(1);
        myTest.destroy();
        myTest.count();
        expect(myTest.cnt).toEqual(1);
    });
    it('should throw error as class name cant be found', function () {
        var err = null;
        try {
            var EventHub = (function (_super) {
                __extends(EventHub, _super);
                function EventHub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return EventHub;
            }(src_1.EventManager));
            var MyTest = (function () {
                function MyTest(eventHub) {
                    this.eventHub = eventHub;
                    this.cnt = 0;
                    this.init();
                }
                MyTest.prototype.init = function () { };
                MyTest.prototype.destroy = function () { };
                MyTest.prototype.cntListener = function () {
                    this.cnt++;
                };
                MyTest.prototype.count = function () {
                    this.eventHub.emit('cnt-up');
                };
                __decorate([
                    src_1.EventListener({
                        eventName: 'cnt-up',
                        eventClass: 'fake-name',
                        initFn: 'init',
                        destroyFn: 'destroy'
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], MyTest.prototype, "cntListener", null);
                return MyTest;
            }());
            var eventHub = new EventHub();
            var myTest = new MyTest(eventHub);
        }
        catch (e) {
            err = e;
        }
        expect(err.message).toContain('@EventListener: Unable to find class with '
            + 'name fake-name');
    });
    it('should throw error as event class does not extend EventManager', function () {
        var err = null;
        try {
            var Hub = (function () {
                function Hub() {
                    this.cnt = 0;
                    this.init();
                }
                Hub.prototype.init = function () { };
                Hub.prototype.destroy = function () { };
                Hub.prototype.cntListener = function () {
                    this.cnt++;
                };
                __decorate([
                    src_1.EventListener({
                        eventName: 'cnt-up',
                        initFn: 'init',
                        destroyFn: 'destroy'
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Hub.prototype, "cntListener", null);
                return Hub;
            }());
            var hub = new Hub();
        }
        catch (e) {
            err = e;
        }
        expect(err.message)
            .toContain('@EventListener: Class Hub must extend EventManager');
    });
    it('should throw error as decorator is not on a method', function () {
        var err = null;
        try {
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    var _this = _super.call(this) || this;
                    _this.cnt = 0;
                    _this.cntListener = true;
                    _this.init();
                    return _this;
                }
                Hub.prototype.init = function () { };
                Hub.prototype.destroy = function () { };
                __decorate([
                    src_1.EventListener({
                        eventName: 'cnt-up',
                        initFn: 'init',
                        destroyFn: 'destroy'
                    }),
                    __metadata("design:type", Object)
                ], Hub.prototype, "cntListener", void 0);
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
        }
        catch (e) {
            err = e;
        }
        expect(err.message)
            .toContain('@EventListener: Decorator must be applied to a method');
    });
    it('should throw error as args are not set', function () {
        var err = null;
        try {
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    var _this = _super.call(this) || this;
                    _this.cnt = 0;
                    _this.init();
                    return _this;
                }
                Hub.prototype.init = function () { };
                Hub.prototype.destroy = function () { };
                Hub.prototype.cntListener = function () {
                    this.cnt++;
                };
                __decorate([
                    src_1.EventListener(null),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Hub.prototype, "cntListener", null);
                return Hub;
            }(src_1.EventManager));
        }
        catch (e) {
            err = e;
        }
        expect(err.message).toContain('@EventListener: First argument must be of '
            + 'type string or IEventListenerArgs');
    });
});


/***/ }),

/***/ "./spec/unit/event-manager.spec.ts":
/*!*****************************************!*\
  !*** ./spec/unit/event-manager.spec.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(/*! ../../src */ "./src/index.ts");
describe('Event Manager', function () {
    describe('emit()', function () {
        it('should emit event', function (done) {
            var cnt = 0;
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
            hub.on('event-a', function (data, next) {
                cnt++;
                expect(cnt).toEqual(1);
                expect(data.a).toEqual('a');
                done();
            });
            hub.emit('event-a', { a: 'a' });
        });
        it('should emit event and fire completed', function (done) {
            var cnt = 0;
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
            hub.on('event-a', function (data, next) {
                setTimeout(function () {
                    cnt++;
                    next();
                }, 5);
            });
            hub.on('event-a', function (data, next) {
                setTimeout(function () {
                    cnt++;
                    next().completed(function () {
                        expect(cnt).toEqual(2);
                        done();
                    });
                }, 10);
            });
            hub.emit('event-a');
        });
    });
    describe('on()', function () {
        it('should set scope', function () {
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    var _this = _super.call(this) || this;
                    _this.cnt = 0;
                    _this.on('event-a', _this.eventAListener, _this);
                    return _this;
                }
                Hub.prototype.eventAListener = function () {
                    this.cnt++;
                };
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
            hub.emit('event-a');
            expect(hub.cnt).toEqual(1);
            hub.emit('event-a');
            expect(hub.cnt).toEqual(2);
        });
        it('should throw error as no event name is passed', function () {
            var err = null;
            try {
                var Hub = (function (_super) {
                    __extends(Hub, _super);
                    function Hub() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Hub;
                }(src_1.EventManager));
                var hub = new Hub();
                hub.on(null, function () { });
            }
            catch (e) {
                err = e;
            }
            expect(err.message).toContain('No eventName passed');
        });
        it('should throw error as no callback function is passed', function () {
            var err = null;
            try {
                var Hub = (function (_super) {
                    __extends(Hub, _super);
                    function Hub() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Hub;
                }(src_1.EventManager));
                var hub = new Hub();
                hub.on('event-a', undefined);
            }
            catch (e) {
                err = e;
            }
            expect(err.message).toContain('No callback function');
        });
    });
    describe('once()', function () {
        it('should set scope and fire event only once', function () {
            var scope = { a: 1 };
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
            hub.once('event-a', function () {
                this.a++;
            }, scope);
            hub.emit('event-a');
            expect(scope.a).toEqual(2);
            hub.emit('event-a');
            expect(scope.a).toEqual(2);
        });
        it('should throw error as no event name is passed', function () {
            var err = null;
            try {
                var Hub = (function (_super) {
                    __extends(Hub, _super);
                    function Hub() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Hub;
                }(src_1.EventManager));
                var hub = new Hub();
                hub.once(null, function () { });
            }
            catch (e) {
                err = e;
            }
            expect(err.message).toContain('No eventName passed');
        });
        it('should throw error as no callback function is passed', function () {
            var err = null;
            try {
                var Hub = (function (_super) {
                    __extends(Hub, _super);
                    function Hub() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Hub;
                }(src_1.EventManager));
                var hub = new Hub();
                hub.once('event-a', undefined);
            }
            catch (e) {
                err = e;
            }
            expect(err.message).toContain('No callback function');
        });
    });
    describe('off()', function () {
        it('should stop listening to an event', function () {
            var cnt = 0;
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
            var listener = function (data, next) {
                cnt++;
                expect(data.a).toEqual('a');
            };
            hub.on('event-a', listener);
            hub.emit('event-a', { a: 'a' });
            expect(cnt).toEqual(1);
            hub.off('event-a', listener);
            hub.emit('event-a', { a: 'a' });
            expect(cnt).toEqual(1);
        });
    });
    describe('offAll()', function () {
        it('should stop listening to all event', function () {
            var cnt = 0;
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
            var listenerA1 = function () { cnt++; };
            var listenerA2 = function () { cnt++; };
            var listenerB = function () { cnt++; };
            var listenerC = function () { cnt++; };
            hub.on('event-a', listenerA1);
            hub.on('event-a', listenerA2);
            hub.on('event-b', listenerB);
            hub.on('event-c', listenerC);
            hub.emit('event-a');
            expect(cnt).toEqual(2);
            hub.emit('event-b');
            expect(cnt).toEqual(3);
            hub.emit('event-c');
            expect(cnt).toEqual(4);
            hub.offAll('event-a');
            hub.emit('event-a');
            expect(cnt).toEqual(4);
            hub.emit('event-b');
            expect(cnt).toEqual(5);
            hub.offAll();
            hub.emit('event-b');
            expect(cnt).toEqual(5);
            hub.emit('event-c');
            expect(cnt).toEqual(5);
        });
    });
});


/***/ }),

/***/ "./src/event-listener.decorator.ts":
/*!*****************************************!*\
  !*** ./src/event-listener.decorator.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getClassPropertyName(args, instance) {
    if (!args.eventClass)
        return null;
    var classKeys = Object.keys(instance);
    for (var _i = 0, classKeys_1 = classKeys; _i < classKeys_1.length; _i++) {
        var key = classKeys_1[_i];
        if (instance[key].constructor.name === args.eventClass)
            return key;
    }
    throw new Error('@EventListener: Unable to find class with name '
        + args.eventClass);
}
function getEventClass(args, classInstance) {
    var propertyName = getClassPropertyName(args, classInstance);
    var instance = (propertyName) ? classInstance[propertyName] : classInstance;
    if (!instance.on) {
        throw new Error('@EventListener: Class ' + instance.constructor.name
            + ' must extend EventManager');
    }
    return instance;
}
function EventListener(arg1, arg2) {
    return function (target, propertyKey, descriptor) {
        if (!descriptor || typeof descriptor.value !== 'function') {
            throw new Error('@EventListener: Decorator must be applied to a method');
        }
        if (!arg1
            || (typeof arg1 !== 'string' && arg1.constructor !== {}.constructor)) {
            throw new Error('@EventListener: First argument must be of type string '
                + 'or IEventListenerArgs');
        }
        var params = (typeof arg1 === 'string')
            ? { eventName: arg1, eventClass: arg2 } : arg1;
        var initFnName = (params.initFn || 'ngOnInit');
        var destroyFnName = (params.destroyFn || 'ngOnDestroy');
        var eventClassInstance = null;
        var initFnOrignal = (target[initFnName] || function () { });
        target.constructor.prototype[initFnName] = function () {
            initFnOrignal.apply(this, arguments);
            eventClassInstance = getEventClass(params, this);
            eventClassInstance.on(params.eventName, descriptor.value, this);
        };
        var destroyFnOriginal = (target[destroyFnName] || function () { });
        target.constructor.prototype[destroyFnName] = function () {
            destroyFnOriginal.apply(this, arguments);
            eventClassInstance.off(params.eventName, descriptor.value);
        };
    };
}
exports.EventListener = EventListener;
;


/***/ }),

/***/ "./src/event-manager.ts":
/*!******************************!*\
  !*** ./src/event-manager.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventManager = (function () {
    function EventManager() {
    }
    Object.defineProperty(EventManager.prototype, "events", {
        get: function () {
            return (this._events || (this._events = {}));
        },
        set: function (val) {
            this._events = val;
        },
        enumerable: true,
        configurable: true
    });
    EventManager.prototype.emit = function (eventName, data) {
        var _this = this;
        if (!this.events[eventName])
            return;
        var completedEvents = 0;
        var completedCallbacks = [];
        for (var _i = 0, _a = this.events[eventName]; _i < _a.length; _i++) {
            var eventFunction = _a[_i];
            eventFunction.fn.call(eventFunction.scope, data, function () {
                setTimeout(function () {
                    if (++completedEvents === _this.events[eventName].length) {
                        completedCallbacks.forEach(function (cb) { cb(); });
                    }
                }, 0);
                return {
                    completed: function (cb) { if (cb)
                        completedCallbacks.push(cb); }
                };
            });
            if (eventFunction.once)
                this.off(eventName, eventFunction.fn);
        }
    };
    EventManager.prototype.on = function (eventName, fn, scope) {
        this.addFn(eventName, fn, scope);
    };
    EventManager.prototype.once = function (eventName, fn, scope) {
        this.addFn(eventName, fn, scope, true);
    };
    EventManager.prototype.addFn = function (eventName, fn, scope, once) {
        if (once === void 0) { once = false; }
        var fnName = (once) ? 'once' : 'on';
        if (!eventName)
            throw new Error("No eventName passed to " + fnName + "()");
        if (!fn)
            throw new Error("No callback function passed to " + fnName + "()");
        (this.events[eventName] || (this.events[eventName] = [])).push({
            fn: fn,
            scope: scope,
            once: once
        });
    };
    EventManager.prototype.off = function (eventName, fn) {
        if (!fn || !this.events[eventName])
            return;
        for (var i = 0; i < this.events[eventName].length; i++) {
            if (this.events[eventName][i].fn === fn) {
                this.events[eventName].splice(i, 1);
                break;
            }
        }
    };
    EventManager.prototype.offAll = function (eventName) {
        if (eventName)
            return delete this.events[eventName];
        this.events = {};
    };
    return EventManager;
}());
exports.EventManager = EventManager;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./event-manager */ "./src/event-manager.ts"));
__export(__webpack_require__(/*! ./event-listener.decorator */ "./src/event-listener.decorator.ts"));


/***/ })

/******/ });
//# sourceMappingURL=spec.js.map