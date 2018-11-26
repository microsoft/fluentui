import * as React from 'react';
import { VerticalStack, HorizontalStack } from 'office-ui-fabric-react/lib/Stack';
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
        <span>Left-aligned</span>
        <HorizontalStack horizontalAlign="left" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>

        <span>Horizontally centered</span>
        <HorizontalStack horizontalAlign="center" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>

        <span>Right-aligned</span>
        <HorizontalStack horizontalAlign="right" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>

        <span>Horizontal space around items</span>
        <HorizontalStack horizontalAlign="space-around" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>

        <span>Horizontal space between items</span>
        <HorizontalStack horizontalAlign="space-between" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>

        <span>Items horizontally evenly spaced</span>
        <HorizontalStack horizontalAlign="space-evenly" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
