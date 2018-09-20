import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackSpacingExample extends React.Component<{}, {}> {
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
            <Text>Numerical spacing</Text>
            <VerticalStack className={styles.root} gap={10} padding={10}>
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Custom spacing</Text>
            <VerticalStack className={styles.root} gap="20%" padding="m 40px">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack horizontalAlign="space-between">
          <VerticalStack>
            <Text>Themed spacing (extra small)</Text>
            <VerticalStack className={styles.root} gap="s2" padding="s2">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Themed spacing (small)</Text>
            <VerticalStack className={styles.root} gap="s1" padding="s2">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Themed spacing (medium)</Text>
            <VerticalStack className={styles.root} gap="m" padding="m">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Themed spacing (large)</Text>
            <VerticalStack className={styles.root} gap="l1" padding="l1">
              <Text className={styles.item}>1</Text>
              <Text className={styles.item}>2</Text>
              <Text className={styles.item}>3</Text>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <Text>Themed spacing (extra large)</Text>
            <VerticalStack className={styles.root} gap="l2" padding="l2">
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
