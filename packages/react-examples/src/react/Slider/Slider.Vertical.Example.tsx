import * as React from 'react';
import { Slider, IStackTokens, Stack, IStackStyles } from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { height: 200 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

const valueFormat = (value: number) => `${value}%`;

export const SliderVerticalExample: React.FunctionComponent = () => {
  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
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
