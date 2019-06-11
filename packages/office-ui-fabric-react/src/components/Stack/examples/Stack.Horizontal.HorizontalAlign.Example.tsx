import * as React from 'react';
import { mergeStyleSets, DefaultPalette, IStackTokens, Stack } from 'office-ui-fabric-react';

export class HorizontalStackHorizontalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary
      },

      item: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white
      }
    });

    const stackTokens: IStackTokens = { childrenGap: 5 };

    return (
      <Stack tokens={stackTokens}>
        <span>Left-aligned</span>
        <Stack horizontal horizontalAlign="start" className={styles.root}>
          <span className={styles.item}>1</span>
          <span className={styles.item}>2</span>
          <span className={styles.item}>3</span>
        </Stack>

        <span>Horizontally centered</span>
        <Stack horizontal horizontalAlign="center" className={styles.root}>
          <span className={styles.item}>1</span>
          <span className={styles.item}>2</span>
          <span className={styles.item}>3</span>
        </Stack>

        <span>Right-aligned</span>
        <Stack horizontal horizontalAlign="end" className={styles.root}>
          <span className={styles.item}>1</span>
          <span className={styles.item}>2</span>
          <span className={styles.item}>3</span>
        </Stack>

        <span>Horizontal space around items</span>
        <Stack horizontal horizontalAlign="space-around" className={styles.root}>
          <span className={styles.item}>1</span>
          <span className={styles.item}>2</span>
          <span className={styles.item}>3</span>
        </Stack>

        <span>Horizontal space between items</span>
        <Stack horizontal horizontalAlign="space-between" className={styles.root}>
          <span className={styles.item}>1</span>
          <span className={styles.item}>2</span>
          <span className={styles.item}>3</span>
        </Stack>

        <span>Items horizontally evenly spaced</span>
        <Stack horizontal horizontalAlign="space-evenly" className={styles.root}>
          <span className={styles.item}>1</span>
          <span className={styles.item}>2</span>
          <span className={styles.item}>3</span>
        </Stack>
      </Stack>
    );
  }
}
