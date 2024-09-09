import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { Spinner, SpinnerSize } from '@fluentui/react';

export default {
  title: 'Spinner',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const ExtraSmall = () => <Spinner size={SpinnerSize.xSmall} />;

ExtraSmall.storyName = 'Extra small';

export const Small = () => <Spinner size={SpinnerSize.small} />;
export const Medium = () => <Spinner size={SpinnerSize.medium} />;
export const Large = () => <Spinner size={SpinnerSize.large} />;

export const Label = () => (
  <Spinner
    styles={{ label: { fontFamily: 'Segoe UI', fontSize: '14px' } }}
    size={SpinnerSize.medium}
    label="Spinner label"
  />
);

export const LabelAtTop = () => (
  <Spinner
    styles={{ label: { fontFamily: 'Segoe UI', fontSize: '14px' } }}
    size={SpinnerSize.medium}
    label="Spinner label"
    labelPosition="top"
  />
);

LabelAtTop.storyName = 'Label at top';

export const LabelOnTheRight = () => (
  <Spinner
    styles={{ label: { fontFamily: 'Segoe UI', fontSize: '14px' } }}
    size={SpinnerSize.medium}
    label="Spinner label"
    labelPosition="right"
  />
);

LabelOnTheRight.storyName = 'Label on the right';

export const LabelOnTheLeft = () => (
  <Spinner
    styles={{ label: { fontFamily: 'Segoe UI', fontSize: '14px' } }}
    size={SpinnerSize.medium}
    label="Spinner label"
    labelPosition="left"
  />
);

LabelOnTheLeft.storyName = 'Label on the left';
