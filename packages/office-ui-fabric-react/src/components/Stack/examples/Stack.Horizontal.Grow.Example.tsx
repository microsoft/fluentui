// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
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
      <Stack horizontal gap={5} padding={10} className={styles.root}>
        <Stack.Item grow={3} className={styles.item}>
          Grow is 3
        </Stack.Item>
        <Stack.Item grow={2} className={styles.item}>
          Grow is 2
        </Stack.Item>
        <Stack.Item grow className={styles.item}>
          Grow is 1
        </Stack.Item>
      </Stack>
    );
  }
}
