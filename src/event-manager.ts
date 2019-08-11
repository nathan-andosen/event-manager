import { OnEvent, IOnEventArgs } from './on-event.decorator';

interface IEventData {
  fn: (data?: any) => void;
  scope?: any;
  onceOnlyEvent?: boolean;
}


export class EventManager {

  // subscribed events
  private events: { [eventName: string]: IEventData[] } = {};

  emit(eventName: string, data?: any) {
    if (!this.events[eventName]) return;
    for (const eventFunction of this.events[eventName]) {
      eventFunction.fn.call(eventFunction.scope, data);
      if (eventFunction.onceOnlyEvent) this.off(eventName, eventFunction.fn);
    }
  }


  on(eventName: string, fn: (data?: any) => void, scope?: any) {
    if (!fn) return;
    (this.events[eventName] || (this.events[eventName] = [])).push({
      fn: fn,
      scope: scope
    });
  }

  once() {

  }

  off(eventName: string, fn: (data?: any) => void) {
    if (!fn || !this.events[eventName]) return;
    for (let i = 0 ; i < this.events[eventName].length; i++) {
      if (this.events[eventName][i].fn === fn) {
        this.events[eventName].splice(i, 1); break;
      }
    }
  }

  offAll() {

  }

}