"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_manager_1 = require("./event-manager");
function getClassPropertyName(args, instance) {
    if (!args.eventClass)
        return null;
    var keys = [];
    var classKeys = Object.keys(instance);
    for (var _i = 0, classKeys_1 = classKeys; _i < classKeys_1.length; _i++) {
        var key = classKeys_1[_i];
        if (instance[key].constructor.name === args.eventClass)
            keys.push(key);
    }
    if (keys.length)
        return keys;
    throw new Error('@EventListener: Unable to find class with name '
        + args.eventClass);
}
function isEventManagerClassWeWant(obj, eventName, ignoreName) {
    if (ignoreName === void 0) { ignoreName = false; }
    if (!obj)
        return false;
    if (!ignoreName && obj.constructor.name !== event_manager_1.EventManager.name)
        return false;
    return (obj.eventExists && obj.eventExists(eventName));
}
function getEventClass(args, classInstance) {
    var propertyNames = getClassPropertyName(args, classInstance);
    var eventClass = { foundCnt: 0, obj: null };
    if (propertyNames === null) {
        if (isEventManagerClassWeWant(classInstance, args.eventName, true)) {
            return classInstance;
        }
        propertyNames = Object.getOwnPropertyNames(classInstance);
    }
    for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
        var propName = propertyNames_1[_i];
        var propInstance = classInstance[propName];
        if (isEventManagerClassWeWant(propInstance, args.eventName)) {
            eventClass.obj = propInstance;
            eventClass.foundCnt++;
        }
        else if (isEventManagerClassWeWant(propInstance, args.eventName, true)) {
            eventClass.obj = propInstance;
            eventClass.foundCnt++;
        }
        var propNames = Object.getOwnPropertyNames(propInstance);
        for (var _a = 0, propNames_1 = propNames; _a < propNames_1.length; _a++) {
            var propName_1 = propNames_1[_a];
            if (isEventManagerClassWeWant(propInstance[propName_1], args.eventName)) {
                eventClass.obj = propInstance[propName_1];
                eventClass.foundCnt++;
            }
        }
    }
    if (eventClass.foundCnt > 1) {
        throw new Error('@EventListener: Found 2 or more classes using same event'
            + ' names (' + args.eventName + ')');
    }
    if (!eventClass.obj) {
        throw new Error('@EventListener: No EventManager class found that emits'
            + ' event: ' + args.eventName);
    }
    return eventClass.obj;
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
        var params;
        if (typeof arg1 === 'string') {
            params = { eventName: arg1, eventClass: (arg2) ? arg2.name : null };
        }
        else {
            params = arg1;
        }
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