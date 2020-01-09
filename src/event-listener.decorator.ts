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
function getClassPropertyName(args: IEventListenerArgs, instance: any): string {
  if (!args.eventClass) return null;
  const classKeys = Object.keys(instance);
  for (const key of classKeys) {
    if (instance[key].constructor.name === args.eventClass) return key;
  }
  throw new Error('@EventListener: Unable to find class with name '
    + args.eventClass);
}


/**
 * Get the instance of the EventManager class
 *
 * @param {IEventListenerArgs} args
 * @param {*} classInstance
 * @returns {*}
 */
function getEventClass(args: IEventListenerArgs, classInstance: any): any {
  const propertyName = getClassPropertyName(args, classInstance);
  const instance = (propertyName) ? classInstance[propertyName] : classInstance;
  if (!instance.on) {
    // try and find a property of type EventManager
    const propNames = Object.getOwnPropertyNames(instance);
    for (const propName of propNames) {
      if (instance[propName] && instance[propName].constructor
        && instance[propName].constructor.name === EventManager.name) {
        return instance[propName];
      }
    }
    throw new Error('@EventListener: Class ' + instance.constructor.name
      + ' must extend EventManager');
  }
  return instance;
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
export function EventListener(eventName: string, eventClass?: string): any;
export function EventListener(args: IEventListenerArgs): any;
export function EventListener(arg1: string | IEventListenerArgs, arg2?: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new Error('@EventListener: Decorator must be applied to a method');
    }

    if (!arg1
      || (typeof arg1 !== 'string' && arg1.constructor !== {}.constructor)) {
      throw new Error('@EventListener: First argument must be of type string '
        + 'or IEventListenerArgs');
    }

    const params = (typeof arg1 === 'string')
      ? { eventName: arg1, eventClass: arg2 } : arg1;
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

