"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function buildParams(arg1, arg2) {
    var params = {};
    if (typeof arg1 === 'string') {
        params.eventName = arg1;
        params.eventClass = (arg2) ? arg2 : null;
    }
    else {
        params = __assign({}, arg1);
    }
    return params;
}
;
function getEventClassName(params, classInstance) {
    if (!params.eventClass)
        return null;
    var classKeys = Object.keys(classInstance);
    for (var _i = 0, classKeys_1 = classKeys; _i < classKeys_1.length; _i++) {
        var key = classKeys_1[_i];
        if (classInstance[key].constructor.name === params.eventClass) {
            return key;
        }
    }
    throw new Error('@EventSubscriber unable to find class with name'
        + params.eventClass);
}
function getEventClass(eventClassName, classInstance) {
    if (eventClassName) {
        if (!classInstance[eventClassName].on) {
            throw new Error('@EventSubscriber class ' + eventClassName + ' must extend EventManager');
        }
        return classInstance[eventClassName];
    }
    else {
        if (!classInstance.on) {
            throw new Error('@EventSubscriber class ' + classInstance.constructor.name + ' must extend EventManager');
        }
        return classInstance;
    }
}
function EventSubscriber(arg1, arg2) {
    return function (target, propertyKey, descriptor) {
        console.log('EventSubscriber fired...', target);
        if (typeof descriptor.value !== 'function') {
            throw new Error('@EventSubscriber decorator must be applied to a method');
        }
        if (!arg1 || (typeof arg1 !== 'string' && arg1.constructor !== {}.constructor)) {
            throw new Error('@EventSubscriber First argument must be of type string or json object');
        }
        var params = buildParams(arg1, arg2);
        var initFn = (params.initFn) ? params.initFn : 'ngOnInit';
        var destroyFn = (params.destroyFn) ? params.destroyFn : 'ngOnDestroy';
        var eventClassName = null;
        var eventClass = null;
        if (!target[initFn])
            target[initFn] = function () { };
        var ngOnInitOrignal = target[initFn];
        target.constructor.prototype[initFn] = function () {
            ngOnInitOrignal.apply(this, arguments);
            eventClassName = getEventClassName(params, this);
            eventClass = getEventClass(eventClassName, this);
            eventClass.on(params.eventName, descriptor.value, this);
        };
        if (!target[destroyFn])
            target[destroyFn] = function () { };
        var destroyOriginal = target[destroyFn];
        target.constructor.prototype[destroyFn] = function () {
            destroyOriginal.apply(this, arguments);
            eventClass.off(params.eventName, descriptor.value);
        };
    };
}
exports.EventSubscriber = EventSubscriber;
;
//# sourceMappingURL=event-subscriber.decorator.js.map