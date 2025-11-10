import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-deprecated
export type IRefObject<T> = React.MutableRefObject<T | null> | RefObject<T | null> | ((ref: T | null) => void);

export type RefObject<T> = {
  (component: T | null): void;
  current: T | null;
};
