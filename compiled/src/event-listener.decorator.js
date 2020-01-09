"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_manager_1 = require("./event-manager");
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
        var propNames = Object.getOwnPropertyNames(instance);
        for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
            var propName = propNames_1[_i];
            if (instance[propName] && instance[propName].constructor
                && instance[propName].constructor.name === event_manager_1.EventManager.name) {
                return instance[propName];
            }
        }
        throw new Error('@EventListener: Class ' + instance.constructor.name
            + ' must extend EventManager');
    }
    return instance;
}
function validateFunctionsExist(args, target) {
    if (args.initFn || args.destroyFn) {
        if (!args.initFn || !args.destroyFn) {
            throw new Error('@EventListener: both initFn and destroyFn have to be '
                + 'set together');
        }
    }
    else {
        if (!target.constructor.prototype.ngOnInit) {
            throw new Error('@EventListener: Class ' + target.constructor.name +
                ' must implement ngOnInit method');
        }
        if (!target.constructor.prototype.ngOnDestroy) {
            throw new Error('@EventListener: Class ' + target.constructor.name +
                ' must implement ngOnDestroy method');
        }
    }
    return true;
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
        validateFunctionsExist(params, target);
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
//# sourceMappingURL=event-listener.decorator.js.map