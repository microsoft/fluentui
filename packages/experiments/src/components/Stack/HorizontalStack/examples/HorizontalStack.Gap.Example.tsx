import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackGapExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary
      },

      item: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white
      }
    });

    return (
      <VerticalStack gap={5}>
        <Text>Numerical gap</Text>
        <HorizontalStack className={styles.root} gap={10}>
          <Text className={styles.item}>1</Text>
          <Text className={styles.item}>2</Text>
          <Text className={styles.item}>3</Text>
        </HorizontalStack>

        <Text>Custom string gap</Text>
        <HorizontalStack className={styles.root} gap="5vw">
          <Text className={styles.item}>1</Text>
          <Text className={styles.item}>2</Text>
          <Text className={styles.item}>3</Text>
        </HorizontalStack>

        <Text>Themed gap (extra small)</Text>
        <HorizontalStack className={styles.root} gap="s2">
          <Text className={styles.item}>1</Text>
          <Text className={styles.item}>2</Text>
          <Text className={styles.item}>3</Text>
        </HorizontalStack>

        <Text>Themed gap (small)</Text>
        <HorizontalStack className={styles.root} gap="s1">
          <Text className={styles.item}>1</Text>
          <Text className={styles.item}>2</Text>
          <Text className={styles.item}>3</Text>
        </HorizontalStack>

        <Text>Themed gap (medium)</Text>
        <HorizontalStack className={styles.root} gap="m">
          <Text className={styles.item}>1</Text>
          <Text className={styles.item}>2</Text>
          <Text className={styles.item}>3</Text>
        </HorizontalStack>

        <Text>Themed gap (large)</Text>
        <HorizontalStack className={styles.root} gap="l1">
          <Text className={styles.item}>1</Text>
          <Text className={styles.item}>2</Text>
          <Text className={styles.item}>3</Text>
        </HorizontalStack>

        <Text>Themed gap (extra large)</Text>
        <HorizontalStack className={styles.root} gap="l2">
          <Text className={styles.item}>1</Text>
          <Text className={styles.item}>2</Text>
          <Text className={styles.item}>3</Text>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
