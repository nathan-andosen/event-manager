# 2.0.0

### Breaking changes

* When initialising the EventManager class, you must supply an object of the possible events that can be emitted from the manager.

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

const USER_EVENTS = {
  SIGN_IN: 'user-sign-in'
};

export class UserService {
  events = new EventManager(USER_EVENTS);

  userSignIn() {
    this.events.emit(USER_EVENTS.SIGN_IN, {});
  }
}
```

* The EventListener decorator's second parameter is now just the class object itself, not the name. 

```typescript
// Old, version: 1.x.x
@EventListener(USER_EVENTS.SIGN_IN, UserService.name)

// New, version: 2.x.x
@EventListener(USER_EVENTS.SIGN_IN, UserService)
```

### Fixed:

* Fix issue with having multiple properties of the same type on a class. The EventListener decorator could not find the correct one to subscribe too.

# 1.3.1

__Important:__ When using with Angular, your components must implement ngOnInit and ngOnDestroy functions. See fixed issue below.

### Fixed:

* Fixed issue with Angular life cycle hooks not working with Decorators [16023](https://github.com/angular/angular/issues/16023), [31495](https://github.com/angular/angular/issues/31495).

# 1.3.0

### Added:

* Added the ability to set an __events__ property which is set to the EventManager class

```typescript
import { EventManager, EventListener, INextFn } from '@thenja/event-manager';

export class UserService {
  events = new EventManager();

  userSignIn() {
    this.events.emit('user-sign-in', {});
  }
}
```

# 1.2.0

### Added:

* Added mixin decorator for better composition, updated docs

# 1.1.0

### Added:

* Added ability to use composition via Typescript mixins

### Fixed:

* Fixed issue with Typescript mixins
* Refactor and improve unit tests.

# 1.0.0

First release.