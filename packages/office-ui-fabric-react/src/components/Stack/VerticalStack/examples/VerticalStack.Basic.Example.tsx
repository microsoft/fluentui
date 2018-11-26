// @codepen
import * as React from 'react';
import { VerticalStack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackBasicExample extends React.Component<{}, {}> {
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
        <span>Default vertical stack</span>
        <VerticalStack className={styles.root}>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </VerticalStack>

        <span>Vertical gap between items</span>
        <VerticalStack gap={10} padding={10} className={styles.root}>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </VerticalStack>

        <span>Item alignments</span>
        <VerticalStack gap={5} padding={10} className={styles.root}>
          <VerticalStack.Item align="auto" className={styles.item}>
            <span>Auto-aligned item</span>
          </VerticalStack.Item>
          <VerticalStack.Item align="stretch" className={styles.item}>
            <span>Stretch-aligned item</span>
          </VerticalStack.Item>
          <VerticalStack.Item align="baseline" className={styles.item}>
            <span>Baseline-aligned item</span>
          </VerticalStack.Item>
          <VerticalStack.Item align="start" className={styles.item}>
            <span>Start-aligned item</span>
          </VerticalStack.Item>
          <VerticalStack.Item align="center" className={styles.item}>
            <span>Center-aligned item</span>
          </VerticalStack.Item>
          <VerticalStack.Item align="end" className={styles.item}>
            <span>End-aligned item</span>
          </VerticalStack.Item>
        </VerticalStack>

        <span>Clickable stack</span>
        <VerticalStack onClick={this._onClick} padding={10} className={styles.root}>
          <span>Click inside this box</span>
        </VerticalStack>
      </VerticalStack>
    );
  }

  private _onClick = (): void => {
    alert('Clicked VerticalStack');
  };
}
