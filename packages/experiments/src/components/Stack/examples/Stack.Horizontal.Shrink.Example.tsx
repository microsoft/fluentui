// @codepen
import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IStackItemSlots } from '../StackItem/StackItem.types';
import { IComponentStyles } from '../../../Foundation';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IExampleState {
  stackWidth: number;
}

export class HorizontalStackShrinkExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackWidth: 100
    };
  }

  public render(): JSX.Element {
    const rootStyles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary,
        width: `${this.state.stackWidth}%`,
        overflow: 'hidden'
      }
    };

    const itemStyles: IComponentStyles<IStackItemSlots> = {
      root: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: DefaultPalette.white,
        background: DefaultPalette.themePrimary,
        overflow: 'hidden'
      }
    };

    return (
      <Stack gap={5}>
        <Slider
          label="Change the stack width to see how child items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onWidthChange}
        />
        <Stack horizontal gap={5} shrinkItems padding={10} styles={rootStyles}>
          <Stack.Item grow styles={itemStyles}>
            I shrink
          </Stack.Item>
          <Stack.Item grow styles={itemStyles}>
            I shrink
          </Stack.Item>
          <Stack.Item grow preventShrink styles={{ root: { ...(itemStyles.root as any), ...{ width: 500 } } }}>
            I don't shrink
          </Stack.Item>
          <Stack.Item grow styles={itemStyles}>
            I shrink
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }

  private _onWidthChange = (value: number): void => {
    this.setState({ stackWidth: value });
  };
}
