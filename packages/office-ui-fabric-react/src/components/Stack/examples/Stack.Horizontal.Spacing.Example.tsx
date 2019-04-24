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

    const tokens = {
      sectionStack: {
        childrenGap: 10
      },
      numericalSpacing: {
        childrenGap: 10,
        padding: 10
      },
      customSpacing: {
        childrenGap: '10%',
        padding: 's1 15%'
      },
      themedExtraSmall: {
        childrenGap: 's2',
        padding: 's2'
      },
      themedSmall: {
        childrenGap: 's1',
        padding: 's1'
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
        <Stack horizontal disableShrink horizontalAlign="space-between">
          <Stack>
            <span>Numerical spacing</span>
            <Stack horizontal className={styles.root} tokens={tokens.numericalSpacing}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
          <Stack>
            <span>Custom spacing</span>
            <Stack horizontal className={styles.root} tokens={tokens.customSpacing}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal disableShrink horizontalAlign="space-between">
          <Stack>
            <span>Themed spacing (extra small)</span>
            <Stack horizontal className={styles.root} tokens={tokens.themedExtraSmall}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
          <Stack>
            <span>Themed spacing (small)</span>
            <Stack horizontal className={styles.root} tokens={tokens.themedSmall}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
          <Stack>
            <span>Themed spacing (medium)</span>
            <Stack horizontal className={styles.root} tokens={tokens.themedMedium}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal horizontalAlign="space-between">
          <Stack>
            <span>Themed spacing (large)</span>
            <Stack horizontal className={styles.root} tokens={tokens.themedLarge}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
          <Stack>
            <span>Themed spacing (extra large)</span>
            <Stack horizontal className={styles.root} tokens={tokens.themedExtraLarge}>
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
