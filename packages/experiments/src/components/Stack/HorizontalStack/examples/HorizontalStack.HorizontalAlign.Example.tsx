import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackHorizontalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
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
      <VerticalStack gap={5}>
        <Text>Left-aligned</Text>
        <HorizontalStack horizontalAlign="left" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>

        <Text>Horizontally centered</Text>
        <HorizontalStack horizontalAlign="center" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>

        <Text>Right-aligned</Text>
        <HorizontalStack horizontalAlign="right" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>

        <Text>Horizontal space around items</Text>
        <HorizontalStack horizontalAlign="space-around" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>

        <Text>Horizontal space between items</Text>
        <HorizontalStack horizontalAlign="space-between" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>

        <Text>Items horizontally evenly spaced</Text>
        <HorizontalStack horizontalAlign="space-evenly" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
