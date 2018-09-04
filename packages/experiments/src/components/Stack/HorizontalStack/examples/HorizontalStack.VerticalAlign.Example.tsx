import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const padding = 10;
    const gap = 10;

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: 100
      }
    });

    return (
      <VerticalStack gap={5}>
        <Text>Top-aligned</Text>
        <HorizontalStack verticalAlign="top" gap={gap} padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Vertically centered</Text>
        <HorizontalStack verticalAlign="center" gap={gap} padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Bottom-aligned</Text>
        <HorizontalStack verticalAlign="bottom" gap={gap} padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
