"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventManager = (function () {
    function EventManager(emittedEvents) {
        this.emittedEvents = {};
        for (var key in emittedEvents) {
            this.emittedEvents[emittedEvents[key]] = true;
        }
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
    EventManager.prototype.eventExists = function (name) {
        return (this.emittedEvents && this.emittedEvents[name]) ? true : false;
    };
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
//# sourceMappingURL=event-manager.js.map