
interface IEventData {
  fn: (data?: any) => void;
  scope?: any;
  onceOnlyEvent?: boolean;
}

export type INextFn = () => { completed: (cb: () => void) => void };



export class EventManager {

  // subscribed events
  private events: { [eventName: string]: IEventData[] } = {};




  emit(eventName: string, data?: any) {
    if (!this.events[eventName]) return;
    let completedEvents = 0;
    const completedCallbacks: Function[] = [];
    for (const eventFunction of this.events[eventName]) {
      eventFunction.fn.call(eventFunction.scope, data, () => {
        // place in a timeout so that the return statement is executed first
        setTimeout(() => {
          completedEvents++;
          if (completedEvents === this.events[eventName].length) {
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


  on(eventName: string, fn: (data?: any, next?: INextFn) => void, scope?: any) {
    if (!fn) return;
    (this.events[eventName] || (this.events[eventName] = [])).push({
      fn: fn,
      scope: scope
    });
  }

  once(eventName: string, fn: (data?: any, next?: INextFn) => void, scope?: any) {
    if (!fn) return;
    (this.events[eventName] || (this.events[eventName] = [])).push({
      fn: fn,
      scope: scope,
      onceOnlyEvent: true
    });
  }

  off(eventName: string, fn: (data?: any, next?: INextFn) => void) {
    if (!fn || !this.events[eventName]) return;
    for (let i = 0 ; i < this.events[eventName].length; i++) {
      if (this.events[eventName][i].fn === fn) {
        this.events[eventName].splice(i, 1); break;
      }
    }
  }

  offAll(eventName?: string) {
    // if (eventName) {
    //   delete this.events[eventName];
    // } else {
    //   this.events = {};
    // }

    if (eventName) return delete this.events[eventName];
    this.events = {};
  }
}