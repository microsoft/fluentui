// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackHorizontalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
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
      <Stack gap={5}>
        <span>Left-aligned</span>
        <Stack horizontal horizontalAlign="start" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Horizontally centered</span>
        <Stack horizontal horizontalAlign="center" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Right-aligned</span>
        <Stack horizontal horizontalAlign="end" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Horizontal space around items</span>
        <Stack horizontal horizontalAlign="space-around" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Horizontal space between items</span>
        <Stack horizontal horizontalAlign="space-between" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Items horizontally evenly spaced</span>
        <Stack horizontal horizontalAlign="space-evenly" className={styles.root}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>
      </Stack>
    );
  }
}
