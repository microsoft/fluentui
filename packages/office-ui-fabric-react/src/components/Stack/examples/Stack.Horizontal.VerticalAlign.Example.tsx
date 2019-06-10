import * as React from 'react';
import { mergeStyleSets, DefaultPalette, IStackTokens, Stack } from 'office-ui-fabric-react';

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

    const stackTokens: IStackTokens = { childrenGap: 5 };

    return (
      <Stack tokens={stackTokens}>
        <span>Top-aligned</span>
        <Stack horizontal verticalAlign="start" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Vertically centered</span>
        <Stack horizontal verticalAlign="center" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Bottom-aligned</span>
        <Stack horizontal verticalAlign="end" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>
      </Stack>
    );
  }
}
