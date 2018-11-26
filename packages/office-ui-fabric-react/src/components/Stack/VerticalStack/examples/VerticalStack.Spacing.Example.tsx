// @codepen
import * as React from 'react';
import { VerticalStack, HorizontalStack } from 'office-ui-fabric-react/lib/Stack';
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
            <span>Numerical spacing</span>
            <VerticalStack className={styles.root} gap={10} padding={10}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <span>Custom spacing</span>
            <VerticalStack className={styles.root} gap="20%" padding="m 40px">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack horizontalAlign="space-between">
          <VerticalStack>
            <span>Themed spacing (extra small)</span>
            <VerticalStack className={styles.root} gap="s2" padding="s2">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <span>Themed spacing (small)</span>
            <VerticalStack className={styles.root} gap="s1" padding="s2">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <span>Themed spacing (medium)</span>
            <VerticalStack className={styles.root} gap="m" padding="m">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <span>Themed spacing (large)</span>
            <VerticalStack className={styles.root} gap="l1" padding="l1">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack>
            <span>Themed spacing (extra large)</span>
            <VerticalStack className={styles.root} gap="l2" padding="l2">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
