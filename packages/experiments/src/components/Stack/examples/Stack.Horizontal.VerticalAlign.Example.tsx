import * as React from 'react';
import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles } from 'office-ui-fabric-react';

export interface IStackHorizontalVerticalAlignExampleProps {
  theme?: ITheme;
}

@customizable('StackHorizontalVerticalAlignExample', ['theme'])
export class StackHorizontalVerticalAlignExample extends React.Component<
  IStackHorizontalVerticalAlignExampleProps,
  {}
> {
  constructor(props: IStackHorizontalVerticalAlignExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const padding = 10;

    const expandedHeightStyle = mergeStyles({
      height: 100
    });

    const { theme } = this.props;
    const { palette } = theme!;
    const style = mergeStyles({
      background: palette.neutralTertiary
    });

    const items = this._renderItems();

    return (
      <VerticalStack gap={5}>
        <Text>Top-aligned</Text>
        <div className={expandedHeightStyle}>
          <HorizontalStack verticalAlign="top" fillVertical gap={10} padding={padding} className={style}>
            {items}
          </HorizontalStack>
        </div>

        <Text>Vertically centered</Text>
        <div className={expandedHeightStyle}>
          <HorizontalStack verticalAlign="center" fillVertical gap={10} padding={padding} className={style}>
            {items}
          </HorizontalStack>
        </div>

        <Text>Bottom-aligned</Text>
        <div className={expandedHeightStyle}>
          <HorizontalStack verticalAlign="bottom" fillVertical gap={10} padding={padding} className={style}>
            {items}
          </HorizontalStack>
        </div>
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
