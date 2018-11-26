// @codepen
import * as React from 'react';
import { VerticalStack, HorizontalStack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary
      },

      item: {
        color: DefaultPalette.white,
        background: DefaultPalette.themePrimary,
        padding: 5
      }
    });

    return (
      <VerticalStack gap={5}>
        <span>Default horizontal stack</span>
        <HorizontalStack className={styles.root}>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </HorizontalStack>

        <span>Horizontal gap between items</span>
        <HorizontalStack gap={10} padding={10} className={styles.root}>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </HorizontalStack>

        <span>Item alignments</span>
        <HorizontalStack gap={5} padding={10} className={styles.root} styles={{ root: { height: 100 } }}>
          <HorizontalStack.Item align="auto" className={styles.item}>
            <span>Auto-aligned item</span>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="stretch" className={styles.item}>
            <span>Stretch-aligned item</span>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="baseline" className={styles.item}>
            <span>Baseline-aligned item</span>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="start" className={styles.item}>
            <span>Start-aligned item</span>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="center" className={styles.item}>
            <span>Center-aligned item</span>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="end" className={styles.item}>
            <span>End-aligned item</span>
          </HorizontalStack.Item>
        </HorizontalStack>

        <span>Clickable stack</span>
        <HorizontalStack onClick={this._onClick} padding={10} className={styles.root}>
          <span>Click inside this box</span>
        </HorizontalStack>
      </VerticalStack>
    );
  }

  private _onClick = (): void => {
    alert('Clicked HorizontalStack');
  };
}
