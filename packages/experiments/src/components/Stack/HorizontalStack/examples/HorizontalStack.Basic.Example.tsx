import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackBasicExample extends React.Component<{}, {}> {
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
        <Text>Default horizontal stack</Text>
        <HorizontalStack className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Horizontal gap between items</Text>
        <HorizontalStack gap={10} padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </HorizontalStack>

        <Text>Item alignments</Text>
        <HorizontalStack gap={5} padding={padding} className={styles.root} styles={{ root: { height: 100 } }}>
          <HorizontalStack.Item align="auto" className={styles.item}>
            <Text>Auto-aligned item</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="stretch" className={styles.item}>
            <Text>Stretch-aligned item</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="baseline" className={styles.item}>
            <Text>Baseline-aligned item</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="start" className={styles.item}>
            <Text>Start-aligned item</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="center" className={styles.item}>
            <Text>Center-aligned item</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item align="end" className={styles.item}>
            <Text>End-aligned item</Text>
          </HorizontalStack.Item>
        </HorizontalStack>

        <Text>Clickable stack</Text>
        <HorizontalStack onClick={this._onClick} padding={padding} className={styles.root}>
          <Text>Click me</Text>
        </HorizontalStack>
      </VerticalStack>
    );
  }

  private _onClick = (): void => {
    alert('Clicked HorizontalStack');
  };
}
