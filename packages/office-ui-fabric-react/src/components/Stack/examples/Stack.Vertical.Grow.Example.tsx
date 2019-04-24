import * as React from 'react';
import { Stack } from '../Stack';
import { IStackTokens } from '../Stack.types';
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

    const stackTokens: IStackTokens = { childrenGap: 5 };
    const tenPaddingTokens: IStackTokens = { padding: 10 };

    return (
      <Stack tokens={stackTokens}>
        <Stack className={styles.root} tokens={{ ...stackTokens, ...tenPaddingTokens }}>
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
