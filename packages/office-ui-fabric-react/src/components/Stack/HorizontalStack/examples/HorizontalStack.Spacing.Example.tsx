import * as React from 'react';
import { VerticalStack, HorizontalStack } from 'office-ui-fabric-react/lib/Stack';
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
            <span>Numerical spacing</span>
            <HorizontalStack className={styles.root} gap={10} padding={10}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack>
            <span>Custom spacing</span>
            <HorizontalStack className={styles.root} gap="10%" padding="s1 15%">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </HorizontalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack horizontalAlign="space-between">
          <VerticalStack>
            <span>Themed spacing (extra small)</span>
            <HorizontalStack className={styles.root} gap="s2" padding="s2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack>
            <span>Themed spacing (small)</span>
            <HorizontalStack className={styles.root} gap="s1" padding="s1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack>
            <span>Themed spacing (medium)</span>
            <HorizontalStack className={styles.root} gap="m" padding="m">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </HorizontalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack horizontalAlign="space-between">
          <VerticalStack>
            <span>Themed spacing (large)</span>
            <HorizontalStack className={styles.root} gap="l1" padding="l1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack>
            <span>Themed spacing (extra large)</span>
            <HorizontalStack className={styles.root} gap="l2" padding="l2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </HorizontalStack>
          </VerticalStack>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
