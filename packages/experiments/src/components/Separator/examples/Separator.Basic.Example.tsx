import * as React from 'react';
import { Separator } from '../Separator';

export class SeparatorBasicExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const message = 'I am a separator';

    return <Separator message={message} />;
  }
}
