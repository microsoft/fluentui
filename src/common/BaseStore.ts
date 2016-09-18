let _instanceId = 0;

export class BaseStore {
  private _callbacks: {
    [key: string]: () => void;
  };

  constructor() {
    this._callbacks = {};
  }

  public subscribe(onChange: () => void): () => void {
    let id = _instanceId++;

    this._callbacks[id] = onChange;

    return () => delete this._callbacks[id];
  }

  protected emitChange() {
    for (let id in this._callbacks) {
      if (this._callbacks.hasOwnProperty(id)) {
        this._callbacks[id]();
      }
    }
  }
}
