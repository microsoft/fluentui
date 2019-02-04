// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackSpacingExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        width: 300,
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

    return (
      <Stack gap={10}>
        <Stack horizontal preventShrink horizontalAlign="space-between">
          <Stack>
            <span>Numerical spacing</span>
            <Stack horizontal className={styles.root} gap={10} padding={10}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
          <Stack>
            <span>Custom spacing</span>
            <Stack horizontal className={styles.root} gap="10%" padding="s1 15%">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal preventShrink horizontalAlign="space-between">
          <Stack>
            <span>Themed spacing (extra small)</span>
            <Stack horizontal className={styles.root} gap="s2" padding="s2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
          <Stack>
            <span>Themed spacing (small)</span>
            <Stack horizontal className={styles.root} gap="s1" padding="s1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
          <Stack>
            <span>Themed spacing (medium)</span>
            <Stack horizontal className={styles.root} gap="m" padding="m">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal horizontalAlign="space-between">
          <Stack>
            <span>Themed spacing (large)</span>
            <Stack horizontal className={styles.root} gap="l1" padding="l1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
          <Stack>
            <span>Themed spacing (extra large)</span>
            <Stack horizontal className={styles.root} gap="l2" padding="l2">
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
