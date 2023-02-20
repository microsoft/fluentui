import * as React from 'react';

// Mirror of the removed interface React.Props<T> since React 18
export interface IReactProps<T> {
  children?: React.ReactNode | undefined;
  key?: React.Key | undefined;
  ref?: React.LegacyRef<T> | undefined;
}
