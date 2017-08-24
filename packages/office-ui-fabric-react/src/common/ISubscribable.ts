import { IDisposable } from '../Utilities';

export interface IEmptyFunction {
  (): void;
}

export interface ISubscribable {
  subscribe: (onChange?: IEmptyFunction) => IDisposable;
}
