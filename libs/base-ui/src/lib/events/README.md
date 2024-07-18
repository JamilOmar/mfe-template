## Event Service

Event service is a message bus used in publish/subscribe pattern for communication between services, components etc

EventService accepts keys of type `EventKey`.

### Define keys

```typescript
import { EventKey } from '@labshare/base-ui-services';

export const MyKeys = {
  title: new EventKey<string>('title'),
  pageDisabled: new EventKey<boolean>('pageDisabled'),
  date: new EventKey<Date>('date'),
};
```

### Usage

```typescript
import { EventService } from '@labshare/base-ui-services';

export class MyClass {
  constructor(private es: EventService) {

    // subscribe to events like to normal observables
    this.es.get(MyKeys.title).subscribe(v => this.updateTitle(v));

    // read BehaviorSubject value directly
    const disabled  = this.es.get(MyKeys.pageDisabled).value;

    // publish new value to the bus channel
    this.es.get(MyKeys.date).next(new Date());
}
```

### Filtering

EventService BehaviorSubject contains `undefined` value by default. When `undefined` value is undesirable, filter out
using `rxjs` operator `filter`:

```typescript
this.es
  .get(MyKeys.title)
  .pipe(filter((x) => x !== undefined))
  .subscribe((v) => this.updateTitle(v));
```
