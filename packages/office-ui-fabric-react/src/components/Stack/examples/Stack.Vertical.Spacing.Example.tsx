import * as React from 'react';
import { mergeStyleSets, DefaultPalette, Stack } from 'office-ui-fabric-react';

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

    const tokens = {
      sectionStack: {
        childrenGap: 50
      },
      numericalSpacing: {
        childrenGap: 10
      },
      customSpacing: {
        childrenGap: '20%'
      },
      themedExtraSmall: {
        childrenGap: 's2'
      },
      themedSmall: {
        childrenGap: 's1'
      },
      themedMedium: {
        childrenGap: 'm'
      },
      themedLarge: {
        childrenGap: 'l1'
      },
      themedExtraLarge: {
        childrenGap: 'l2'
      }
    };

    return (
      <Stack tokens={tokens.numericalSpacing}>
        <Stack horizontal disableShrink tokens={tokens.sectionStack}>
          <Stack>
            <span>Numerical spacing</span>
            <Stack className={styles.root} tokens={tokens.numericalSpacing} padding={10}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Custom spacing</span>
            <Stack className={styles.root} tokens={tokens.customSpacing} padding="m 40px">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal disableShrink horizontalAlign="space-between">
          <Stack>
            <span>Themed spacing (extra small)</span>
            <Stack className={styles.root} tokens={tokens.themedExtraSmall} padding="s2">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (small)</span>
            <Stack className={styles.root} tokens={tokens.themedSmall} padding="s2">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (medium)</span>
            <Stack className={styles.root} tokens={tokens.themedMedium} padding="m">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (large)</span>
            <Stack className={styles.root} tokens={tokens.themedLarge} padding="l1">
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (extra large)</span>
            <Stack className={styles.root} tokens={tokens.themedExtraLarge} padding="l2">
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
