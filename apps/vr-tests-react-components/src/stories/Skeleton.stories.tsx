import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Skeleton, SkeletonItem } from '@fluentui/react-skeleton';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  paused: {
    '& *': {
      animationPlayState: 'paused !important',
      animationDelay: '-1s !important',
    },
  },
});

storiesOf('Skeleton converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory(
    'Opaque Skeleton with rectangle',
    () => (
      <Skeleton className={useStyles().paused}>
        <SkeletonItem style={{ width: '96px' }} />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Opaque Skeleton with circle',
    () => (
      <Skeleton className={useStyles().paused}>
        <SkeletonItem shape="circle" />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Opaque Skeleton with square',
    () => (
      <Skeleton className={useStyles().paused}>
        <SkeletonItem shape="square" />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Translucent Skeleton with rectangle',
    () => (
      <Skeleton className={useStyles().paused} appearance="translucent">
        <SkeletonItem style={{ width: '96px' }} />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Translucent Skeleton with circle',
    () => (
      <Skeleton className={useStyles().paused} appearance="translucent">
        <SkeletonItem shape="circle" />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Translucent Skeleton with square',
    () => (
      <Skeleton className={useStyles().paused} appearance="translucent">
        <SkeletonItem shape="square" />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
