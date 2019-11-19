import { EventManager, EventListener, INextFn } from '../../src';

describe('Event Listener Decorator', () => {
  it('should bind and unbind to events', () => {
    class Hub extends EventManager {
      public cnt = 0;
      constructor() {
        super();
        this.init();
      }
      private init() {}
      destroy() {}

      @EventListener({
        eventName: 'cnt-up',
        initFn: 'init',
        destroyFn: 'destroy'
      })
      protected cntListener() {
        this.cnt++;
      }
    }
    const hub = new Hub();
    hub.emit('cnt-up');
    expect(hub.cnt).toEqual(1);
    hub.destroy();
    hub.emit('cnt-up');
    expect(hub.cnt).toEqual(1);
  });

  it('should use default angular init and destroy functions', () => {
    class Hub extends EventManager {
      public cnt = 0;

      ngOnInit() { this.cnt++; }
      ngOnDestroy() {}

      @EventListener('cnt-up')
      protected cntListener() {
        this.cnt++;
      }
    }
    const hub = new Hub();
    hub['ngOnInit'](); // bind our event listener
    hub.emit('cnt-up');
    expect(hub.cnt).toEqual(2);
    hub['ngOnDestroy'](); // unbind our event listener
    hub.emit('cnt-up');
    expect(hub.cnt).toEqual(2);
  });

  it('should use property class', () => {
    class EventHub extends EventManager {}
    class MyTest {
      public cnt = 0;

      constructor(private eventHub: EventHub) {
        this.init();
      }

      private init() {}
      destroy() {}

      @EventListener({
        eventName: 'cnt-up',
        eventClass: EventHub.name,
        initFn: 'init',
        destroyFn: 'destroy'
      })
      cntListener() {
        this.cnt++;
      }

      count() {
        this.eventHub.emit('cnt-up');
      }
    }

    const eventHub = new EventHub();
    const myTest = new MyTest(eventHub);

    expect(myTest.cnt).toEqual(0);
    myTest.count();
    expect(myTest.cnt).toEqual(1);
    myTest.destroy();
    myTest.count();
    expect(myTest.cnt).toEqual(1);
  });

  it('should throw error as class name cant be found', () => {
    let err: Error = null;
    try {
      class EventHub extends EventManager {}
      class MyTest {
        public cnt = 0;

        constructor(private eventHub: EventHub) {
          this.init();
        }

        private init() {}
        destroy() {}

        @EventListener({
          eventName: 'cnt-up',
          eventClass: 'fake-name',
          initFn: 'init',
          destroyFn: 'destroy'
        })
        cntListener() {
          this.cnt++;
        }

        count() {
          this.eventHub.emit('cnt-up');
        }
      }

      const eventHub = new EventHub();
      const myTest = new MyTest(eventHub);
    } catch(e) {
      err = e;
    }
    expect(err.message).toContain('@EventListener: Unable to find class with '
      + 'name fake-name');
  });

  it('should throw error as event class does not extend EventManager', () => {
    let err: Error = null;
    try {
      class Hub {
        public cnt = 0;
        constructor() {
          this.init();
        }
        private init() {}
        destroy() {}
  
        @EventListener({
          eventName: 'cnt-up',
          initFn: 'init',
          destroyFn: 'destroy'
        })
        protected cntListener() {
          this.cnt++;
        }
      }
      const hub = new Hub();
    } catch(e) {
      err = e;
    }
    expect(err.message)
      .toContain('@EventListener: Class Hub must extend EventManager');
  });

  it('should throw error as decorator is not on a method', () => {
    let err: Error = null;
    try {
      class Hub extends EventManager {
        public cnt = 0;
        constructor() {
          super();
          this.init();
        }
        private init() {}
        destroy() {}
  
        @EventListener({
          eventName: 'cnt-up',
          initFn: 'init',
          destroyFn: 'destroy'
        })
        protected cntListener = true;
      }
      const hub = new Hub();
    } catch(e) {
      err = e;
    }
    expect(err.message)
      .toContain('@EventListener: Decorator must be applied to a method');
  });

  it('should throw error as args are not set', () => {
    let err: Error = null;
    try {
      class Hub extends EventManager {
        public cnt = 0;
        constructor() {
          super();
          this.init();
        }
        private init() {}
        destroy() {}
  
        @EventListener(null)
        protected cntListener() {
          this.cnt++;
        }
      }
    } catch(e) {
      err = e;
    }
    expect(err.message).toContain('@EventListener: First argument must be of '
      + 'type string or IEventListenerArgs')
  });

  it('should bind and unbind to events on the events property', () => {
    class Hub {
      events = new EventManager();
      public cnt = 0;
      constructor() {
        this.init();
      }
      private init() {}
      destroy() {}

      @EventListener({
        eventName: 'cnt-up',
        initFn: 'init',
        destroyFn: 'destroy'
      })
      protected cntListener() {
        this.cnt++;
      }
    }
    const hub = new Hub();
    hub.events.emit('cnt-up');
    expect(hub.cnt).toEqual(1);
    hub.destroy();
    hub.events.emit('cnt-up');
    expect(hub.cnt).toEqual(1);
  });

  it('should throw error as the events property is not of type EventManager',
  () => {
    let err: Error = null;
    try {
      class Hub {
        events = {};
        public cnt = 0;
        constructor() {
          this.init();
        }
        private init() {}
        destroy() {}
  
        @EventListener({
          eventName: 'cnt-up',
          initFn: 'init',
          destroyFn: 'destroy'
        })
        protected cntListener() {
          this.cnt++;
        }
      }
      const hub = new Hub();
    } catch(e) {
      err = e;
    }
    expect(err.message).toContain('@EventListener: Class');
  });
});