import * as React from 'react';

interface IList<T> {
  items?: T[];
}

class StaticList<T> extends React.PureComponent<IList<T>> {
  public render = () => {
    const { items = [] } = this.props;

    return (
      <ul>
        {items.map((_value: T, index: number) => {
          return <li key={index}>{`Item #${index}`}</li>;
        })}
      </ul>
    );
  };
}

export { StaticList };
