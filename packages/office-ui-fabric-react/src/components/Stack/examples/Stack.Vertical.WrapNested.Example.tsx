import * as React from 'react';
import { mergeStyleSets, IStyleSet, DefaultPalette, Slider, Stack } from 'office-ui-fabric-react';

export interface IExampleState {
  stackHeight: number;
}

export class VerticalStackWrapNestedExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackHeight: 420
    };
  }

  public render(): JSX.Element {
    const textStyles = {
      width: 50,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: DefaultPalette.white
    } as IStyleSet<{}>;

    const { stackHeight } = this.state;

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: stackHeight
      },

      stackOne: {
        background: DefaultPalette.neutralTertiary
      },

      stackOneItem: {
        ...textStyles,
        background: DefaultPalette.themePrimary
      },

      stackTwo: {
        background: DefaultPalette.neutralSecondary
      },

      stackTwoItem: {
        ...textStyles,
        background: DefaultPalette.themeDark
      },

      stackThree: {
        background: DefaultPalette.neutralPrimary
      },

      stackThreeItem: {
        ...textStyles,
        background: DefaultPalette.themeDarker
      }
    });

    const tokens = {
      sectionStack: {
        childrenGap: 10
      },
      wrapStack: {
        childrenGap: '30 40'
      },
      firstStack: {
        childrenGap: '10 30'
      },
      secondStack: {
        childrenGap: '20 50'
      }
    };

    return (
      <Stack tokens={tokens.sectionStack}>
        <Slider
          label="Change the stack height to see how child items wrap onto multiple columns:"
          min={1}
          max={420}
          step={1}
          defaultValue={420}
          showValue={true}
          onChange={this._onHeightChange}
        />

        <Stack wrap tokens={tokens.wrapStack} className={styles.root}>
          <Stack wrap tokens={tokens.firstStack} className={styles.stackOne}>
            <span className={styles.stackOneItem}>1</span>
            <span className={styles.stackOneItem}>2</span>
            <span className={styles.stackOneItem}>3</span>
            <span className={styles.stackOneItem}>4</span>
            <span className={styles.stackOneItem}>5</span>
            <span className={styles.stackOneItem}>6</span>
            <span className={styles.stackOneItem}>7</span>
          </Stack>

          <Stack wrap tokens={tokens.secondStack} className={styles.stackTwo}>
            <span className={styles.stackTwoItem}>1</span>
            <span className={styles.stackTwoItem}>2</span>
            <span className={styles.stackTwoItem}>3</span>
          </Stack>

          <Stack wrap className={styles.stackThree}>
            <span className={styles.stackThreeItem}>1</span>
            <span className={styles.stackThreeItem}>2</span>
            <span className={styles.stackThreeItem}>3</span>
            <span className={styles.stackThreeItem}>4</span>
            <span className={styles.stackThreeItem}>5</span>
            <span className={styles.stackThreeItem}>6</span>
            <span className={styles.stackThreeItem}>7</span>
            <span className={styles.stackThreeItem}>8</span>
            <span className={styles.stackThreeItem}>9</span>
            <span className={styles.stackThreeItem}>10</span>
          </Stack>
        </Stack>

        <span>
          <b>Note:</b>
        </span>
        <span>
          Support for nested wrapping of vertical flex-boxes is scarce across browsers, especially in the way they handle overflows.
        </span>
        <span>Most browsers don't scale the width of the flex-box when the inner items overflow and wrap around it.</span>
        <span>
          The one exception to this case being Microsoft Edge that handles it correctly (though this might go soon with the switch to
          Chromium).
        </span>
        <span>There are ways in which we could have gone around this issue.</span>
        <span>
          However, we have chosen to adhere to the flex-box spec so that we have the correct implementation if support comes down the line.
        </span>
      </Stack>
    );
  }

  private _onHeightChange = (value: number): void => {
    this.setState({ stackHeight: value });
  };
}
