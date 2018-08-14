import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles } from 'office-ui-fabric-react';

export interface IStackVerticalExampleProps {
  theme?: ITheme;
}

@customizable('StackVerticalAlignExample', ['theme'])
export class StackVerticalAlignExample extends React.Component<IStackVerticalExampleProps, {}> {
  constructor(props: IStackVerticalExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const padding = 10;

    const expandedHeightStyle = mergeStyles({
      height: 130
    });

    const { theme } = this.props;
    const { palette } = theme!;
    const style = mergeStyles({
      background: palette.themeTertiary
    });

    return (
      <VerticalStack gap={5}>
        <Text size="xSmall">Top-aligned</Text>
        <div className={expandedHeightStyle}>
          <VerticalStack verticalAlign="top" fillVertical padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </VerticalStack>
        </div>

        <Text size="xSmall">Vertically centered</Text>
        <div className={expandedHeightStyle}>
          <VerticalStack verticalAlign="center" fillVertical padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </VerticalStack>
        </div>

        <Text size="xSmall">Bottom-aligned</Text>
        <div className={expandedHeightStyle}>
          <VerticalStack verticalAlign="bottom" fillVertical padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </VerticalStack>
        </div>

        <Text size="xSmall">Vertical space around items</Text>
        <div className={expandedHeightStyle}>
          <VerticalStack verticalAlign="space-around" fillVertical padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </VerticalStack>
        </div>

        <Text size="xSmall">Vertical space between items</Text>
        <div className={expandedHeightStyle}>
          <VerticalStack verticalAlign="space-between" fillVertical padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </VerticalStack>
        </div>

        <Text size="xSmall">Items vertically evenly spaced</Text>
        <div className={expandedHeightStyle}>
          <VerticalStack verticalAlign="space-evenly" fillVertical padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </VerticalStack>
        </div>
      </VerticalStack>
    );
  }
}
