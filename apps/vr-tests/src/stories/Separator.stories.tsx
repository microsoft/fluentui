import * as React from 'react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  STORY_VARIANT,
  StoryWrightDecorator,
  TestWrapperDecorator,
} from '../utilities';
import { Separator, mergeStyles } from '@fluentui/react';

const verticalStyles = mergeStyles({
  height: '400px',
});

const horizontalStyles = mergeStyles({
  width: '400px',
});

export default {
  title: 'Separator',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Root = () => (
  <div className={horizontalStyles}>
    <Separator>Today</Separator>
  </div>
);

export const RootRTL = getStoryVariant(Root, STORY_VARIANT.RTL);

export const HorizontalStartAligned = () => (
  <div className={horizontalStyles}>
    <Separator alignContent="start">Today</Separator>
  </div>
);

export const HorizontalStartAlignedRTL = getStoryVariant(HorizontalStartAligned, STORY_VARIANT.RTL);

export const HorizontalEndAligned = () => (
  <div className={horizontalStyles}>
    <Separator alignContent="end">Today</Separator>
  </div>
);

export const HorizontalEndAlignedRTL = getStoryVariant(HorizontalEndAligned, STORY_VARIANT.RTL);

export const VerticalCenterAligned = () => (
  <div className={verticalStyles}>
    <Separator vertical>Today</Separator>
  </div>
);

export const VerticalCenterAlignedRTL = getStoryVariant(VerticalCenterAligned, STORY_VARIANT.RTL);

export const VerticalStartAligned = () => (
  <div className={verticalStyles}>
    <Separator vertical alignContent="start">
      Today
    </Separator>
  </div>
);

export const VerticalStartAlignedRTL = getStoryVariant(VerticalStartAligned, STORY_VARIANT.RTL);

export const VerticalEndAligned = () => (
  <div className={verticalStyles}>
    <Separator vertical alignContent="end">
      Today
    </Separator>
  </div>
);

export const VerticalEndAlignedRTL = getStoryVariant(VerticalEndAligned, STORY_VARIANT.RTL);
