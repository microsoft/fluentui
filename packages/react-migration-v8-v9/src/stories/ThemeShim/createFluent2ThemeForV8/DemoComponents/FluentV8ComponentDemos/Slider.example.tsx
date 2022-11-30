import type { IStackStyles, IStackTokens } from '@fluentui/react';
import { Slider, Stack } from '@fluentui/react';
import * as React from 'react';

const stackStyles: Partial<IStackStyles> = { root: { maxWidth: 300 } };
const stackTokens: IStackTokens = { childrenGap: 20 };
const sliderAriaValueText = (value: number) => `${value} percent`;
const sliderValueFormat = (value: number) => `${value}%`;

export const SliderBasicExample: React.FunctionComponent = () => {
  const [sliderValue, setSliderValue] = React.useState(0);

  const valueFormat = (value: number) => `${value}%`;

  return (
    <Stack horizontal tokens={stackTokens} styles={{ root: { width: '100%' } }}>
      <Stack tokens={stackTokens} styles={stackStyles}>
        <Slider aria-label="Basic example" />
        <Slider label="Snapping slider example" min={0} max={50} step={10} defaultValue={20} showValue snapToStep />
        <Slider label="Disabled example" min={50} max={500} step={50} defaultValue={300} showValue disabled />
        <Slider
          label="Controlled example"
          max={10}
          value={sliderValue}
          showValue
          // eslint-disable-next-line react/jsx-no-bind
          onChange={setSliderValue}
        />
        <Slider
          label="Example with formatted value"
          max={100}
          ariaValueText={sliderAriaValueText}
          valueFormat={sliderValueFormat}
          showValue
        />
        <Slider label="Origin from zero" min={-5} max={5} step={1} defaultValue={2} showValue originFromZero />
      </Stack>
      <Slider // prettier-ignore
        label="Basic"
        min={1}
        max={5}
        step={1}
        defaultValue={2}
        showValue
        vertical
      />
      <Slider // prettier-ignore
        label="Disabled"
        min={50}
        max={500}
        step={50}
        defaultValue={300}
        showValue
        vertical
        disabled
      />
      <Slider // prettier-ignore
        label="Controlled"
        max={10}
        vertical
        showValue
      />
      <Slider // prettier-ignore
        label="Formatted value"
        max={100}
        valueFormat={valueFormat}
        showValue
        vertical
      />
      <Slider // prettier-ignore
        label="Origin from zero"
        min={-5}
        max={15}
        step={1}
        defaultValue={5}
        showValue
        vertical
        originFromZero
      />
    </Stack>
  );
};
