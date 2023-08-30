export type EventArgs<T> = { key: string; sheet: T };
export type EventHandler<T> = (args: EventArgs<T>) => void;

export class EventMap<K, V> {
  private _events: Map<string, EventHandler<V>[]>;
  private _self: Map<K, V>;

  constructor() {
    this._self = new Map<K, V>();
    this._events = new Map<string, EventHandler<V>[]>();
  }

  public get(key: K) {
    return this._self.get(key);
  }

  public set(key: K, value: V) {
    this._self.set(key, value);
  }

  public has(key: K) {
    return this._self.has(key);
  }

  public forEach(callback: (value: V, key: K, map: Map<K, V>) => void) {
    this._self.forEach(callback);
  }

  public raise(type: string, data: EventArgs<V>) {
    const handlers = this._events.get(type);
    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      handler?.(data);
    }
  }

  public on(type: string, callback: EventHandler<V>) {
    const handlers = this._events.get(type);
    if (!handlers) {
      this._events.set(type, [callback]);
    } else {
      handlers.push(callback);
    }
  }

  public off(type: string, callback: EventHandler<V>) {
    const handlers = this._events.get(type);
    if (handlers) {
      const index = handlers.indexOf(callback);
      if (index >= 0) {
        handlers.splice(index, 1);
      }
    }
  }
}
