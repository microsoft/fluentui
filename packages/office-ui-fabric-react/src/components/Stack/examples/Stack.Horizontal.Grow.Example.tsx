import * as React from 'react';
import { mergeStyleSets, DefaultPalette, IStackTokens, Stack } from 'office-ui-fabric-react';

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

    const stackTokens: IStackTokens = { childrenGap: 5 };

    return (
      <Stack horizontal tokens={stackTokens} padding={10} className={styles.root}>
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
