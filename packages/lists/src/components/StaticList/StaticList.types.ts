import * as React from 'react';
interface IStaticListProps<T> {
  as?: keyof JSX.IntrinsicElements;
  items?: ReadonlyArray<T>;
  children?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export { IStaticListProps };
