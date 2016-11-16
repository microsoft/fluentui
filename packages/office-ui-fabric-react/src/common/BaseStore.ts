import { ISubscribable } from './ISubscribable';
import { IDisposable } from './IDisposable';

let _instanceId = 0;

export class BaseStore implements ISubscribable {
  private _callbacks: {
    [key: string]: () => void;
  };

  constructor() {
    this._callbacks = {};
  }

  public subscribe(onChange: () => void): IDisposable {
    let id = _instanceId++;

    this._callbacks[id] = onChange;

    return { dispose: () => delete this._callbacks[id] };
  }

  protected emitChange() {
    for (let id in this._callbacks) {
      if (this._callbacks.hasOwnProperty(id)) {
        this._callbacks[id]();
      }
    }
  }
}
