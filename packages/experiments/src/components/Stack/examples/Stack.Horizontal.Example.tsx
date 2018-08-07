import * as React from 'react';
import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles } from 'office-ui-fabric-react';

export interface IStackHorizontalExampleProps {
  theme?: ITheme;
}

@customizable('StackHorizontalExample', ['theme'])
export class StackHorizontalExample extends React.Component<IStackHorizontalExampleProps, {}> {
  constructor(props: IStackHorizontalExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const padding = 20;

    const { theme } = this.props;
    const { palette } = theme!;
    const style = mergeStyles({
      background: palette.neutralTertiary
    });

    const items = this._renderItems();

    return (
      <VerticalStack gap={5}>
        <Text>Default horizontal stack</Text>
        <HorizontalStack padding={padding} className={style}>
          {items}
        </HorizontalStack>

        <Text>Horizontal gap between items</Text>
        <HorizontalStack gap={10} padding={padding} className={style}>
          {items}
        </HorizontalStack>
      </VerticalStack>
    );
  }

  private _renderItems(): JSX.Element[] {
    return [
      <Text size="tiny" key={1}>
        Item One
      </Text>,
      <Text size="tiny" key={2}>
        Item Two
      </Text>,
      <Text size="tiny" key={3}>
        Item Three
      </Text>
    ];
  }
}
