// @codepen
import * as React from 'react';
import { VerticalStack, HorizontalStack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: 100,
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
        <span>Top-aligned</span>
        <HorizontalStack verticalAlign="top" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>

        <span>Vertically centered</span>
        <HorizontalStack verticalAlign="center" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>

        <span>Bottom-aligned</span>
        <HorizontalStack verticalAlign="bottom" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
