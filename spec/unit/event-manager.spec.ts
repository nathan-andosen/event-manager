import { EventManager, EventListener, INextFn } from '../../src';

describe('Event Manager', () => {

  /**
   * emit()
   */
  describe('emit()', () => {
    it('should emit event', (done) => {
      let cnt = 0;
      class Hub extends EventManager {}
      const EVENTS = { EVENT_A: 'event-a' };
      const hub = new Hub(EVENTS);
      hub.on(EVENTS.EVENT_A, (data, next) => {
        cnt++;
        expect(cnt).toEqual(1);
        expect(data.a).toEqual('a');
        done();
      });
      hub.emit(EVENTS.EVENT_A, { a: 'a' });
    });

    it('should emit event and fire completed', (done) => {
      let cnt = 0;
      class Hub extends EventManager {}
      const EVENTS = { EVENT_A: 'event-a' };
      const hub = new Hub(EVENTS);
      hub.on(EVENTS.EVENT_A, (data, next) => {
        setTimeout(() => {
          cnt++;
          next();
        }, 5);
      });
      hub.on(EVENTS.EVENT_A, (data, next) => {
        setTimeout(() => {
          cnt++;
          next().completed(() => {
            expect(cnt).toEqual(2);
            done();
          });
        }, 10);
      });
      hub.emit(EVENTS.EVENT_A);
    });
  });


  /**
   * on()
   */
  describe('on()', () => {
    it('should set scope', () => {
      const EVENTS = { EVENT_A: 'event-a' };
      class Hub extends EventManager {
        public cnt = 0;
        constructor() {
          super(EVENTS);
          this.on(EVENTS.EVENT_A, this.eventAListener, this);
        }

        eventAListener() {
          this.cnt++;
        }
      }
      const hub = new Hub();
      hub.emit(EVENTS.EVENT_A);
      expect(hub.cnt).toEqual(1);
      hub.emit(EVENTS.EVENT_A);
      expect(hub.cnt).toEqual(2);
    });

    it('should throw error as no event name is passed', () => {
      let err: Error = null;
      try {
        const EVENTS = { EVENT_A: 'event-a' };
        class Hub extends EventManager {}
        const hub = new Hub(EVENTS);
        hub.on(null, () => {});
      } catch(e) {
        err = e;
      }
      expect(err.message).toContain('No eventName passed');
    });

    it('should throw error as no callback function is passed', () => {
      let err: Error = null;
      try {
        const EVENTS = { EVENT_A: 'event-a' };
        class Hub extends EventManager {}
        const hub = new Hub(EVENTS);
        hub.on(EVENTS.EVENT_A, undefined);
      } catch(e) {
        err = e;
      }
      expect(err.message).toContain('No callback function');
    });
  });


  /**
   * once()
   */
  describe('once()', () => {
    it('should set scope and fire event only once', () => {
      const scope = { a: 1 };
      const EVENTS = { EVENT_A: 'event-a' };
      class Hub extends EventManager {}
      const hub = new Hub(EVENTS);
      hub.once(EVENTS.EVENT_A, function() {
        this.a++;
      }, scope);
      hub.emit(EVENTS.EVENT_A);
      expect(scope.a).toEqual(2);
      hub.emit(EVENTS.EVENT_A);
      expect(scope.a).toEqual(2);
    });

    it('should throw error as no event name is passed', () => {
      let err: Error = null;
      try {
        const EVENTS = { EVENT_A: 'event-a' };
        class Hub extends EventManager {}
        const hub = new Hub(EVENTS);
        hub.once(null, () => {});
      } catch(e) {
        err = e;
      }
      expect(err.message).toContain('No eventName passed');
    });

    it('should throw error as no callback function is passed', () => {
      let err: Error = null;
      try {
        const EVENTS = { EVENT_A: 'event-a' };
        class Hub extends EventManager {}
        const hub = new Hub(EVENTS);
        hub.once(EVENTS.EVENT_A, undefined);
      } catch(e) {
        err = e;
      }
      expect(err.message).toContain('No callback function');
    });
  });


  /**
   * off()
   */
  describe('off()', () => {
    it('should stop listening to an event', () => {
      let cnt = 0;
      const EVENTS = { EVENT_A: 'event-a' };
      class Hub extends EventManager {}
      const hub = new Hub(EVENTS);
      const listener = (data, next) => {
        cnt++;
        expect(data.a).toEqual('a');
      };
      hub.on(EVENTS.EVENT_A, listener);
      hub.emit(EVENTS.EVENT_A, { a: 'a' });
      expect(cnt).toEqual(1);
      hub.off(EVENTS.EVENT_A, listener);
      hub.emit(EVENTS.EVENT_A, { a: 'a' });
      expect(cnt).toEqual(1);
    });
  });


  /**
   * offAll()
   */
  describe('offAll()', () => {
    it('should stop listening to all event', () => {
      let cnt = 0;
      const EVENTS = {
        EVENT_A: 'event-a',
        EVENT_B: 'event-b',
        EVENT_C: 'event-c'
      };
      class Hub extends EventManager {}
      const hub = new Hub(EVENTS);
      const listenerA1 = () => { cnt++; };
      const listenerA2 = () => { cnt++; };
      const listenerB = () => { cnt++; };
      const listenerC = () => { cnt++; };
      hub.on(EVENTS.EVENT_A, listenerA1);
      hub.on(EVENTS.EVENT_A, listenerA2);
      hub.on(EVENTS.EVENT_B, listenerB);
      hub.on(EVENTS.EVENT_C, listenerC);
      hub.emit(EVENTS.EVENT_A);
      expect(cnt).toEqual(2);
      hub.emit(EVENTS.EVENT_B);
      expect(cnt).toEqual(3);
      hub.emit(EVENTS.EVENT_C);
      expect(cnt).toEqual(4);
      hub.offAll(EVENTS.EVENT_A);
      hub.emit(EVENTS.EVENT_A);
      expect(cnt).toEqual(4);
      hub.emit(EVENTS.EVENT_B);
      expect(cnt).toEqual(5);
      hub.offAll();
      hub.emit(EVENTS.EVENT_B);
      expect(cnt).toEqual(5);
      hub.emit(EVENTS.EVENT_C);
      expect(cnt).toEqual(5);
    });
  });
});