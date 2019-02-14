// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
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
        <Stack horizontal disableShrink gap={30} horizontalAlign="space-between">
          <Stack grow>
            <span>Top-aligned</span>
            <Stack verticalAlign="start" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Vertically centered</span>
            <Stack verticalAlign="center" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Bottom-aligned</span>
            <Stack verticalAlign="end" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal disableShrink gap={30} horizontalAlign="space-between">
          <Stack grow>
            <span>Vertical space around items</span>
            <Stack verticalAlign="space-around" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Vertical space between items</span>
            <Stack verticalAlign="space-between" className={styles.root}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Items vertically evenly spaced</span>
            <Stack verticalAlign="space-evenly" className={styles.root}>
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
