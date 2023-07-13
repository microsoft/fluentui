import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Skeleton, SkeletonItem } from '@fluentui/react-skeleton';
import { PauseAnimationDecorator, TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Skeleton converged', module)
  .addDecorator(PauseAnimationDecorator)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addStory(
    'Opaque Skeleton with rectangle',
    () => (
      <Skeleton>
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
      <Skeleton>
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
      <Skeleton>
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
      <Skeleton appearance="translucent">
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
    'Translucent Skeleton with  circle',
    () => (
      <Skeleton appearance="translucent">
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
    'Translucent Skeleton with square',
    () => (
      <Skeleton appearance="translucent">
        <SkeletonItem shape="square" />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  );
