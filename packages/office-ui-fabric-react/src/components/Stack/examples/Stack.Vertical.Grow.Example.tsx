// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
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
      <Stack gap={5}>
        <Stack gap={5} padding={10} className={styles.root}>
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
      </Stack>
    );
  }
}
