import * as React from 'react';

interface IStaticListProps<T> {
  as?: keyof JSX.IntrinsicElements;
  items?: T[];
  children?: (item: T, index: number) => React.ReactNode;
}

function defaultRowRenderer<T>(item: T, index: number): JSX.Element {
  return <li key={index}>{item}</li>;
}

class StaticList<T> extends React.PureComponent<IStaticListProps<T>> {
  public render = () => {
    const { items = [], as: RootTag = 'ul', children = defaultRowRenderer } = this.props;

    return <RootTag>{items.map(children)}</RootTag>;
  };
}

export { StaticList, IStaticListProps };
