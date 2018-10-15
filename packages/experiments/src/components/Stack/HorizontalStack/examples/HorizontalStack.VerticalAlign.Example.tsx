import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
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
        <Text>Top-aligned</Text>
        <HorizontalStack verticalAlign="top" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>

        <Text>Vertically centered</Text>
        <HorizontalStack verticalAlign="center" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>

        <Text>Bottom-aligned</Text>
        <HorizontalStack verticalAlign="bottom" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HorizontalStack>
      </VerticalStack>
    );
  }
}
