![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-100%25-brightgreen.svg)

# Event Manager

Event manager is an easy way to manage events in a web applications. Its a basic class that you can use to add extra event functionality using methods like: _emit()_, _on()_, _off()_ and so on.

## Key features

* __Bind and unbind to events using a decorator__
  * Reduce code by automatically binding and unbinding to events with a method decorator
  * Works great with Angular components, binds on the _ngOnInit_ method and unbinds on the _ngOnDestroy_ method
* __Run code after all event listeners have executed__
  * Easily run code after all event listeners have completed. Works with async event listeners as well
* __Small & light weight__
* __Inheritance or Composition__
  * Use the EventManager class via inheritance or composition

# How to use

1. Install the module:

``npm install @thenja/event-manager --save``

2. You have two ways to use the EventManager. Inheritance via _extends_ or composition via _property composition_.

### Inheritance:

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

// Important: event names have to be unique for the whole application
const USER_EVENTS = {
  SIGN_IN: 'user-sign-in'
};

export class UserService extends EventManager {
  constructor() {
    super(USER_EVENTS);
  }

  userSignIn() {
    this.emit(USER_EVENTS.SIGN_IN, {});
  }
}

// Now you could listen to events
userService.on(USER_EVENTS.SIGN_IN, () => {});
```

### Composition with property (recommended):

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

// Important: event names have to be unique for the whole application
const USER_EVENTS = {
  SIGN_IN: 'user-sign-in'
};

export class UserService {
  events = new EventManager(USER_EVENTS);

  userSignIn() {
    this.events.emit(USER_EVENTS.SIGN_IN, {});
  }
}

// Now you could listen to events
userService.events.on(USER_EVENTS.SIGN_IN, () => {});
```

## Methods / API

### constructor (_emittedEvents: { [key: string]: string }_)

The possible emitted events that the manager can emit.

### emit (_eventName: string, data?: any_)

Emit an event. The second parameter is the data that is passed to the listener function.

### .on (_eventName: string, fn: (data?: any, next?: INextFn) => void, scope?: any_)

Bind to an event. If the emitted event sends data, it will be the first parameter.

### .once (_eventName: string, fn: (data?: any, next?: INextFn) => void, scope?: any_)

Bind to an event once, the listener will only fire once.

### .off (_eventName: string, fn: (data?: any, next?: INextFn) => void_)

Unbind from an event.

### .offAll (_eventName?: string_)

Unbind from all events. If you pass in an eventName, it will only unbind all listeners for that event.

## @EventListener decorator

The _@EventListener_ decorator is a method decorator that will automatically subscribe and unsubscribe to events, its very useful in Angular components, but can be used anywhere.

__IMPORTANT:__ If using the EventListener decorator, make event names unique throughout your app. If not, the EventListener decorator will throw an error.

__How it works:__

The decorator simple binds the event on an initialisation method, in the case of Angular, its the _ngOnInit_ method. It unbinds the event on a destroy method, in the case of Angular, its the _ngOnDestroy_ method.

The decorator can be used in two ways:

__Two individual arguments:__

```typescript
@EventListener(eventName: string, classObject?: Object)
```

* __eventName__ : The name of the emitted event.
* __classObject__: _(optional)_ The class that is emitting the event. (view example 1 below in the _Use cases / Examples_ section). If the listener method is listening to internal events that are emitted from within the same class, this can be left blank (view example 2 below in the _Use cases / Examples_ section).

__One object argument:__

```typescript
@EventListener(args: IEventListenerArgs)

// Example
@EventListener({
  eventName: 'user-sign-in',
  eventClass: UserService.name,
  initFn: 'ngOnInit',
  destroyFn: 'ngOnDestroy'
})
```

* __eventName__ : _Same as above_
* __eventClass__ : The constructor name of the class that is emitting the event.
* __initFn__ : _[Default = ngOnInit]_ The function that is fired when the component / class is initialised. This is where binding to events will occur. If you want to bind to events when the constructor is fired, view example 3 below in the _Use cases / Examples_ section.
* __destroyFn__ : _[Default = ngOnDestroy]_ The function that is fired when the component is destroyed. This is where unbinding from events will occur.


# Use cases / Examples

### Example 1 - _Listen to an event thats emitted from a service inside an Angular component:_

_In this example, we have a service that is injected into an Angular component, the service emits events, the component can bind to these events._

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

const USER_EVENTS = {
  SIGN_IN: 'user-sign-in'
};

// our service which extends EventManager
export class UserService extends EventManager {
  constructor() {
    super(USER_EVENTS);
  }

  userSignIn() {
    const userData = {};
    this.emit(USER_EVENTS.SIGN_IN, userData);
  }
}

// our angular component
@Component(...)
export class HomePageComponent {
  constructor(private userSrv: UserService) {}

  @EventListener(USER_EVENTS.SIGN_IN, UserService)
  userSignInListener(userData: any) {
    // This method will be fired when the user-sign-in event is emitted
  }
}
```

__OR__ you could use composition like:

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

const USER_EVENTS = {
  SIGN_IN: 'user-sign-in'
};

// our service which extends EventManager
export class UserService {
  events: EventManager;

  constructor() {
    this.events = new EventManager(USER_EVENTS);
  }

  userSignIn() {
    const userData = {};
    this.events.emit(USER_EVENTS.SIGN_IN, userData);
  }
}

// our angular component
@Component(...)
export class HomePageComponent {
  constructor(private userSrv: UserService) {}

  @EventListener(USER_EVENTS.SIGN_IN, UserService)
  userSignInListener(userData: any) {
    // This method will be fired when the user-sign-in event is emitted
  }
}
```

### Example 2 - _Listen to internal events:_

_In this example, we will listen to internal events that are emitted within the same class._

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

const USER_EVENTS = {
  SIGN_IN: 'user-sign-in'
};

export class UserService extends EventManager {
  constructor() {
    super(USER_EVENTS);
  }

  userSignIn() {
    const userData = {};
    this.emit(USER_EVENTS.SIGN_IN, userData);
  }

  @EventListener(USER_EVENTS.SIGN_IN)
  userSignInListener(userData: any) {
    // This method will be fired when the user-sign-in event is emitted
  }
}
```

### Example 3 - _Bind to events inside constructor:_

_In this example, we set different init and destroy functions. In this case, we bind to events when the constructor is fired._

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

const USER_EVENTS = {
  SIGN_IN: 'user-sign-in'
};

export class UserService extends EventManager {
  constructor() {
    super(USER_EVENTS);
    this.init();
  }

  protected init();
  destroy();

  @EventListener({
    eventName: USER_EVENTS.SIGN_IN,
    initFn: 'init',
    destroyFn: 'destroy'
  })
  userSignInListener(userData: any) {
    // This method will now be bound to the event when the constructor fires
  }
}
```

### Example 4 - _Run code after all event listeners have completed execution:_

_In this example, we will run code after all event listeners have finished executing. In this example, we are not using the EventListener decorator, but you could still do the same with it._

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

const USER_EVENTS = {
  SIGN_OUT: 'user-sign-out'
};

// our user settings service
class UserSettingsService {
  constructor(private appEventsHub: AppEventsHub) {
    this.appEventsHub.on(USER_EVENTS.SIGN_OUT, this.userSignedOutListener, this);
  }

  private userSignedOutListener(data, next: INextFn) {
    setTimeout(() => {
      // fire the next function to indicate we are done
      next();
    }, 10);
  }
}

// our user service
class UserService {
  constructor(private appEventsHub: AppEventsHub) {
    this.appEventsHub.on(USER_EVENTS.SIGN_OUT, this.userSignedOutListener, this);
  }

  private userSignedOutListener(data, next: INextFn) {
    setTimeout(() => {
      // the next function returns a completed function, you can set a callback
      // function that gets fired when all listeners have completed and fired
      // their next() functions.
      next().completed(() => {
        // all listeners are done...
      });
    }, 5);
  }
}

// our app events hub service
class AppEventsHub extends EventManager {
  constructor() {
    super(USER_EVENTS);
  }

  userSignedOut() {
    this.emit(USER_EVENTS.SIGN_OUT);
  }
}
```

### Example 5 - _Setting the scope_

_Most of the time you will want to set the scope to __this__ so that the keyword __this__ inside your listener function points to your class instance._

```typescript
const USER_EVENTS = {
  SIGN_OUT: 'user-sign-out'
};

class UserService {
  private userIsSignedIn = true;
  constructor(private appEventsHub: AppEventsHub) {
    // set this as the scope
    this.appEventsHub.on(USER_EVENTS.SIGN_OUT, this.userSignedOutListener, this);
  }

  private userSignedOutListener(data, next: INextFn) {
    this.userIsSignedIn = false;
  }
}
```

# Development

``npm run init`` - Setup the app for development (run once after cloning)

``npm run dev`` - Run this command when you want to work on this app. It will
compile typescript, run tests and watch for file changes.

## Distribution

``npm run build -- -v <version>`` - Create a distribution build of the app.

__-v (version)__ - _[Optional]_ Either "patch", "minor" or "major". Increase
the version number in the package.json file.

The build command creates a _/compiled_ directory which has all the javascript
compiled code and typescript definitions. As well, a _/dist_ directory is 
created that contains a minified javascript file.

## Testing

_Tests are automatically ran when you do a build._

``npm run test`` - Run the tests. The tests will be ran in a nodejs environment.
You can run the tests in a browser environment by opening the file 
_/spec/in-browser/SpecRunner.html_.


## License

MIT © [Nathan Anderson](https://github.com/nathan-andosen)