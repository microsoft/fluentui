import * as React from 'react';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import type { Meta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST } from '../../utilities';
import { Steps } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const contentId = 'content-id';
const dismissButtonId = 'dismiss-button-id';
const steps = new Steps()
  .snapshot('default')
  .hover(`#${contentId}`)
  .snapshot('hover content')
  .mouseDown(`#${contentId}`)
  .snapshot('pressed content')
  .mouseUp(`#${contentId}`)
  .hover(`#${dismissButtonId}`)
  .snapshot('hover dismiss')
  .mouseDown(`#${dismissButtonId}`)
  .snapshot('pressed dismiss')
  .mouseUp(`#${dismissButtonId}`)
  .end();

export default {
  title: 'InteractionTag Converged',
  component: InteractionTag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} satisfies Meta<typeof InteractionTag>;

export const Filled = () => (
  <InteractionTag appearance="filled">
    <InteractionTagPrimary id={contentId} icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary id={dismissButtonId} />
  </InteractionTag>
);
export const FilledHighContrast = getStoryVariant(Filled, HIGH_CONTRAST);
export const FilledDarkMode = getStoryVariant(Filled, DARK_MODE);

export const Outline = () => (
  <InteractionTag appearance="outline">
    <InteractionTagPrimary id={contentId} icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary id={dismissButtonId} />
  </InteractionTag>
);
export const OutlineHighContrast = getStoryVariant(Outline, HIGH_CONTRAST);
export const OutlineDarkMode = getStoryVariant(Outline, DARK_MODE);

export const Brand = () => (
  <InteractionTag appearance="brand">
    <InteractionTagPrimary id={contentId} icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary id={dismissButtonId} />
  </InteractionTag>
);
export const BrandHighContrast = getStoryVariant(Brand, HIGH_CONTRAST);
export const BrandDarkMode = getStoryVariant(Brand, DARK_MODE);
