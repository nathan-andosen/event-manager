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
var src_1 = require("../../src");
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
            var EVENTS = { EVENT_A: 'event-a' };
            var hub = new Hub(EVENTS);
            hub.on(EVENTS.EVENT_A, function (data, next) {
                cnt++;
                expect(cnt).toEqual(1);
                expect(data.a).toEqual('a');
                done();
            });
            hub.emit(EVENTS.EVENT_A, { a: 'a' });
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
            var EVENTS = { EVENT_A: 'event-a' };
            var hub = new Hub(EVENTS);
            hub.on(EVENTS.EVENT_A, function (data, next) {
                setTimeout(function () {
                    cnt++;
                    next();
                }, 5);
            });
            hub.on(EVENTS.EVENT_A, function (data, next) {
                setTimeout(function () {
                    cnt++;
                    next().completed(function () {
                        expect(cnt).toEqual(2);
                        done();
                    });
                }, 10);
            });
            hub.emit(EVENTS.EVENT_A);
        });
    });
    describe('on()', function () {
        it('should set scope', function () {
            var EVENTS = { EVENT_A: 'event-a' };
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    var _this = _super.call(this, EVENTS) || this;
                    _this.cnt = 0;
                    _this.on(EVENTS.EVENT_A, _this.eventAListener, _this);
                    return _this;
                }
                Hub.prototype.eventAListener = function () {
                    this.cnt++;
                };
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
            hub.emit(EVENTS.EVENT_A);
            expect(hub.cnt).toEqual(1);
            hub.emit(EVENTS.EVENT_A);
            expect(hub.cnt).toEqual(2);
        });
        it('should throw error as no event name is passed', function () {
            var err = null;
            try {
                var EVENTS = { EVENT_A: 'event-a' };
                var Hub = (function (_super) {
                    __extends(Hub, _super);
                    function Hub() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Hub;
                }(src_1.EventManager));
                var hub = new Hub(EVENTS);
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
                var EVENTS = { EVENT_A: 'event-a' };
                var Hub = (function (_super) {
                    __extends(Hub, _super);
                    function Hub() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Hub;
                }(src_1.EventManager));
                var hub = new Hub(EVENTS);
                hub.on(EVENTS.EVENT_A, undefined);
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
            var EVENTS = { EVENT_A: 'event-a' };
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub(EVENTS);
            hub.once(EVENTS.EVENT_A, function () {
                this.a++;
            }, scope);
            hub.emit(EVENTS.EVENT_A);
            expect(scope.a).toEqual(2);
            hub.emit(EVENTS.EVENT_A);
            expect(scope.a).toEqual(2);
        });
        it('should throw error as no event name is passed', function () {
            var err = null;
            try {
                var EVENTS = { EVENT_A: 'event-a' };
                var Hub = (function (_super) {
                    __extends(Hub, _super);
                    function Hub() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Hub;
                }(src_1.EventManager));
                var hub = new Hub(EVENTS);
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
                var EVENTS = { EVENT_A: 'event-a' };
                var Hub = (function (_super) {
                    __extends(Hub, _super);
                    function Hub() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Hub;
                }(src_1.EventManager));
                var hub = new Hub(EVENTS);
                hub.once(EVENTS.EVENT_A, undefined);
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
            var EVENTS = { EVENT_A: 'event-a' };
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub(EVENTS);
            var listener = function (data, next) {
                cnt++;
                expect(data.a).toEqual('a');
            };
            hub.on(EVENTS.EVENT_A, listener);
            hub.emit(EVENTS.EVENT_A, { a: 'a' });
            expect(cnt).toEqual(1);
            hub.off(EVENTS.EVENT_A, listener);
            hub.emit(EVENTS.EVENT_A, { a: 'a' });
            expect(cnt).toEqual(1);
        });
    });
    describe('offAll()', function () {
        it('should stop listening to all event', function () {
            var cnt = 0;
            var EVENTS = {
                EVENT_A: 'event-a',
                EVENT_B: 'event-b',
                EVENT_C: 'event-c'
            };
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub(EVENTS);
            var listenerA1 = function () { cnt++; };
            var listenerA2 = function () { cnt++; };
            var listenerB = function () { cnt++; };
            var listenerC = function () { cnt++; };
            hub.on(EVENTS.EVENT_A, listenerA1);
            hub.on(EVENTS.EVENT_A, listenerA2);
            hub.on(EVENTS.EVENT_B, listenerB);
            hub.on(EVENTS.EVENT_C, listenerC);
            hub.emit(EVENTS.EVENT_A);
            expect(cnt).toEqual(2);
            hub.emit(EVENTS.EVENT_B);
            expect(cnt).toEqual(3);
            hub.emit(EVENTS.EVENT_C);
            expect(cnt).toEqual(4);
            hub.offAll(EVENTS.EVENT_A);
            hub.emit(EVENTS.EVENT_A);
            expect(cnt).toEqual(4);
            hub.emit(EVENTS.EVENT_B);
            expect(cnt).toEqual(5);
            hub.offAll();
            hub.emit(EVENTS.EVENT_B);
            expect(cnt).toEqual(5);
            hub.emit(EVENTS.EVENT_C);
            expect(cnt).toEqual(5);
        });
    });
});
//# sourceMappingURL=event-manager.spec.js.map