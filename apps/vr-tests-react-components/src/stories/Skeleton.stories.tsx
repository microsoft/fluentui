import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Skeleton, SkeletonItem } from '@fluentui/react-skeleton';
import { Steps, type StoryParameters } from 'storywright';
import { makeStyles } from '@griffel/react';

import { getStoryVariant, TestWrapperDecoratorFixedWidth, HIGH_CONTRAST, DARK_MODE, RTL } from '../utilities';

const useStyles = makeStyles({
  paused: {
    '& *': {
      animationPlayState: 'paused !important',
      animationDelay: '-1s !important',
    },
  },
});

export default {
  title: 'Skeleton converged',

  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof Skeleton>;

export const OpaqueSkeletonWithRectangle = () => (
  <Skeleton className={useStyles().paused}>
    <SkeletonItem style={{ width: '96px' }} />
  </Skeleton>
);
OpaqueSkeletonWithRectangle.storyName = 'Opaque Skeleton with rectangle';

export const OpaqueSkeletonWithRectangleHighContrast = getStoryVariant(OpaqueSkeletonWithRectangle, HIGH_CONTRAST);

export const OpaqueSkeletonWithRectangleDarkMode = getStoryVariant(OpaqueSkeletonWithRectangle, DARK_MODE);

export const OpaqueSkeletonWithRectangleRTL = getStoryVariant(OpaqueSkeletonWithRectangle, RTL);

export const OpaqueSkeletonWithCircle = () => (
  <Skeleton className={useStyles().paused}>
    <SkeletonItem shape="circle" />
  </Skeleton>
);
OpaqueSkeletonWithCircle.storyName = 'Opaque Skeleton with circle';

export const OpaqueSkeletonWithCircleHighContrast = getStoryVariant(OpaqueSkeletonWithCircle, HIGH_CONTRAST);

export const OpaqueSkeletonWithCircleDarkMode = getStoryVariant(OpaqueSkeletonWithCircle, DARK_MODE);

export const OpaqueSkeletonWithCircleRTL = getStoryVariant(OpaqueSkeletonWithCircle, RTL);

export const OpaqueSkeletonWithSquare = () => (
  <Skeleton className={useStyles().paused}>
    <SkeletonItem shape="square" />
  </Skeleton>
);
OpaqueSkeletonWithSquare.storyName = 'Opaque Skeleton with square';

export const OpaqueSkeletonWithSquareHighContrast = getStoryVariant(OpaqueSkeletonWithSquare, HIGH_CONTRAST);

export const OpaqueSkeletonWithSquareDarkMode = getStoryVariant(OpaqueSkeletonWithSquare, DARK_MODE);

export const OpaqueSkeletonWithSquareRTL = getStoryVariant(OpaqueSkeletonWithSquare, RTL);

export const TranslucentSkeletonWithRectangle = () => (
  <Skeleton className={useStyles().paused} appearance="translucent">
    <SkeletonItem style={{ width: '96px' }} />
  </Skeleton>
);
TranslucentSkeletonWithRectangle.storyName = 'Translucent Skeleton with rectangle';

export const TranslucentSkeletonWithRectangleHighContrast = getStoryVariant(
  TranslucentSkeletonWithRectangle,
  HIGH_CONTRAST,
);

export const TranslucentSkeletonWithRectangleDarkMode = getStoryVariant(TranslucentSkeletonWithRectangle, DARK_MODE);

export const TranslucentSkeletonWithCircle = () => (
  <Skeleton className={useStyles().paused} appearance="translucent">
    <SkeletonItem shape="circle" />
  </Skeleton>
);

TranslucentSkeletonWithCircle.storyName = 'Translucent Skeleton with circle';

export const TranslucentSkeletonWithCircleHighContrast = getStoryVariant(TranslucentSkeletonWithCircle, HIGH_CONTRAST);

export const TranslucentSkeletonWithCircleDarkMode = getStoryVariant(TranslucentSkeletonWithCircle, DARK_MODE);

export const TranslucentSkeletonWithSquare = () => (
  <Skeleton className={useStyles().paused} appearance="translucent">
    <SkeletonItem shape="square" />
  </Skeleton>
);
TranslucentSkeletonWithSquare.storyName = 'Translucent Skeleton with square';

export const TranslucentSkeletonWithSquareHighContrast = getStoryVariant(TranslucentSkeletonWithSquare, HIGH_CONTRAST);

export const TranslucentSkeletonWithSquareDarkMode = getStoryVariant(TranslucentSkeletonWithSquare, DARK_MODE);
