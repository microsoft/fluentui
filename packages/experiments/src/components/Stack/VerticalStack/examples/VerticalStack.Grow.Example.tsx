import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackGrowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: 250
      },

      item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white
      }
    });

    return (
      <VerticalStack gap={5}>
        <VerticalStack gap={5} padding={10} className={styles.root}>
          <VerticalStack.Item grow={3} className={styles.item}>
            Grow is 3
          </VerticalStack.Item>
          <VerticalStack.Item grow={2} className={styles.item}>
            Grow is 2
          </VerticalStack.Item>
          <VerticalStack.Item grow className={styles.item}>
            Grow is 1
          </VerticalStack.Item>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
