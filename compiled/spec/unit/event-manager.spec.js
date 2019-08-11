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
            expect(err.message).toContain('Please provide');
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
            expect(err.message).toContain('Please provide');
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
            expect(err.message).toContain('Please provide');
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
            expect(err.message).toContain('Please provide');
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
//# sourceMappingURL=event-manager.spec.js.map