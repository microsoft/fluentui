import { IStoreKey } from './storeKey';
import { ISubscribable } from './ISubscribable';
import { assign } from '../Utilities';

export class StoreSet {
  private _stores: {
    [ key: string]: any;
  };

  constructor() {
    this._stores = {};
  }

  public add<T extends ISubscribable>(key: IStoreKey<T>, value: T): StoreSet {
    this._stores[key.name] = value;
    return this;
  }

  public getStore<T extends ISubscribable>(key: IStoreKey<T>): T {
    return this._stores[key.name];
  }

  public merge(stores: StoreSet) {
    let mergedStoreSet = new StoreSet();

    mergedStoreSet._stores = assign({}, this._stores, stores);

    return mergedStoreSet;
  }
}