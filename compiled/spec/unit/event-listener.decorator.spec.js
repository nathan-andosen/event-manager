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
var src_1 = require("../../src");
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
    it('should bind and unbind to events on the events property', function () {
        var Hub = (function () {
            function Hub() {
                this.events = new src_1.EventManager();
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
        hub.events.emit('cnt-up');
        expect(hub.cnt).toEqual(1);
        hub.destroy();
        hub.events.emit('cnt-up');
        expect(hub.cnt).toEqual(1);
    });
    it('should bind and unbind to events on random name property', function () {
        var EventFake = (function () {
            function EventFake() {
            }
            EventFake.prototype.on = function () { };
            return EventFake;
        }());
        ;
        var Hub = (function () {
            function Hub() {
                this.someProp = new EventFake();
                this.randomName = new src_1.EventManager();
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
        hub.randomName.emit('cnt-up');
        expect(hub.cnt).toEqual(1);
        hub.destroy();
        hub.randomName.emit('cnt-up');
        expect(hub.cnt).toEqual(1);
    });
    it('should throw error as the events property is not of type EventManager', function () {
        var err = null;
        try {
            var Hub = (function () {
                function Hub() {
                    this.events = {};
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
        expect(err.message).toContain('@EventListener: Class');
    });
    it('should throw error as ngOnDestroy does not exist', function () {
        var err = null;
        try {
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.cnt = 0;
                    return _this;
                }
                Hub.prototype.ngOnInit = function () { this.cnt++; };
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
        }
        catch (e) {
            err = e;
        }
        expect(err.message).toContain('must implement ngOnDestroy method');
    });
    it('should throw error as ngOnInit does not exist', function () {
        var err = null;
        try {
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.cnt = 0;
                    return _this;
                }
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
        }
        catch (e) {
            err = e;
        }
        expect(err.message).toContain('must implement ngOnInit method');
    });
    it('should throw error as destroyFn not set by initFn is', function () {
        var err = null;
        try {
            var Hub = (function () {
                function Hub() {
                    this.events = {};
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
                        initFn: 'init'
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
        expect(err.message).toContain('both initFn and destroyFn');
    });
});
//# sourceMappingURL=event-listener.decorator.spec.js.map