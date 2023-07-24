import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ProgressBar } from '@fluentui/react-progress';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { StoryWright, Steps } from 'storywright';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  paused: {
    '& *': {
      animationPlayState: 'paused !important',
      animationDelay: '-1s !important',
    },
  },
});

storiesOf('ProgressBar converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory(
    'Indeterminate + thickness',
    () => (
      <div className={useStyles().paused} style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
        <ProgressBar />
        <ProgressBar thickness="large" />
      </div>
    ),
    {
      includeDarkMode: true,
      includeHighContrast: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Determinate + thickness',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
        <ProgressBar value={0.5} />
        <ProgressBar value={0.5} thickness="large" />
      </div>
    ),
    {
      includeDarkMode: true,
      includeHighContrast: true,
      includeRtl: true,
    },
  )
  .addStory('Error', () => <ProgressBar value={0.5} color="error" />)
  .addStory('Warning', () => <ProgressBar value={0.5} color="warning" />)
  .addStory('Success', () => <ProgressBar value={1} color="success" />);
