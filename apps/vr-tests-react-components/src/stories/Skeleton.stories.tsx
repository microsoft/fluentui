import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Skeleton, SkeletonItem } from '@fluentui/react-skeleton';
import { TestWrapperDecoratorNoAnimation } from '../utilities/TestWrapperDecorator';

storiesOf('Skeleton converged', module)
  .addDecorator(TestWrapperDecoratorNoAnimation)
  .addStory('Opaque Skeleton with rectangle', () => <Skeleton className="test-class" />, {
    includeHighContrast: true,
    includeDarkMode: true,
    includeRtl: true,
  })
  .addStory(
    'Opaque Skeleton with circle',
    () => (
      <Skeleton className="test-class">
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
      <Skeleton className="test-class">
        <SkeletonItem shape="square" />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory('Translucent Skeleton with rectangle', () => <Skeleton className="test-class" appearance="translucent" />, {
    includeHighContrast: true,
    includeDarkMode: true,
    includeRtl: true,
  })
  .addStory(
    'Translucent Skeleton with  circle',
    () => (
      <Skeleton className="test-class" appearance="translucent">
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
      <Skeleton className="test-class" appearance="translucent">
        <SkeletonItem shape="square" />
      </Skeleton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  );
