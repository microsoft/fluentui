import * as React from 'react';

interface IStaticListProps<T> {
  as?: keyof JSX.IntrinsicElements;
  items?: T[];
  children: (item: T, index: number) => React.ReactNode;
}

class StaticList<T> extends React.PureComponent<IStaticListProps<T>> {
  public render = () => {
    const { items = [], as: RootTag = 'ul', children } = this.props;

    return <RootTag>{items.map((item: T, index: number) => children(item, index))}</RootTag>;
  };
}

export { StaticList, IStaticListProps as IList };
