import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { DataVizPalette, GaugeChart, GaugeValueFormat } from '@fluentui/react-charting';

storiesOf('react-charting/GaugeChart', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    return <StoryWright steps={steps}>{story()}</StoryWright>;
  })
  .addStory(
    'Basic',
    () => {
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
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Variant',
    () => {
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
    },
    { includeDarkMode: true, includeRtl: true },
  );
