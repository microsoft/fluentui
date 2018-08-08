import * as React from 'react';
import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles } from 'office-ui-fabric-react';

export interface IStackHorizontalAlignExampleProps {
  theme?: ITheme;
}

@customizable('StackHorizontalAlignExample', ['theme'])
export class StackHorizontalAlignExample extends React.Component<IStackHorizontalAlignExampleProps, {}> {
  constructor(props: IStackHorizontalAlignExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const padding = 10;

    const { theme } = this.props;
    const { palette } = theme!;
    const style = mergeStyles({
      background: palette.neutralTertiary
    });

    const items = this._renderItems();

    return (
      <VerticalStack gap={5}>
        <Text>Left-aligned</Text>
        <HorizontalStack horizontalAlign="left" gap={10} padding={padding} className={style}>
          {items}
        </HorizontalStack>

        <Text>Horizontally centered</Text>
        <HorizontalStack horizontalAlign="center" gap={10} padding={padding} className={style}>
          {items}
        </HorizontalStack>

        <Text>Horizontally right-aligned</Text>
        <HorizontalStack horizontalAlign="right" gap={10} padding={padding} className={style}>
          {items}
        </HorizontalStack>

        <Text>Horizontal space around items</Text>
        <HorizontalStack horizontalAlign="space-around" padding={padding} className={style}>
          {items}
        </HorizontalStack>

        <Text>Horizontal space between items</Text>
        <HorizontalStack horizontalAlign="space-between" padding={padding} className={style}>
          {items}
        </HorizontalStack>

        <Text>Items horizontally evenly spaced</Text>
        <HorizontalStack horizontalAlign="space-evenly" padding={padding} className={style}>
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
