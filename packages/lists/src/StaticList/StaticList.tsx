import * as React from 'react';

interface IList<T> {
  items?: T[];
  children: (item: T, index: number) => React.ReactNode;
}

class StaticList<T> extends React.PureComponent<IList<T>> {
  public render = () => {
    const { items = [], children } = this.props;

    return <ul>{items.map((item: T, index: number) => children(item, index))}</ul>;
  };
}

export { StaticList };
