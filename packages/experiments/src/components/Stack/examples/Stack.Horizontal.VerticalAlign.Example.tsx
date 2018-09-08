import * as React from 'react';
import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles } from 'office-ui-fabric-react';

export interface IStackExampleProps {
  theme?: ITheme;
}

@customizable('StackHorizontalVerticalAlignExample', ['theme'])
export class StackHorizontalVerticalAlignExample extends React.Component<IStackExampleProps, {}> {
  constructor(props: IStackExampleProps) {
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

    return (
      <VerticalStack gap={5}>
        <Text size="xSmall">Top-aligned</Text>
        <div className={expandedHeightStyle}>
          <HorizontalStack verticalAlign="top" fillVertical gap={10} padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </HorizontalStack>
        </div>

        <Text size="xSmall">Vertically centered</Text>
        <div className={expandedHeightStyle}>
          <HorizontalStack verticalAlign="center" fillVertical gap={10} padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </HorizontalStack>
        </div>

        <Text size="xSmall">Bottom-aligned</Text>
        <div className={expandedHeightStyle}>
          <HorizontalStack verticalAlign="bottom" fillVertical gap={10} padding={padding} className={style}>
            <Text size="mini">Item One</Text>
            <Text size="mini">Item Two</Text>
            <Text size="mini">Item Three</Text>
          </HorizontalStack>
        </div>
      </VerticalStack>
    );
  }
}
