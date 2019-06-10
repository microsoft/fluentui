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
        background: DefaultPalette.neutralTertiary,
        selectors: {
          '& span': {
            ...textStyles,
            background: DefaultPalette.themePrimary
          }
        }
      },

      stackTwo: {
        background: DefaultPalette.neutralSecondary,
        selectors: {
          '& span': {
            ...textStyles,
            background: DefaultPalette.themeDark
          }
        }
      },

      stackThree: {
        background: DefaultPalette.neutralPrimary,
        selectors: {
          '& span': {
            ...textStyles,
            background: DefaultPalette.themeDarker
          }
        }
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
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </Stack>

          <Stack horizontal wrap tokens={tokens.secondStack} className={styles.stackTwo}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </Stack>

          <Stack horizontal wrap className={styles.stackThree}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  private _onWidthChange = (value: number): void => {
    this.setState({ stackWidth: value });
  };
}
