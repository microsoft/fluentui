// @codepen
import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IStackItemSlots } from '../StackItem/StackItem.types';
import { IComponentStyles } from '../../../Foundation';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IExampleState {
  stackHeight: number;
}

export class VerticalStackShrinkExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackHeight: 100
    };
  }

  public render(): JSX.Element {
    const rootStyles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary,
        height: `${this.state.stackHeight}%`,
        overflow: 'hidden'
      }
    };

    const itemStyles: IComponentStyles<IStackItemSlots> = {
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        overflow: 'hidden'
      }
    };

    const containerStyles = {
      container: {
        height: 200
      }
    };

    return (
      <Stack gap={5}>
        <Slider
          label="Change the stack height to see how child items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onHeightChange}
        />
        <div className={mergeStyleSets(containerStyles).container}>
          <Stack shrinkItems gap={5} padding={10} styles={rootStyles}>
            <Stack.Item grow styles={itemStyles}>
              I shrink
            </Stack.Item>
            <Stack.Item grow styles={itemStyles}>
              I shrink
            </Stack.Item>
            <Stack.Item grow preventShrink styles={{ root: { ...(itemStyles.root as any), ...{ height: 50 } } }}>
              I don't shrink
            </Stack.Item>
            <Stack.Item grow styles={itemStyles}>
              I shrink
            </Stack.Item>
          </Stack>
        </div>
      </Stack>
    );
  }

  private _onHeightChange = (value: number): void => {
    this.setState({ stackHeight: value });
  };
}
