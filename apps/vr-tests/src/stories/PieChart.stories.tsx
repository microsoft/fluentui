import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { PieChart } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

storiesOf('PieChart', module)
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
    const points = [
      { y: 50, x: 'A' },
      { y: 25, x: 'B' },
      { y: 25, x: 'C' },
    ];
    const colors = [DefaultPalette.red, DefaultPalette.blue, DefaultPalette.green];
    return (
      <PieChart
        culture={window.navigator.language}
        data={points}
        chartTitle="Pie Chart basic example"
        colors={colors}
      />
    );
  });
