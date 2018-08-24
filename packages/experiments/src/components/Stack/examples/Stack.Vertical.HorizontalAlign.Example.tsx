import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles } from 'office-ui-fabric-react';

export interface IStackExampleProps {
  theme?: ITheme;
}

@customizable('StackVerticalHorizontalAlignExample', ['theme'])
export class StackVerticalHorizontalAlignExample extends React.Component<IStackExampleProps, {}> {
  constructor(props: IStackExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const padding = 10;

    const { theme } = this.props;
    const { palette } = theme!;
    const style = mergeStyles({
      background: palette.themeTertiary
    });

    return (
      <VerticalStack gap={5}>
        <Text size="xSmall">Left-aligned</Text>
        <VerticalStack horizontalAlign="left" padding={padding} className={style}>
          <Text size="mini">Item One</Text>
          <Text size="mini">Item Two</Text>
          <Text size="mini">Item Three</Text>
        </VerticalStack>

        <Text size="xSmall">Horizontally centered</Text>
        <VerticalStack horizontalAlign="center" padding={padding} className={style}>
          <Text size="mini">Item One</Text>
          <Text size="mini">Item Two</Text>
          <Text size="mini">Item Three</Text>
        </VerticalStack>

        <Text size="xSmall">Right-aligned</Text>
        <VerticalStack horizontalAlign="right" padding={padding} className={style}>
          <Text size="mini">Item One</Text>
          <Text size="mini">Item Two</Text>
          <Text size="mini">Item Three</Text>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
