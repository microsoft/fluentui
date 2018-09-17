import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackHorizontalAlignExample extends React.Component<{}, {}> {
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
        <Text>Left-aligned</Text>
        <VerticalStack horizontalAlign="left" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
        </VerticalStack>

        <Text>Horizontally centered</Text>
        <VerticalStack horizontalAlign="center" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
        </VerticalStack>

        <Text>Right-aligned</Text>
        <VerticalStack horizontalAlign="right" className={styles.root}>
          <Text>1</Text>
          <Text>2</Text>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
