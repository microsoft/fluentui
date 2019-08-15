import * as React from 'react';
import { IStaticListProps } from './StaticList.types';

function defaultRowRenderer<T>(item: T, index: number): JSX.Element {
  return <li key={index}>{item}</li>;
}

class StaticList<T> extends React.Component<IStaticListProps<T>> {
  public render(): JSX.Element {
    const { items = [], as: RootTag = 'ul', className, children = defaultRowRenderer } = this.props;

    return <RootTag className={className}>{items.map(children)}</RootTag>;
  }
}

export { StaticList };
