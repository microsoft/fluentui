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

    const tokens = {
      sectionStack: {
        childrenGap: 10
      },
      headingStack: {
        childrenGap: 50
      },
      numericalSpacing: {
        childrenGap: 10,
        padding: 10
      },
      customSpacing: {
        childrenGap: '20%',
        padding: 'm 40px'
      },
      themedExtraSmall: {
        childrenGap: 's2',
        padding: 's2'
      },
      themedSmall: {
        childrenGap: 's1',
        padding: 's2'
      },
      themedMedium: {
        childrenGap: 'm',
        padding: 'm'
      },
      themedLarge: {
        childrenGap: 'l1',
        padding: 'l1'
      },
      themedExtraLarge: {
        childrenGap: 'l2',
        padding: 'l2'
      }
    };

    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack horizontal disableShrink tokens={tokens.headingStack}>
          <Stack>
            <span>Numerical spacing</span>
            <Stack className={styles.root} tokens={tokens.numericalSpacing}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Custom spacing</span>
            <Stack className={styles.root} tokens={tokens.customSpacing}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal disableShrink horizontalAlign="space-between">
          <Stack>
            <span>Themed spacing (extra small)</span>
            <Stack className={styles.root} tokens={tokens.themedExtraSmall}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (small)</span>
            <Stack className={styles.root} tokens={tokens.themedSmall}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (medium)</span>
            <Stack className={styles.root} tokens={tokens.themedMedium}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (large)</span>
            <Stack className={styles.root} tokens={tokens.themedLarge}>
              <span className={styles.item}>1</span>
              <span className={styles.item}>2</span>
              <span className={styles.item}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (extra large)</span>
            <Stack className={styles.root} tokens={tokens.themedExtraLarge}>
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
