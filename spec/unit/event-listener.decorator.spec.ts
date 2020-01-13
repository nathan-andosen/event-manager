import { EventManager, EventListener, INextFn } from '../../src';

describe('Event Listener Decorator', () => {
  it('should bind and unbind to events', () => {
    const HUB_EVENTS = {
      CNT_UP: 'cnt-up'
    };
    class Hub extends EventManager {
      public cnt = 0;
      constructor() {
        super(HUB_EVENTS);
        this.init();
      }
      private init() {}
      destroy() {}

      @EventListener({
        eventName: HUB_EVENTS.CNT_UP,
        initFn: 'init',
        destroyFn: 'destroy'
      })
      cntListener() {
        this.cnt++;
      }
    }
    const hub = new Hub();
    hub.emit(HUB_EVENTS.CNT_UP);
    expect(hub.cnt).toEqual(1);
    hub.destroy();
    hub.emit(HUB_EVENTS.CNT_UP);
    expect(hub.cnt).toEqual(1);
  });

  it('should use default angular init and destroy functions', () => {
    const HUB_EVENTS = {
      CNT_UP: 'cnt-up'
    };
    class Hub extends EventManager {
      public cnt = 0;

      constructor() { super(HUB_EVENTS); }

      ngOnInit() { this.cnt++; }
      ngOnDestroy() {}

      @EventListener(HUB_EVENTS.CNT_UP)
      protected cntListener() {
        this.cnt++;
      }
    }
    const hub = new Hub();
    hub['ngOnInit'](); // bind our event listener
    hub.emit(HUB_EVENTS.CNT_UP);
    expect(hub.cnt).toEqual(2);
    hub['ngOnDestroy'](); // unbind our event listener
    hub.emit(HUB_EVENTS.CNT_UP);
    expect(hub.cnt).toEqual(2);
  });

  it('should use property class', () => {
    const HUB_EVENTS = {
      CNT_UP: 'cnt-up'
    };
    class EventHub extends EventManager {
      constructor() { super(HUB_EVENTS); }
    }
    class MyTest {
      public cnt = 0;

      constructor(private eventHub: EventHub) {
        this.init();
      }

      private init() {}
      destroy() {}

      @EventListener({
        eventName: HUB_EVENTS.CNT_UP,
        eventClass: EventHub.name,
        initFn: 'init',
        destroyFn: 'destroy'
      })
      cntListener() {
        this.cnt++;
      }

      count() {
        this.eventHub.emit(HUB_EVENTS.CNT_UP);
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
      const HUB_EVENTS = {
        CNT_UP: 'cnt-up'
      };
      class EventHub extends EventManager {
        constructor() { super(HUB_EVENTS); }
      }
      class MyTest {
        public cnt = 0;

        constructor(private eventHub: EventHub) {
          this.init();
        }

        private init() {}
        destroy() {}

        @EventListener({
          eventName: HUB_EVENTS.CNT_UP,
          eventClass: 'fake-name',
          initFn: 'init',
          destroyFn: 'destroy'
        })
        cntListener() {
          this.cnt++;
        }

        count() {
          this.eventHub.emit(HUB_EVENTS.CNT_UP);
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
      .toContain('@EventListener: No EventManager class');
  });

  it('should throw error as decorator is not on a method', () => {
    let err: Error = null;
    try {
      const HUB_EVENTS = {
        CNT_UP: 'cnt-up'
      };
      class Hub extends EventManager {
        public cnt = 0;
        constructor() {
          super(HUB_EVENTS);
          this.init();
        }
        private init() {}
        destroy() {}
  
        @EventListener({
          eventName: HUB_EVENTS.CNT_UP,
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
      const HUB_EVENTS = {
        CNT_UP: 'cnt-up'
      };
      class Hub extends EventManager {
        public cnt = 0;
        constructor() {
          super(HUB_EVENTS);
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
    const HUB_EVENTS = {
      CNT_UP: 'cnt-up'
    };
    const USER_EVENTS = {
      ADDED: 'user-added'
    };
    class Hub {
      events = new EventManager(HUB_EVENTS);
      userEvents = new EventManager(USER_EVENTS);
      public cnt = 0;
      public usersAdded = 0;
      constructor() {
        this.init();
      }
      private init() {}
      destroy() {}

      @EventListener({
        eventName: HUB_EVENTS.CNT_UP,
        initFn: 'init',
        destroyFn: 'destroy'
      })
      cntListener() {
        this.cnt++;
      }

      @EventListener({
        eventName: USER_EVENTS.ADDED,
        initFn: 'init',
        destroyFn: 'destroy'
      })
      usersAddListener() {
        this.usersAdded++;
      }
    }
    const hub = new Hub();
    hub.events.emit(HUB_EVENTS.CNT_UP);
    expect(hub.cnt).toEqual(1);
    hub.userEvents.emit(USER_EVENTS.ADDED);
    expect(hub.usersAdded).toEqual(1);
    hub.destroy();
    hub.events.emit(HUB_EVENTS.CNT_UP);
    expect(hub.cnt).toEqual(1);
  });

  it('should bind and unbind to events on random name property', () => {
    const HUB_EVENTS = {
      CNT_UP: 'cnt-up'
    };
    class EventFake { on() {} };
    class Hub {
      someProp = new EventFake();
      randomName = new EventManager(HUB_EVENTS);
      public cnt = 0;
      constructor() {
        this.init();
      }
      private init() {}
      destroy() {}

      @EventListener({
        eventName: HUB_EVENTS.CNT_UP,
        initFn: 'init',
        destroyFn: 'destroy'
      })
      protected cntListener() {
        this.cnt++;
      }
    }
    const hub = new Hub();
    hub.randomName.emit(HUB_EVENTS.CNT_UP);
    expect(hub.cnt).toEqual(1);
    hub.destroy();
    hub.randomName.emit(HUB_EVENTS.CNT_UP);
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
    expect(err.message).toContain('@EventListener: No EventManager class');
  });

  it('should throw error as ngOnDestroy does not exist', () => {
    let err: Error = null;
    try {
      const HUB_EVENTS = {
        CNT_UP: 'cnt-up'
      };
      class Hub extends EventManager {
        public cnt = 0;

        ngOnInit() { this.cnt++; }

        @EventListener(HUB_EVENTS.CNT_UP)
        protected cntListener() {
          this.cnt++;
        }
      }
      const hub = new Hub(HUB_EVENTS);
    } catch(e) {
      err = e;
    }
    expect(err.message).toContain('must implement ngOnDestroy method');
  });

  it('should throw error as ngOnInit does not exist', () => {
    let err: Error = null;
    try {
      const HUB_EVENTS = {
        CNT_UP: 'cnt-up'
      };
      class Hub extends EventManager {
        public cnt = 0;

        ngOnDestroy() {}

        @EventListener(HUB_EVENTS.CNT_UP)
        protected cntListener() {
          this.cnt++;
        }
      }
      const hub = new Hub(HUB_EVENTS);
    } catch(e) {
      err = e;
    }
    expect(err.message).toContain('must implement ngOnInit method');
  });

  it('should throw error as destroyFn not set by initFn is',
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
          initFn: 'init'
        })
        protected cntListener() {
          this.cnt++;
        }
      }
      const hub = new Hub();
    } catch(e) {
      err = e;
    }
    expect(err.message).toContain('both initFn and destroyFn');
  });


  /**
   * This test is used because of how Angular AoT and depenedency injection
   * works. When injecting services into a component, each service gets the
   * same type, so the EventListener decorator needs another way to find the
   * correct EventManager class. To do this, it uses the event name, if the
   * EventManager class contains the event name, it must be the right class.
   * Thats why event names need to be unique.
   */
  it('should work with multiple classes of same type', () => {
    class EventFake { on() {} };
    const ONE_EVENTS = {
      SOMETHING_ADDED: 's1-something-added'
    };
    class ServiceOne {
      events: EventManager;
      constructor(e: any) { this.events = new EventManager(e); }
    }
    const TWO_EVENTS = {
      SOMETHING_ADDED: 's2-something-added'
    };
    class ServiceTwo {
      events: EventManager;
      constructor(e: any) { this.events = new EventManager(e); }
    }

    class Hub {
      serviceOne = new ServiceOne(ONE_EVENTS);
      fakeEventClass = new EventFake();
      serviceTwoButDifferent = new ServiceTwo(ONE_EVENTS);
      serviceTwo = new ServiceTwo(TWO_EVENTS);
      public cnt = 0;
      constructor() {
        
      }
      ngOnInit() {}
      ngOnDestroy() {}

      @EventListener(TWO_EVENTS.SOMETHING_ADDED, ServiceTwo)
      protected cntListener() {
        this.cnt++;
      }
    }
    const hub = new Hub();
    hub.ngOnInit();
    hub.serviceTwo.events.emit(TWO_EVENTS.SOMETHING_ADDED);
    expect(hub.cnt).toEqual(1);
    hub.serviceOne.events.emit(ONE_EVENTS.SOMETHING_ADDED);
    expect(hub.cnt).toEqual(1);
    hub.ngOnDestroy();
  });


  it('should throw error as two classes use same event name', () => {
    class EventFake { on() {} };
    const ONE_EVENTS = {
      SOMETHING_ADDED: 'something-added'
    };
    class ServiceOne {
      events: EventManager;
      constructor(e: any) { this.events = new EventManager(e); }
    }
    const TWO_EVENTS = {
      SOMETHING_ADDED: 'something-added'
    };
    class ServiceTwo {
      events: EventManager;
      constructor(e: any) { this.events = new EventManager(e); }
    }

    class Hub {
      serviceOne = new ServiceOne(ONE_EVENTS);
      fakeEventClass = new EventFake();
      serviceTwoButDifferent = new ServiceTwo(ONE_EVENTS);
      serviceTwo = new ServiceTwo(TWO_EVENTS);
      public cnt = 0;
      constructor() {
        
      }
      ngOnInit() {}
      ngOnDestroy() {}

      @EventListener(TWO_EVENTS.SOMETHING_ADDED, ServiceTwo)
      protected cntListener() {
        this.cnt++;
      }
    }
    let err;
    try {
      const hub = new Hub();
      hub.ngOnInit();
    } catch(e) {
      err = e;
    }
    expect(err.message).toContain('Found 2 or more classes');
  });
});