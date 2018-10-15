import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: 250,
        selectors: {
          '> *': {
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: DefaultPalette.themePrimary,
            color: DefaultPalette.white
          }
        }
      }
    });

    return (
      <VerticalStack gap={10}>
        <HorizontalStack gap={30} horizontalAlign="space-between">
          <VerticalStack grow>
            <Text>Top-aligned</Text>
            <VerticalStack verticalAlign="top" className={styles.root}>
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack grow>
            <Text>Vertically centered</Text>
            <VerticalStack verticalAlign="center" className={styles.root}>
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack grow>
            <Text>Bottom-aligned</Text>
            <VerticalStack verticalAlign="bottom" className={styles.root}>
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack gap={30} horizontalAlign="space-between">
          <VerticalStack grow>
            <Text>Vertical space around items</Text>
            <VerticalStack verticalAlign="space-around" className={styles.root}>
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack grow>
            <Text>Vertical space between items</Text>
            <VerticalStack verticalAlign="space-between" className={styles.root}>
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack grow>
            <Text>Items vertically evenly spaced</Text>
            <VerticalStack verticalAlign="space-evenly" className={styles.root}>
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
