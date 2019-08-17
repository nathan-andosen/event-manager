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
//# sourceMappingURL=event-listener.decorator.js.map