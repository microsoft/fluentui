import * as React from 'react';
import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles } from 'office-ui-fabric-react';

export interface IStackExampleProps {
  theme?: ITheme;
}

@customizable('StackHorizontalAlignExample', ['theme'])
export class StackHorizontalAlignExample extends React.Component<IStackExampleProps, {}> {
  constructor(props: IStackExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const padding = 10;

    const { theme } = this.props;
    const { palette } = theme!;
    const style = mergeStyles({
      background: palette.neutralTertiary
    });

    return (
      <VerticalStack gap={5}>
        <Text>Left-aligned</Text>
        <HorizontalStack horizontalAlign="left" gap={10} padding={padding} className={style}>
          <Text size="tiny">Item One</Text>
          <Text size="tiny">Item Two</Text>
          <Text size="tiny">Item Three</Text>
        </HorizontalStack>

        <Text>Horizontally centered</Text>
        <HorizontalStack horizontalAlign="center" gap={10} padding={padding} className={style}>
          <Text size="tiny">Item One</Text>
          <Text size="tiny">Item Two</Text>
          <Text size="tiny">Item Three</Text>
        </HorizontalStack>

        <Text>Horizontally right-aligned</Text>
        <HorizontalStack horizontalAlign="right" gap={10} padding={padding} className={style}>
          <Text size="tiny">Item One</Text>
          <Text size="tiny">Item Two</Text>
          <Text size="tiny">Item Three</Text>
        </HorizontalStack>

        <Text>Horizontal space around items</Text>
        <HorizontalStack horizontalAlign="space-around" padding={padding} className={style}>
          <Text size="tiny">Item One</Text>
          <Text size="tiny">Item Two</Text>
          <Text size="tiny">Item Three</Text>
        </HorizontalStack>

        <Text>Horizontal space between items</Text>
        <HorizontalStack horizontalAlign="space-between" padding={padding} className={style}>
          <Text size="tiny">Item One</Text>
          <Text size="tiny">Item Two</Text>
          <Text size="tiny">Item Three</Text>
        </HorizontalStack>

        <Text>Items horizontally evenly spaced</Text>
        <HorizontalStack horizontalAlign="space-evenly" padding={padding} className={style}>
          <Text size="tiny">Item One</Text>
          <Text size="tiny">Item Two</Text>
          <Text size="tiny">Item Three</Text>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
