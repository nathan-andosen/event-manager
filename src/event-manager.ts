
type ICallbackFn = (data?: any, next?: INextFn) => void;
interface IEventData {
  fn: ICallbackFn;
  scope?: any;
  onceOnlyEvent?: boolean;
}

// type for the next() function
export type INextFn = () => { completed: (cb: () => void) => void };



/**
 * Manage events with emit, on and off methods.
 *
 * @export
 * @class EventManager
 */
export class EventManager {

  // subscribed events
  private events: { [eventName: string]: IEventData[] } = {};


  /**
   * Emit an event
   *
   * @param {string} eventName
   * @param {*} [data]
   * @returns {void}
   * @memberof EventManager
   */
  emit(eventName: string, data?: any) {
    if (!this.events[eventName]) return;
    let completedEvents = 0;
    const completedCallbacks: Function[] = [];
    for (const eventFunction of this.events[eventName]) {
      eventFunction.fn.call(eventFunction.scope, data, () => {
        // place in a timeout so that the return statement is executed first
        setTimeout(() => {
          if (++completedEvents === this.events[eventName].length) {
            completedCallbacks.forEach((cb) => { cb(); });
          }
        }, 0);
        return {
          completed: (cb: Function) => { if (cb) completedCallbacks.push(cb); }
        };
      });
      if (eventFunction.onceOnlyEvent) this.off(eventName, eventFunction.fn);
    }
  }


  /**
   * Listen to an event
   *
   * @param {string} eventName
   * @param {(data?: any, next?: INextFn) => void} fn
   * @param {*} [scope]
   * @memberof EventManager
   */
  on(eventName: string, fn: ICallbackFn, scope?: any) {
    this.addFn(eventName, fn, scope);
  }


  /**
   * Listen to an event once
   *
   * @param {string} eventName
   * @param {(data?: any, next?: INextFn) => void} fn
   * @param {*} [scope]
   * @memberof EventManager
   */
  once(eventName: string, fn: ICallbackFn, scope?: any) {
    this.addFn(eventName, fn, scope, true);
  }


  /**
   * Add a function callback for an event
   *
   * @private
   * @param {string} eventName
   * @param {ICallbackFn} fn
   * @param {*} [scope]
   * @param {boolean} [once=false]
   * @memberof EventManager
   */
  private addFn(eventName: string, fn: ICallbackFn, scope?: any, once = false) {
    const fnName = (once) ? 'once' : 'on';
    if (!eventName) throw new Error(`No eventName passed to ${fnName}()`);
    if (!fn) throw new Error(`No callback function passed to ${fnName}()`);
    (this.events[eventName] || (this.events[eventName] = [])).push({
      fn: fn,
      scope: scope,
      onceOnlyEvent: once
    });
  }


  /**
   * Unbind from an event
   *
   * @param {string} eventName
   * @param {(data?: any, next?: INextFn) => void} fn
   * @returns
   * @memberof EventManager
   */
  off(eventName: string, fn: (data?: any, next?: INextFn) => void) {
    if (!fn || !this.events[eventName]) return;
    for (let i = 0 ; i < this.events[eventName].length; i++) {
      if (this.events[eventName][i].fn === fn) {
        this.events[eventName].splice(i, 1); break;
      }
    }
  }


  /**
   * Unbind from all events.
   *
   * @param {string} [eventName] If set, only events with this name will be 
   * unsubscribed.
   * @returns
   * @memberof EventManager
   */
  offAll(eventName?: string) {
    if (eventName) return delete this.events[eventName];
    this.events = {};
  }
}