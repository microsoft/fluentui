import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/index';
import { LineChartBasicExample } from '@fluentui/react-examples/lib/react-charting/LineChart/LineChart.Basic.Example';
import { LineChartEventsExample } from '@fluentui/react-examples/src/react-charting/LineChart/LineChart.Events.Example';

storiesOf('LineChart', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => {
    return <LineChartBasicExample />;
  })
  .addStory('Events', () => {
    return <LineChartEventsExample />;
  });
