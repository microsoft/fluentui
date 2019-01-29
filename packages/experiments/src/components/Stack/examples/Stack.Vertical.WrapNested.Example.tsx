// @codepen
import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from '../Stack';
import { mergeStyleSets, IStyleSet, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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

    return (
      <Stack gap={10}>
        <Slider
          label="Change the stack height to see how child items wrap onto multiple columns:"
          min={1}
          max={420}
          step={1}
          defaultValue={420}
          showValue={true}
          onChange={this._onHeightChange}
        />

        <Stack wrap gap={'30 40'} className={styles.root}>
          <Stack wrap gap={'10 30'} className={styles.stackOne}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </Stack>

          <Stack wrap gap={'20 50'} className={styles.stackTwo}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </Stack>

          <Stack wrap className={styles.stackThree}>
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
