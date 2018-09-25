import * as React from 'react';
import { Separator } from '../Separator';

export class SeparatorBasicExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const message = 'Today';

    return (
      <div>
        <p>Center aligned</p>
        <Separator text={message} alignText="center" />
        <p>Left aligned</p>
        <Separator text={message} alignText="start" />
        <p>Right aligned</p>
        <Separator text={message} alignText="end" />
        <p>Vertical</p>
        <Separator vertical text={message} />
      </div>
    );
  }
}
