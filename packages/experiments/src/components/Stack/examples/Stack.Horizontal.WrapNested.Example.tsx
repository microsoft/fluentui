// @codepen
import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IComponentStyles } from '../../../Foundation';
import { IStyleSet, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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

    const rootStyles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary,
        width: `${this.state.stackWidth}%`
      }
    };

    const stackOneStyles: IComponentStyles<IStackSlots> = {
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

    const stackTwoStyles: IComponentStyles<IStackSlots> = {
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

    const stackThreeStyles: IComponentStyles<IStackSlots> = {
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

    return (
      <Stack gap={10}>
        <Slider
          label="Change the stack width to see how child items wrap onto multiple rows:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onWidthChange}
        />

        <Stack horizontal wrap gap={40} verticalGap={30} styles={rootStyles}>
          <Stack horizontal wrap gap={30} verticalGap={10} styles={stackOneStyles}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </Stack>

          <Stack horizontal wrap gap={50} verticalGap={20} styles={stackTwoStyles}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </Stack>

          <Stack horizontal wrap styles={stackThreeStyles}>
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
