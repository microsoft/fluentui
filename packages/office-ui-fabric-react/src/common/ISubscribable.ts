import { IDisposable } from './IDisposable';

export interface IEmptyFunction {
  (): void;
}

export interface ISubscribable {
  subscribe: (onChange: IEmptyFunction) => (IDisposable | IEmptyFunction);
}
