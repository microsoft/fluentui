import * as React from 'react';
import { Slider as DeprecatedSlider } from '@fluentui/react-experiments';
import { IStackTokens, Stack } from '@fluentui/react';

// Workaround to prevent errors on usage of Slider, without disabling all deprecation checks
// eslint-disable-next-line deprecation/deprecation
const Slider = DeprecatedSlider;

export interface ISliderBasicExampleState {
  value: number;
}
const stackTokens: IStackTokens = { childrenGap: 30 };
/* eslint-disable react/jsx-no-bind */
export class SliderExample extends React.Component<{}, ISliderBasicExampleState> {
  public state: ISliderBasicExampleState = { value: 0 };
  public render(): JSX.Element {
    const marks = [
      {
        value: 0,
        label: '0°C',
      },
      {
        value: 30,
        label: '30°C',
      },
      {
        value: 80,
        label: '80°C',
      },
      {
        value: 100,
        label: '100°C',
      },
    ];
    return (
      <Stack tokens={stackTokens} styles={{ root: { maxWidth: 300 } }}>
        <Slider
          label="Basic example"
          min={1}
          max={5}
          step={1}
          defaultValue={2}
          showValue={true}
          onChange={(value: number) => console.log(value)}
        />
        <Slider
          label="Snapping slider example"
          min={0}
          max={50}
          step={10}
          defaultValue={20}
          showValue
          onChange={(value: number) => console.log(value)}
          snapToStep
        />
        <Slider
          label="Marks example"
          min={0}
          max={100}
          step={10}
          defaultValue={20}
          showValue={true}
          onChange={(value: number) => console.log(value)}
          showThumbTooltip
          marks={marks}
        />
        <Slider label="Disabled example" min={50} max={500} step={50} defaultValue={300} showValue={true} disabled />
        <Slider
          label="Controlled example"
          max={10}
          value={this.state.value}
          onChange={(value: number) => this.setState({ value })}
          showValue={true}
        />
        <Slider
          label="Example with formatted value"
          max={100}
          valueFormat={(value: number) => `${value}%`}
          showValue={true}
        />
        <Slider label="Origin from zero" min={-5} max={5} step={1} defaultValue={2} showValue originFromZero />
      </Stack>
    );
  }
}
