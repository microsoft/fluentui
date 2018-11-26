import * as React from 'react';
import { VerticalStack, HorizontalStack } from 'office-ui-fabric-react/lib/Stack';
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
            <span>Top-aligned</span>
            <VerticalStack verticalAlign="top" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack grow>
            <span>Vertically centered</span>
            <VerticalStack verticalAlign="center" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack grow>
            <span>Bottom-aligned</span>
            <VerticalStack verticalAlign="bottom" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>

        <HorizontalStack gap={30} horizontalAlign="space-between">
          <VerticalStack grow>
            <span>Vertical space around items</span>
            <VerticalStack verticalAlign="space-around" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack grow>
            <span>Vertical space between items</span>
            <VerticalStack verticalAlign="space-between" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </VerticalStack>
          </VerticalStack>

          <VerticalStack grow>
            <span>Items vertically evenly spaced</span>
            <VerticalStack verticalAlign="space-evenly" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
