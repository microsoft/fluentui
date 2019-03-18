import * as React from 'react';
import { Stack } from '../Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackSpacingExample extends React.Component<{}, {}> {
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

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack horizontal disableShrink tokens={{ childrenGap: 50 }}>
          <Stack>
            <span>Numerical spacing</span>
            <Stack className={styles.root} tokens={{ childrenGap: 10 }} padding={10}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Custom spacing</span>
            <Stack className={styles.root} tokens={{ childrenGap: '20%' }} padding="m 40px">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal disableShrink horizontalAlign="space-between">
          <Stack>
            <span>Themed spacing (extra small)</span>
            <Stack className={styles.root} tokens={{ childrenGap: 's2' }} padding="s2">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (small)</span>
            <Stack className={styles.root} tokens={{ childrenGap: 's1' }} padding="s2">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (medium)</span>
            <Stack className={styles.root} tokens={{ childrenGap: 'm' }} padding="m">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (large)</span>
            <Stack className={styles.root} tokens={{ childrenGap: 'l1' }} padding="l1">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (extra large)</span>
            <Stack className={styles.root} tokens={{ childrenGap: 'l2' }} padding="l2">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
