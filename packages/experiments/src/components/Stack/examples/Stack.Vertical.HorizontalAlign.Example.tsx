import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles } from 'office-ui-fabric-react';

export interface IStackVerticalHorizontalAlignExampleProps {
  theme?: ITheme;
}

@customizable('StackVerticalHorizontalAlignExample', ['theme'])
export class StackVerticalHorizontalAlignExample extends React.Component<
  IStackVerticalHorizontalAlignExampleProps,
  {}
> {
  constructor(props: IStackVerticalHorizontalAlignExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const padding = 10;

    const { theme } = this.props;
    const { palette } = theme!;
    const style = mergeStyles({
      background: palette.themeTertiary
    });

    const items = this._renderItems();

    return (
      <VerticalStack gap={5}>
        <Text>Left-aligned</Text>
        <VerticalStack horizontalAlign="left" padding={padding} className={style}>
          {items}
        </VerticalStack>

        <Text>Horizontally centered</Text>
        <VerticalStack horizontalAlign="center" padding={padding} className={style}>
          {items}
        </VerticalStack>

        <Text>Right-aligned</Text>
        <VerticalStack horizontalAlign="right" padding={padding} className={style}>
          {items}
        </VerticalStack>
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
