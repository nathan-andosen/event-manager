// Arguments passed to the EventListener decorator
export interface IOnEventArgs {
  eventName: string;
  eventClass?: string;
  initFn?: string;
  destroyFn?: string;
}


/**
 * Get the property name of the event class (class that emits the events)
 *
 * @param {IOnEventArgs} args
 * @param {*} classInstance
 * @returns {string}
 */
function getClassPropertyName(args: IOnEventArgs, instance: any): string {
  if (!args.eventClass) return null;
  const classKeys = Object.keys(instance);
  for (const key of classKeys) {
    if (instance[key].constructor.name === args.eventClass) return key;
  }
  throw new Error('@EventListener: Unable to find class with name '
    + args.eventClass);
}


/**
 * Get the instance of the event class (class that emits the events)
 *
 * @param {IOnEventArgs} args
 * @param {*} classInstance
 * @returns {*}
 */
function getEventClass(args: IOnEventArgs, classInstance: any): any {
  const propertyName = getClassPropertyName(args, classInstance);
  const instance = (propertyName) ? classInstance[propertyName] : classInstance;
  if (!instance.on) {
    throw new Error('@EventListener: Class ' + instance.constructor.name
      + ' must extend EventManager');
  }
  return instance;
}


/**
 * Listen to events that are fired from EventManager classes
 *
 * @export
 * @param {(string|IOnEventArgs)} arg1
 * @param {string} [arg2]
 * @returns
 */
export function OnEvent (eventName: string, eventClass?: string): any;
export function OnEvent (args: IOnEventArgs): any;
export function OnEvent (arg1: string|IOnEventArgs, arg2?: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    if (typeof descriptor.value !== 'function') {
      throw new Error('@EventListener: Decorator must be applied to a method');
    }

    if (!arg1 || (typeof arg1 !== 'string' && arg1.constructor !== {}.constructor)) {
      throw new Error('@EventListener: First argument must be of type string or json object');
    }

    const params = (typeof arg1 === 'string')
      ? { eventName: arg1, eventClass: arg2 } : { ...arg1 };
    const initFnName = (params.initFn) ? params.initFn : 'ngOnInit';
    const destroyFnName = (params.destroyFn) ? params.destroyFn : 'ngOnDestroy';
    let eventClassInstance = null;

    // hook into our init function so we can bind to an event
    if (!target[initFnName]) target[initFnName] = () => {};
    const initFnOrignal = target[initFnName];
    target.constructor.prototype[initFnName] = function() {
      initFnOrignal.apply(this, arguments);
      eventClassInstance = getEventClass(params, this);
      eventClassInstance.on(params.eventName, descriptor.value, this);
    };

    // hook into our destroy function so we can unbind from an event
    if (!target[destroyFnName]) target[destroyFnName] = () => {};
    const destroyFnOriginal = target[destroyFnName];
    target.constructor.prototype[destroyFnName] = function() {
      destroyFnOriginal.apply(this, arguments);
      eventClassInstance.off(params.eventName, descriptor.value);
    };
  };
};

