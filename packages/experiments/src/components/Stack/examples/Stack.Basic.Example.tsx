import * as React from 'react';
import { Stack } from '../Stack';

export class StackBasicExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Stack>
        <div>Object 1</div>
        <div>Object 2</div>
        <div>Object 3</div>
      </Stack>
    );
  }
}
