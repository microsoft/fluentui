import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackSpacingExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        width: 300,
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
        <HorizontalStack horizontalAlign="space-between">
          <VerticalStack>
            <Text>Numerical spacing</Text>
            <HorizontalStack className={styles.root} gap={10} padding={10}>
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack>
            <Text>Custom spacing</Text>
            <HorizontalStack className={styles.root} gap="10%" padding="s1 15%">
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </HorizontalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack horizontalAlign="space-between">
          <VerticalStack>
            <Text>Themed spacing (extra small)</Text>
            <HorizontalStack className={styles.root} gap="s2" padding="s2">
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack>
            <Text>Themed spacing (small)</Text>
            <HorizontalStack className={styles.root} gap="s1" padding="s1">
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack>
            <Text>Themed spacing (medium)</Text>
            <HorizontalStack className={styles.root} gap="m" padding="m">
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </HorizontalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack horizontalAlign="space-between">
          <VerticalStack>
            <Text>Themed spacing (large)</Text>
            <HorizontalStack className={styles.root} gap="l1" padding="l1">
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack>
            <Text>Themed spacing (extra large)</Text>
            <HorizontalStack className={styles.root} gap="l2" padding="l2">
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
            </HorizontalStack>
          </VerticalStack>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
