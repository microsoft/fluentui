import * as React from 'react';
import { Separator } from '../Separator';

export class SeparatorBasicExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const message = 'Today';

    return <Separator message={message} />;
  }
}
