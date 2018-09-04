import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const padding = 10;

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
        <Text>Top-aligned</Text>
        <div className={styles.expandedHeight}>
          <VerticalStack verticalAlign="top" fillVertical padding={padding} className={styles.root}>
            <Text>Item One</Text>
            <Text>Item Two</Text>
            <Text>Item Three</Text>
          </VerticalStack>
        </div>

        <Text>Vertically centered</Text>
        <div className={styles.expandedHeight}>
          <VerticalStack verticalAlign="center" fillVertical padding={padding} className={styles.root}>
            <Text>Item One</Text>
            <Text>Item Two</Text>
            <Text>Item Three</Text>
          </VerticalStack>
        </div>

        <Text>Bottom-aligned</Text>
        <div className={styles.expandedHeight}>
          <VerticalStack verticalAlign="bottom" fillVertical padding={padding} className={styles.root}>
            <Text>Item One</Text>
            <Text>Item Two</Text>
            <Text>Item Three</Text>
          </VerticalStack>
        </div>

        <Text>Vertical space around items</Text>
        <div className={styles.expandedHeight}>
          <VerticalStack verticalAlign="space-around" fillVertical padding={padding} className={styles.root}>
            <Text>Item One</Text>
            <Text>Item Two</Text>
            <Text>Item Three</Text>
          </VerticalStack>
        </div>

        <Text>Vertical space between items</Text>
        <div className={styles.expandedHeight}>
          <VerticalStack verticalAlign="space-between" fillVertical padding={padding} className={styles.root}>
            <Text>Item One</Text>
            <Text>Item Two</Text>
            <Text>Item Three</Text>
          </VerticalStack>
        </div>

        <Text>Items vertically evenly spaced</Text>
        <div className={styles.expandedHeight}>
          <VerticalStack verticalAlign="space-evenly" fillVertical padding={padding} className={styles.root}>
            <Text>Item One</Text>
            <Text>Item Two</Text>
            <Text>Item Three</Text>
          </VerticalStack>
        </div>
      </VerticalStack>
    );
  }
}
