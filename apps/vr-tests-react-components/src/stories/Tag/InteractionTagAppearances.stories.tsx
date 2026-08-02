import * as React from 'react';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import type { Meta } from '@storybook/react-webpack5';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';
import type { StoryParameters } from 'storywright';
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
  parameters: { storyWright: { steps } } satisfies StoryParameters,
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

/*
 * S-J state-matrix story (migration/griffel-to-tailwind/reports/griffel-zero-plan.md §2.2):
 * `useRootStyles.selected` (arg #5) re-colours the FILLED glyph on hover/active — visible
 * only when the filled glyph is displayed, i.e. compounded with `outline`'s (arg #4)
 * hover/active display swap on the same element. The two blocks tie at 0-2-0 and file
 * position must keep arg #5 over arg #4 (colorNeutralForegroundOnBrand wins). No story
 * above combines `selected` with an icon and the hover/pressed steps.
 */
export const OutlineSelected = () => (
  <InteractionTag appearance="outline" selected>
    <InteractionTagPrimary id={contentId} icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary id={dismissButtonId} />
  </InteractionTag>
);
export const OutlineSelectedHighContrast = getStoryVariant(OutlineSelected, HIGH_CONTRAST);
export const OutlineSelectedDarkMode = getStoryVariant(OutlineSelected, DARK_MODE);
