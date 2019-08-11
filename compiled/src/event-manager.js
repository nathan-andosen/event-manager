"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventManager = (function () {
    function EventManager() {
        this.events = {};
    }
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
                    completedEvents++;
                    if (completedEvents === _this.events[eventName].length) {
                        completedCallbacks.forEach(function (cb) { cb(); });
                    }
                }, 0);
                return {
                    completed: function (cb) { if (cb)
                        completedCallbacks.push(cb); }
                };
            });
            if (eventFunction.onceOnlyEvent)
                this.off(eventName, eventFunction.fn);
        }
    };
    EventManager.prototype.on = function (eventName, fn, scope) {
        if (!fn)
            return;
        (this.events[eventName] || (this.events[eventName] = [])).push({
            fn: fn,
            scope: scope
        });
    };
    EventManager.prototype.once = function (eventName, fn, scope) {
        if (!fn)
            return;
        (this.events[eventName] || (this.events[eventName] = [])).push({
            fn: fn,
            scope: scope,
            onceOnlyEvent: true
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