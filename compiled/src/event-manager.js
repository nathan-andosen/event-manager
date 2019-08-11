"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventManager = (function () {
    function EventManager() {
        this.events = {};
    }
    EventManager.prototype.emit = function (eventName, data) {
        if (!this.events[eventName])
            return;
        for (var _i = 0, _a = this.events[eventName]; _i < _a.length; _i++) {
            var eventFunction = _a[_i];
            eventFunction.fn.call(eventFunction.scope, data);
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
    EventManager.prototype.once = function () {
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
    EventManager.prototype.offAll = function () {
    };
    return EventManager;
}());
exports.EventManager = EventManager;
//# sourceMappingURL=event-manager.js.map