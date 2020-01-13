import { EventManager } from './event-manager';

// Arguments passed to the EventListener decorator
interface IEventListenerArgs {
  eventName: string;
  eventClass?: string;
  initFn?: string;
  destroyFn?: string;
}


/**
 * Get the property name that points to the class that extends or uses the
 * EventManager class
 *
 * @param {IEventListenerArgs} args
 * @param {*} classInstance
 * @returns {string}
 */
function getClassPropertyName(args: IEventListenerArgs, instance: any)
: string[] {
  if (!args.eventClass) return null;
  const keys: string[] = [];
  const classKeys = Object.keys(instance);
  for (const key of classKeys) {
    if (instance[key].constructor.name === args.eventClass) keys.push(key);
  }
  if (keys.length) return keys;
  throw new Error('@EventListener: Unable to find class with name '
    + args.eventClass);
}


/**
 * Determine if the class is the EventManager class we want to subscribe too
 *
 * @param {EventManager} obj
 * @param {string} eventName
 * @param {boolean} [ignoreName=false]
 * @returns
 */
function isEventManagerClassWeWant(obj: EventManager, eventName: string,
ignoreName = false) {
  if (!obj) return false;
  if (!ignoreName && obj.constructor.name !== EventManager.name) return false;
  return (obj.eventExists && obj.eventExists(eventName));
}


/**
 * Get the instance of the EventManager class
 *
 * @param {IEventListenerArgs} args
 * @param {*} classInstance
 * @returns {*}
 */
function getEventClass(args: IEventListenerArgs, classInstance: any): any {
  let propertyNames = getClassPropertyName(args, classInstance);
  const eventClass = { foundCnt: 0, obj: null };
  if (propertyNames === null) {
    if (isEventManagerClassWeWant(classInstance, args.eventName, true)) {
      return classInstance;
    }
    // the EventManager class we are trying to find might just be a property
    // on the class
    propertyNames = Object.getOwnPropertyNames(classInstance);
  }
  for (const propName of propertyNames) {
    // const propInstance = (propName) ? classInstance[propName] : classInstance;
    const propInstance = classInstance[propName];
    // the property itself might be of type EventManager
    if (isEventManagerClassWeWant(propInstance, args.eventName)) {
      eventClass.obj = propInstance;
      eventClass.foundCnt++;
    }
    // or the property is a class that extends EventManager
     else if (isEventManagerClassWeWant(propInstance, args.eventName, true)) {
      eventClass.obj = propInstance;
      eventClass.foundCnt++;
    }
    // or its a class that has a property in it that is of type EventManager
    const propNames = Object.getOwnPropertyNames(propInstance);
    for (const propName of propNames) {
      if (isEventManagerClassWeWant(propInstance[propName], args.eventName)) {
        eventClass.obj = propInstance[propName];
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


/**
 * Validate that either the initFn & destroyFn are set or we assume we are
 * runing in Angular so the ngOnInit & ngOnDestroy must be set because
 * decorators and life cycle hooks do not work with Angular AoT:
 * 
 * https://github.com/angular/angular/issues/16023
 * https://github.com/angular/angular/issues/31495
 *
 * @param {IEventListenerArgs} args
 * @param {*} target
 * @returns
 */
function validateFunctionsExist(args: IEventListenerArgs, target: any) {
  if (args.initFn || args.destroyFn) {
    // both must exist
    if (!args.initFn || !args.destroyFn) {
      throw new Error('@EventListener: both initFn and destroyFn have to be '
        + 'set together');
    }
  } else {
    // we assume we are running in Angular and since Angular AoT does not
    // work with decorators and life cycle hooks, we must check that the
    // two life cycle hooks exist on the class
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


/**
 * Listen to events that are fired from EventManager classes
 *
 * @export
 * @param {(string|IEventListenerArgs)} arg1
 * @param {string} [arg2]
 * @returns
 */
export function EventListener(eventName: string, classObject?: Object): any;
export function EventListener(args: IEventListenerArgs): any;
export function EventListener(arg1: string | IEventListenerArgs, arg2?: Function) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new Error('@EventListener: Decorator must be applied to a method');
    }

    if (!arg1
      || (typeof arg1 !== 'string' && arg1.constructor !== {}.constructor)) {
      throw new Error('@EventListener: First argument must be of type string '
        + 'or IEventListenerArgs');
    }

    let params: IEventListenerArgs;
    if (typeof arg1 === 'string') {
      params = { eventName: arg1, eventClass: (arg2) ? arg2.name : null };
    } else {
      params = arg1;
    }


    validateFunctionsExist(params, target);
    const initFnName = (params.initFn || 'ngOnInit');
    const destroyFnName = (params.destroyFn || 'ngOnDestroy');
    let eventClassInstance = null;

    // hook into our init function so we can bind to an event
    const initFnOrignal = (target[initFnName] || function () { });
    target.constructor.prototype[initFnName] = function () {
      initFnOrignal.apply(this, arguments);
      eventClassInstance = getEventClass(params, this);
      eventClassInstance.on(params.eventName, descriptor.value, this);
    };

    // hook into our destroy function so we can unbind from an event
    const destroyFnOriginal = (target[destroyFnName] || function () { });
    target.constructor.prototype[destroyFnName] = function () {
      destroyFnOriginal.apply(this, arguments);
      eventClassInstance.off(params.eventName, descriptor.value);
    };
  };
};

