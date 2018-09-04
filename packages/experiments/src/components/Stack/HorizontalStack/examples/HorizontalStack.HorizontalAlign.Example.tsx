import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackHorizontalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const padding = 10;
    const gap = 10;

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary
      },

      expandedHeight: {
        height: 130
      }
    });

    return (
      <VerticalStack gap={5}>
        <Text>Left-aligned</Text>
        <HorizontalStack horizontalAlign="left" gap={gap} padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Horizontally centered</Text>
        <HorizontalStack horizontalAlign="center" gap={gap} padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Right-aligned</Text>
        <HorizontalStack horizontalAlign="right" gap={gap} padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Horizontal space around items</Text>
        <HorizontalStack horizontalAlign="space-around" padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Horizontal space between items</Text>
        <HorizontalStack horizontalAlign="space-between" padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Items horizontally evenly spaced</Text>
        <HorizontalStack horizontalAlign="space-evenly" padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
