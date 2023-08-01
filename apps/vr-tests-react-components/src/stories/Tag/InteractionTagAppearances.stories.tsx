import * as React from 'react';
import { InteractionTag } from '@fluentui/react-tags-preview';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST } from '../../utilities';
import { Steps } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const contentId = 'content-id';
const dismissButtonId = 'dismiss-button-id';
const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover(`#${contentId}`)
  .snapshot('hover content', { cropTo: '.testWrapper' })
  .mouseDown(`#${contentId}`)
  .snapshot('pressed content', { cropTo: '.testWrapper' })
  .hover(`#${dismissButtonId}`)
  .snapshot('hover dismiss', { cropTo: '.testWrapper' })
  .mouseDown(`#${dismissButtonId}`)
  .snapshot('pressed dismiss', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'InteractionTag Converged',
  Component: InteractionTag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof InteractionTag>;

export const Filled = () => (
  <InteractionTag
    content={{ id: contentId }}
    appearance="filled"
    dismissible
    dismissButton={{ id: dismissButtonId }}
    icon={<CalendarMonth />}
  >
    Primary Text
  </InteractionTag>
);
export const FilledHighContrast = getStoryVariant(Filled, HIGH_CONTRAST);
export const FilledDarkMode = getStoryVariant(Filled, DARK_MODE);

export const Outline = () => (
  <InteractionTag
    content={{ id: contentId }}
    appearance="outline"
    dismissible
    dismissButton={{ id: dismissButtonId }}
    icon={<CalendarMonth />}
  >
    Primary Text
  </InteractionTag>
);
export const OutlineHighContrast = getStoryVariant(Outline, HIGH_CONTRAST);
export const OutlineDarkMode = getStoryVariant(Outline, DARK_MODE);

export const Brand = () => (
  <InteractionTag
    content={{ id: contentId }}
    appearance="brand"
    dismissible
    dismissButton={{ id: dismissButtonId }}
    icon={<CalendarMonth />}
  >
    Primary Text
  </InteractionTag>
);
export const BrandHighContrast = getStoryVariant(Brand, HIGH_CONTRAST);
export const BrandDarkMode = getStoryVariant(Brand, DARK_MODE);
