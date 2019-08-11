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
function OnEvent(arg1, arg2) {
    return function (target, propertyKey, descriptor) {
        if (typeof descriptor.value !== 'function') {
            throw new Error('@EventListener: Decorator must be applied to a method');
        }
        if (!arg1 || (typeof arg1 !== 'string' && arg1.constructor !== {}.constructor)) {
            throw new Error('@EventListener: First argument must be of type string or json object');
        }
        var params = (typeof arg1 === 'string')
            ? { eventName: arg1, eventClass: arg2 } : __assign({}, arg1);
        var initFnName = (params.initFn) ? params.initFn : 'ngOnInit';
        var destroyFnName = (params.destroyFn) ? params.destroyFn : 'ngOnDestroy';
        var eventClassInstance = null;
        if (!target[initFnName])
            target[initFnName] = function () { };
        var initFnOrignal = target[initFnName];
        target.constructor.prototype[initFnName] = function () {
            initFnOrignal.apply(this, arguments);
            eventClassInstance = getEventClass(params, this);
            eventClassInstance.on(params.eventName, descriptor.value, this);
        };
        if (!target[destroyFnName])
            target[destroyFnName] = function () { };
        var destroyFnOriginal = target[destroyFnName];
        target.constructor.prototype[destroyFnName] = function () {
            destroyFnOriginal.apply(this, arguments);
            eventClassInstance.off(params.eventName, descriptor.value);
        };
    };
}
exports.OnEvent = OnEvent;
;
//# sourceMappingURL=on-event.decorator.js.map