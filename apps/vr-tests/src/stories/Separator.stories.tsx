import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Separator, mergeStyles } from '@fluentui/react';

const verticalStyles = mergeStyles({
  height: '400px',
});

const horizontalStyles = mergeStyles({
  width: '400px',
});

storiesOf('Separator', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Root',
    () => (
      <div className={horizontalStyles}>
        <Separator>Today</Separator>
      </div>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Horizontal Start Aligned',
    () => (
      <div className={horizontalStyles}>
        <Separator alignContent="start">Today</Separator>
      </div>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Horizontal End Aligned',
    () => (
      <div className={horizontalStyles}>
        <Separator alignContent="end">Today</Separator>
      </div>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Vertical Center Aligned',
    () => (
      <div className={verticalStyles}>
        <Separator vertical>Today</Separator>
      </div>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Vertical Start Aligned',
    () => (
      <div className={verticalStyles}>
        <Separator vertical alignContent="start">
          Today
        </Separator>
      </div>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Vertical End Aligned',
    () => (
      <div className={verticalStyles}>
        <Separator vertical alignContent="end">
          Today
        </Separator>
      </div>
    ),
    { includeRtl: true },
  );
