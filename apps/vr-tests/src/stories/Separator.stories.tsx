import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
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

export const RootRTL = getStoryVariant(Root, RTL);

export const HorizontalStartAligned = () => (
  <div className={horizontalStyles}>
    <Separator alignContent="start">Today</Separator>
  </div>
);

export const HorizontalStartAlignedRTL = getStoryVariant(HorizontalStartAligned, RTL);

export const HorizontalEndAligned = () => (
  <div className={horizontalStyles}>
    <Separator alignContent="end">Today</Separator>
  </div>
);

export const HorizontalEndAlignedRTL = getStoryVariant(HorizontalEndAligned, RTL);

export const VerticalCenterAligned = () => (
  <div className={verticalStyles}>
    <Separator vertical>Today</Separator>
  </div>
);

export const VerticalCenterAlignedRTL = getStoryVariant(VerticalCenterAligned, RTL);

export const VerticalStartAligned = () => (
  <div className={verticalStyles}>
    <Separator vertical alignContent="start">
      Today
    </Separator>
  </div>
);

export const VerticalStartAlignedRTL = getStoryVariant(VerticalStartAligned, RTL);

export const VerticalEndAligned = () => (
  <div className={verticalStyles}>
    <Separator vertical alignContent="end">
      Today
    </Separator>
  </div>
);

export const VerticalEndAlignedRTL = getStoryVariant(VerticalEndAligned, RTL);
