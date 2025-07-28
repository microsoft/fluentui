import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { Divider } from '@fluentui/react-divider';

import { getStoryVariant, TestWrapperDecoratorFixedWidth, RTL, HIGH_CONTRAST, DARK_MODE } from '../../utilities';

export default {
  title: 'Divider Converged - Horizontal',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => (
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
    ),
  ],
} satisfies Meta<typeof Divider>;

export const WithoutContent = () => <Divider />;
WithoutContent.storyName = 'without content';

export const WithoutContentRTL = getStoryVariant(WithoutContent, RTL);

export const WithContent = () => <Divider>Today</Divider>;
WithContent.storyName = 'with content';

export const WithContentRTL = getStoryVariant(WithContent, RTL);

export const WithContentHighContrast = getStoryVariant(WithContent, HIGH_CONTRAST);

export const WithContentDarkMode = getStoryVariant(WithContent, DARK_MODE);

export const StartAligned = () => <Divider alignContent="start">Today</Divider>;

export const StartAlignedRTL = getStoryVariant(StartAligned, RTL);

export const StartAlignedMultiline = () => (
  <Divider alignContent="start">
    Yesterday
    <br />
    Today
    <br />
    Tomorrow
  </Divider>
);

export const StartAlignedMultilineRTL = getStoryVariant(StartAlignedMultiline, RTL);

export const EndAligned = () => <Divider alignContent="end">Today</Divider>;

export const EndAlignedRTL = getStoryVariant(EndAligned, RTL);

export const EndAlignedMultiline = () => (
  <Divider alignContent="end">
    Yesterday
    <br />
    Today
    <br />
    Tomorrow
  </Divider>
);

export const EndAlignedMultilineRTL = getStoryVariant(EndAlignedMultiline, RTL);

export const AppearanceSubtle = () => <Divider appearance="subtle">Today</Divider>;
AppearanceSubtle.storyName = 'Appearance subtle';

export const AppearanceSubtleHighContrast = getStoryVariant(AppearanceSubtle, HIGH_CONTRAST);

export const AppearanceSubtleDarkMode = getStoryVariant(AppearanceSubtle, DARK_MODE);

export const AppearanceStrong = () => <Divider appearance="strong">Today</Divider>;
AppearanceStrong.storyName = 'Appearance strong';

export const AppearanceStrongHighContrast = getStoryVariant(AppearanceStrong, HIGH_CONTRAST);

export const AppearanceStrongDarkMode = getStoryVariant(AppearanceStrong, DARK_MODE);

export const AppearanceBrand = () => <Divider appearance="brand">Today</Divider>;
AppearanceBrand.storyName = 'Appearance brand';

export const AppearanceBrandHighContrast = getStoryVariant(AppearanceBrand, HIGH_CONTRAST);

export const AppearanceBrandDarkMode = getStoryVariant(AppearanceBrand, DARK_MODE);

export const Inset = () => <Divider inset>Today</Divider>;
