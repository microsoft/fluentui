import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackGapExample extends React.Component<{}, {}> {
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
      <VerticalStack gap={10}>
        <HorizontalStack gap={50}>
          <VerticalStack>
            <Text>Numerical gap</Text>
            <VerticalStack className={styles.root} gap={10}>
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Custom string gap</Text>
            <VerticalStack className={styles.root} gap="5vh">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack horizontalAlign="space-between">
          <VerticalStack>
            <Text>Themed gap (extra small)</Text>
            <VerticalStack className={styles.root} gap="s2">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Themed gap (small)</Text>
            <VerticalStack className={styles.root} gap="s1">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Themed gap (medium)</Text>
            <VerticalStack className={styles.root} gap="m">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Themed gap (large)</Text>
            <VerticalStack className={styles.root} gap="l1">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Themed gap (extra large)</Text>
            <VerticalStack className={styles.root} gap="l2">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
