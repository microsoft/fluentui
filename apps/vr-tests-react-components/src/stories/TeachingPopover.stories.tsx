import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-teaching-popover';

import { DARK_MODE, HIGH_CONTRAST, getStoryVariant, TestWrapperDecoratorTallFixedWidth } from '../utilities';

export default {
  title: 'TeachingPopover Converged',
  decorators: [TestWrapperDecoratorTallFixedWidth],
  parameters: {
    storyWright: {
      steps: new Steps()
        .click('#teaching-trigger')
        .snapshot('dismiss rest', { cropTo: '.fui-TeachingPopoverSurface' })
        .hover('.fui-TeachingPopoverSurface button')
        .snapshot('dismiss hover', { cropTo: '.fui-TeachingPopoverSurface' })
        .hover('#teaching-trigger')
        .keys('#teaching-trigger', 'Tab')
        .snapshot('dismiss keyboard focus', { cropTo: '.fui-TeachingPopoverSurface' })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof TeachingPopover>;

const renderDismiss = (kind: 'Header' | 'Title') => (
  <TeachingPopover open inline trapFocus={false}>
    <TeachingPopoverTrigger disableButtonEnhancement>
      <button id="teaching-trigger">Trigger</button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      {kind === 'Header' && <TeachingPopoverHeader>Tips</TeachingPopoverHeader>}
      <TeachingPopoverBody>
        <TeachingPopoverTitle dismissButton={kind === 'Title' ? {} : undefined}>Title</TeachingPopoverTitle>
        This is a teaching popover
      </TeachingPopoverBody>
    </TeachingPopoverSurface>
  </TeachingPopover>
);

export const HeaderDismiss = () => renderDismiss('Header');
export const HeaderDismissDarkMode = getStoryVariant(HeaderDismiss, DARK_MODE);
export const HeaderDismissHighContrast = getStoryVariant(HeaderDismiss, HIGH_CONTRAST);

export const TitleDismiss = () => renderDismiss('Title');
export const TitleDismissDarkMode = getStoryVariant(TitleDismiss, DARK_MODE);
export const TitleDismissHighContrast = getStoryVariant(TitleDismiss, HIGH_CONTRAST);
