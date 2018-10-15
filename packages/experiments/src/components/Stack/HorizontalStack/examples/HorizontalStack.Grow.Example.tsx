import * as React from 'react';
import { HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackGrowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary
      },

      item: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: DefaultPalette.white,
        background: DefaultPalette.themePrimary
      }
    });

    return (
      <HorizontalStack gap={5} padding={10} className={styles.root}>
        <HorizontalStack.Item grow={3} className={styles.item}>
          Grow is 3
        </HorizontalStack.Item>
        <HorizontalStack.Item grow={2} className={styles.item}>
          Grow is 2
        </HorizontalStack.Item>
        <HorizontalStack.Item grow className={styles.item}>
          Grow is 1
        </HorizontalStack.Item>
      </HorizontalStack>
    );
  }
}
