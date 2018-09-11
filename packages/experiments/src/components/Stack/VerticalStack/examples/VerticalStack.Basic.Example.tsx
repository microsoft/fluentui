import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const padding = 10;

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary
      },

      item: {
        background: `${DefaultPalette.white}55`,
        border: `1px solid ${DefaultPalette.neutralPrimary}`
      }
    });

    return (
      <VerticalStack gap={5}>
        <Text>Default vertical stack</Text>
        <VerticalStack className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </VerticalStack>

        <Text>Vertical gap between items</Text>
        <VerticalStack gap={10} padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </VerticalStack>

        <Text>Item alignments</Text>
        <VerticalStack gap={5} padding={padding} className={styles.root}>
          <VerticalStack.Item align="auto" className={styles.item}>
            <Text>Auto-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="stretch" className={styles.item}>
            <Text>Stretch-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="baseline" className={styles.item}>
            <Text>Baseline-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="start" className={styles.item}>
            <Text>Start-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="center" className={styles.item}>
            <Text>Center-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="end" className={styles.item}>
            <Text>End-aligned item</Text>
          </VerticalStack.Item>
        </VerticalStack>

        <Text>Clickable stack</Text>
        <VerticalStack onClick={this._onClick} padding={padding} className={styles.root}>
          <Text>Click me</Text>
        </VerticalStack>
      </VerticalStack>
    );
  }

  private _onClick = (): void => {
    alert('Clicked VerticalStack');
  };
}
