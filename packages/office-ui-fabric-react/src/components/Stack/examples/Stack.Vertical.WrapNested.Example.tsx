import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from '../Stack';
import { IStackStyles, IStackTokens } from '../Stack.types';
import { IStyleSet, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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

    const containerStackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.themeTertiary,
        height: stackHeight
      }
    };
    const firstStackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.neutralTertiary,
        selectors: {
          '& span': {
            ...textStyles,
            background: DefaultPalette.themePrimary
          }
        }
      }
    };
    const secondStackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.neutralSecondary,
        selectors: {
          '& span': {
            ...textStyles,
            background: DefaultPalette.themeDark
          }
        }
      }
    };
    const thirdStackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.neutralPrimary,
        selectors: {
          '& span': {
            ...textStyles,
            background: DefaultPalette.themeDarker
          }
        }
      }
    };

    const sectionStackTokens: IStackTokens = { childrenGap: 10 };
    const wrapStackTokens: IStackTokens = { childrenGap: '30 40' };
    const firstStackTokens: IStackTokens = { childrenGap: '10 30' };
    const secondStackTokens: IStackTokens = { childrenGap: '20 50' };

    return (
      <Stack tokens={sectionStackTokens}>
        <Slider
          label="Change the stack height to see how child items wrap onto multiple columns:"
          min={1}
          max={420}
          step={1}
          defaultValue={420}
          showValue={true}
          onChange={this._onHeightChange}
        />

        <Stack wrap styles={containerStackStyles} tokens={wrapStackTokens}>
          <Stack wrap styles={firstStackStyles} tokens={firstStackTokens}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </Stack>

          <Stack wrap styles={secondStackStyles} tokens={secondStackTokens}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </Stack>

          <Stack wrap styles={thirdStackStyles}>
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
