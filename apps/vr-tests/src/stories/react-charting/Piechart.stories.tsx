import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { PieChart } from '@fluentui/react-charting';

storiesOf('react-charting/PieChart', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    return <StoryWright steps={steps}>{story(context)}</StoryWright>;
  })
  .addStory(
    'Basic',
    (context: any) => {
      const points = [
        { y: 50, x: 'A' },
        { y: 25, x: 'B' },
        { y: 25, x: 'C' },
      ];
      const colors = ['#e81123', '#0078d4', '#107c10'];
      return (
        <PieChart
          culture={window.navigator.language}
          data={points}
          chartTitle="Pie Chart basic example"
          colors={colors}
        />
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
