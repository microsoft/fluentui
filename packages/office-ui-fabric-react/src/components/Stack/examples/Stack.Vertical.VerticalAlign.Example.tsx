import * as React from 'react';
import { mergeStyleSets, DefaultPalette, Stack } from 'office-ui-fabric-react';

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

    const tokens = {
      sectionStack: {
        childrenGap: 10
      },
      headingStack: {
        childrenGap: 30
      }
    };

    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack horizontal disableShrink tokens={tokens.headingStack} horizontalAlign="space-between">
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

        <Stack horizontal disableShrink tokens={tokens.headingStack} horizontalAlign="space-between">
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
