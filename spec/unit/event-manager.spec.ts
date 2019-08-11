import { EventManager, EventListener, INextFn } from '../../src';

describe('Event Manager', () => {

  /**
   * emit()
   */
  describe('emit()', () => {
    it('should emit event', (done) => {
      let cnt = 0;
      class Hub extends EventManager {}
      const hub = new Hub();
      hub.on('event-a', (data, next) => {
        cnt++;
        expect(cnt).toEqual(1);
        expect(data.a).toEqual('a');
        done();
      });
      hub.emit('event-a', { a: 'a' });
    });

    it('should emit event and fire completed', (done) => {
      let cnt = 0;
      class Hub extends EventManager {}
      const hub = new Hub();
      hub.on('event-a', (data, next) => {
        setTimeout(() => {
          cnt++;
          next();
        }, 5);
      });
      hub.on('event-a', (data, next) => {
        setTimeout(() => {
          cnt++;
          next().completed(() => {
            expect(cnt).toEqual(2);
            done();
          });
        }, 10);
      });
      hub.emit('event-a');
    });
  });


  /**
   * on()
   */
  describe('on()', () => {
    it('should set scope', () => {
      class Hub extends EventManager {
        public cnt = 0;
        constructor() {
          super();
          this.on('event-a', this.eventAListener, this);
        }

        eventAListener() {
          this.cnt++;
        }
      }
      const hub = new Hub();
      hub.emit('event-a');
      expect(hub.cnt).toEqual(1);
      hub.emit('event-a');
      expect(hub.cnt).toEqual(2);
    });

    it('should throw error as no event name is passed', () => {
      let err: Error = null;
      try {
        class Hub extends EventManager {}
        const hub = new Hub();
        hub.on(null, () => {});
      } catch(e) {
        err = e;
      }
      expect(err.message).toContain('Please provide');
    });

    it('should throw error as no callback function is passed', () => {
      let err: Error = null;
      try {
        class Hub extends EventManager {}
        const hub = new Hub();
        hub.on('event-a', undefined);
      } catch(e) {
        err = e;
      }
      expect(err.message).toContain('Please provide');
    });
  });


  /**
   * once()
   */
  describe('once()', () => {
    it('should set scope and fire event only once', () => {
      const scope = { a: 1 };
      class Hub extends EventManager {}
      const hub = new Hub();
      hub.once('event-a', function() {
        this.a++;
      }, scope);
      hub.emit('event-a');
      expect(scope.a).toEqual(2);
      hub.emit('event-a');
      expect(scope.a).toEqual(2);
    });

    it('should throw error as no event name is passed', () => {
      let err: Error = null;
      try {
        class Hub extends EventManager {}
        const hub = new Hub();
        hub.once(null, () => {});
      } catch(e) {
        err = e;
      }
      expect(err.message).toContain('Please provide');
    });

    it('should throw error as no callback function is passed', () => {
      let err: Error = null;
      try {
        class Hub extends EventManager {}
        const hub = new Hub();
        hub.once('event-a', undefined);
      } catch(e) {
        err = e;
      }
      expect(err.message).toContain('Please provide');
    });
  });


  /**
   * off()
   */
  describe('off()', () => {
    it('should stop listening to an event', () => {
      let cnt = 0;
      class Hub extends EventManager {}
      const hub = new Hub();
      const listener = (data, next) => {
        cnt++;
        expect(data.a).toEqual('a');
      };
      hub.on('event-a', listener);
      hub.emit('event-a', { a: 'a' });
      expect(cnt).toEqual(1);
      hub.off('event-a', listener);
      hub.emit('event-a', { a: 'a' });
      expect(cnt).toEqual(1);
    });
  });


  /**
   * offAll()
   */
  describe('offAll()', () => {
    it('should stop listening to all event', () => {
      let cnt = 0;
      class Hub extends EventManager {}
      const hub = new Hub();
      const listenerA1 = () => { cnt++; };
      const listenerA2 = () => { cnt++; };
      const listenerB = () => { cnt++; };
      const listenerC = () => { cnt++; };
      hub.on('event-a', listenerA1);
      hub.on('event-a', listenerA2);
      hub.on('event-b', listenerB);
      hub.on('event-c', listenerC);
      hub.emit('event-a');
      expect(cnt).toEqual(2);
      hub.emit('event-b');
      expect(cnt).toEqual(3);
      hub.emit('event-c');
      expect(cnt).toEqual(4);
      hub.offAll('event-a');
      hub.emit('event-a');
      expect(cnt).toEqual(4);
      hub.emit('event-b');
      expect(cnt).toEqual(5);
      hub.offAll();
      hub.emit('event-b');
      expect(cnt).toEqual(5);
      hub.emit('event-c');
      expect(cnt).toEqual(5);
    });
  });
});