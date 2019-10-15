import * as React from 'react';
import { mergeStyleSets, IStyleSet, DefaultPalette, Slider, Stack } from 'office-ui-fabric-react';

export interface IExampleState {
  stackWidth: number;
}

export class HorizontalStackWrapNestedExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackWidth: 100
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

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        width: `${this.state.stackWidth}%`
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
        background: DefaultPalette.themeDark
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
          label="Change the stack width to see how child items wrap onto multiple rows:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onWidthChange}
        />

        <Stack horizontal wrap tokens={tokens.wrapStack} className={styles.root}>
          <Stack horizontal wrap tokens={tokens.firstStack} className={styles.stackOne}>
            <span className={styles.stackOneItem}>1</span>
            <span className={styles.stackOneItem}>2</span>
            <span className={styles.stackOneItem}>3</span>
            <span className={styles.stackOneItem}>4</span>
            <span className={styles.stackOneItem}>5</span>
            <span className={styles.stackOneItem}>6</span>
            <span className={styles.stackOneItem}>7</span>
          </Stack>

          <Stack horizontal wrap tokens={tokens.secondStack} className={styles.stackTwo}>
            <span className={styles.stackTwoItem}>1</span>
            <span className={styles.stackTwoItem}>2</span>
            <span className={styles.stackTwoItem}>3</span>
          </Stack>

          <Stack horizontal wrap className={styles.stackThree}>
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
      </Stack>
    );
  }

  private _onWidthChange = (value: number): void => {
    this.setState({ stackWidth: value });
  };
}
