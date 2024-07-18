import { Injectable, OnDestroy } from '@angular/core';
import { Dictionary } from '../global.types';
import { ImmutableBehaviorSubject } from 'immutable-rxjs';
import { EventKey } from './event-key';
@Injectable({
  providedIn: 'platform',
})
export class EventService implements OnDestroy {
  public cache: Dictionary<ImmutableBehaviorSubject<any>> = {};

  public get<T = any>(key: EventKey<T> | string): ImmutableBehaviorSubject<T> {
    const pKey = (key as EventKey<T>).key || (key as string);

    if (!this.cache[pKey]) {
      this.cache[pKey] = new ImmutableBehaviorSubject<any>(undefined);
    }

    return this.cache[pKey] as ImmutableBehaviorSubject<T>;
  }

  ngOnDestroy() {
    Object.keys(this.cache).forEach((key) => {
      if (this.cache[key]) {
        this.cache[key].unsubscribe();
      }
    });
  }
}
