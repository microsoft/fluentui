import * as React from 'react';
import { Slider as DeprecatedSlider } from '@fluentui/react-experiments';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';

// Workaround to prevent errors on usage of Slider, without disabling all deprecation checks
// eslint-disable-next-line deprecation/deprecation
const Slider = DeprecatedSlider;

export interface ISliderVerticalExampleState {
  value: number;
}
const stackTokens: IStackTokens = { childrenGap: 20 };
/* eslint-disable react/jsx-no-bind */
export const SliderVerticalExample: React.FunctionComponent = () => {
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
    <Stack horizontal tokens={stackTokens} styles={{ root: { height: 200 } }}>
      <Slider label="Basic" min={1} max={5} step={1} defaultValue={2} showValue vertical />
      <Slider
        label="Marks"
        min={0}
        max={100}
        step={10}
        defaultValue={2}
        showValue
        vertical
        marks={marks}
        showThumbTooltip
      />
      <Slider label="Disabled" min={50} max={500} step={50} defaultValue={300} showValue vertical disabled />
      <Slider label="Controlled" max={10} vertical showValue />
      <Slider label="Formatted value" max={100} valueFormat={(value: number) => `${value}%`} showValue vertical />
      <Slider label="Origin from zero" min={-5} max={15} step={1} defaultValue={5} showValue vertical originFromZero />
    </Stack>
  );
};
