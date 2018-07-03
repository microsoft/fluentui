import * as React from 'react';
import { Text } from '../Text';

export class TextBasicExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <div>
          <Text size="small" weight="bold">
            Small Text
          </Text>
        </div>
        <div>
          <Text size="medium">Medium Text</Text>
        </div>
        <div>
          <Text size="large">Large Text</Text>
        </div>
        <div>
          <Text size="xLarge">XLarge Text</Text>
        </div>
        <div>
          <Text size="mega" weight="bold">
            Mega Text
          </Text>
        </div>
      </div>
    );
  }
}
