import * as React from 'react';
import { StaticList } from './StaticList';

class StaticListExample extends React.PureComponent<{}, { items: number[] }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      items: new Array(25).fill(0)
    };
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return <StaticList items={items}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>;
  }
}

export { StaticListExample };
