import * as React from 'react';
import type { Meta } from '@storybook/react';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { Steps, StoryWright } from 'storywright';
import { DataVizPalette, GaugeChart, GaugeValueFormat } from '@fluentui/react-charting';

export default {
  title: 'react-charting/GaugeChart',

  decorators: [
    (story, context) => TestWrapperDecorator(story, context),
    (story, context) => {
      const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
      return <StoryWright steps={steps}>{story(context)}</StoryWright>;
    },
  ],
} satisfies Meta<typeof GaugeChart>;

export const Basic = () => {
  return (
    <div style={{ padding: '10px' }}>
      <GaugeChart
        width={252}
        height={128}
        segments={[
          { size: 33, color: DataVizPalette.success, legend: 'Low Risk' },
          { size: 34, color: DataVizPalette.warning, legend: 'Medium Risk' },
          { size: 33, color: DataVizPalette.error, legend: 'High Risk' },
        ]}
        chartValue={50}
        hideMinMax={false}
      />
    </div>
  );
};

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

export const BasicRTL = getStoryVariant(Basic, RTL);

export const Variant = () => {
  return (
    <>
      <GaugeChart
        width={252}
        height={173}
        segments={[
          { size: 50, legend: 'Used' },
          {
            size: 100 - 50,
            color: DataVizPalette.disabled,
            legend: 'Available',
          },
        ]}
        chartValue={50}
        chartTitle="Storage capacity"
        sublabel="used"
        chartValueFormat={GaugeValueFormat.Fraction}
      />
    </>
  );
};

export const VariantDarkMode = getStoryVariant(Variant, DARK_MODE);

export const VariantRTL = getStoryVariant(Variant, RTL);
