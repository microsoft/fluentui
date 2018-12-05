// @codepen
import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: 250,
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
      <Stack gap={10}>
        <Stack horizontal gap={30} horizontalAlignment="space-between">
          <Stack grow>
            <span>Top-aligned</span>
            <Stack verticalAlignment="top" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Vertically centered</span>
            <Stack verticalAlignment="center" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Bottom-aligned</span>
            <Stack verticalAlignment="bottom" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal gap={30} horizontalAlignment="space-between">
          <Stack grow>
            <span>Vertical space around items</span>
            <Stack verticalAlignment="space-around" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Vertical space between items</span>
            <Stack verticalAlignment="space-between" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Items vertically evenly spaced</span>
            <Stack verticalAlignment="space-evenly" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
