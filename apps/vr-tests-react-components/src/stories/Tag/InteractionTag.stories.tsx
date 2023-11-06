import * as React from 'react';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { Avatar } from '@fluentui/react-avatar';
import { Steps } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();

export default {
  title: 'InteractionTag Converged',
  Component: InteractionTag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof InteractionTag>;

export const Default = () => (
  <InteractionTag>
    <InteractionTagPrimary>Primary Text</InteractionTagPrimary>
  </InteractionTag>
);

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

// disabled
export const Disabled = () => (
  <InteractionTag disabled>
    <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary />
  </InteractionTag>
);
export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const OutlineDisabled = () => (
  <InteractionTag appearance="outline" disabled>
    <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary />
  </InteractionTag>
);
export const OutlineDisabledHighContrast = getStoryVariant(OutlineDisabled, HIGH_CONTRAST);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);

export const BrandDisabled = () => (
  <InteractionTag appearance="brand" disabled>
    <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary />
  </InteractionTag>
);
export const BrandDisabledHighContrast = getStoryVariant(BrandDisabled, HIGH_CONTRAST);
export const BrandDisabledDarkMode = getStoryVariant(BrandDisabled, DARK_MODE);

// size
export const SizeSmall = () => (
  <InteractionTag size="small">
    <InteractionTagPrimary>Primary Text</InteractionTagPrimary>
  </InteractionTag>
);
export const SizeSmallDismissible = () => (
  <InteractionTag size="small">
    <InteractionTagPrimary hasSecondaryAction>Primary Text</InteractionTagPrimary>
    <InteractionTagSecondary />
  </InteractionTag>
);
export const SizeSmallWithIcon = () => (
  <InteractionTag size="small">
    <InteractionTagPrimary icon={<CalendarMonth />}>Primary Text</InteractionTagPrimary>
  </InteractionTag>
);
export const SizeSmallWithMedia = () => (
  <InteractionTag size="small">
    <InteractionTagPrimary media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
      Primary Text
    </InteractionTagPrimary>
  </InteractionTag>
);

export const SizeExtraSmall = () => (
  <InteractionTag size="extra-small">
    <InteractionTagPrimary>Primary Text</InteractionTagPrimary>
  </InteractionTag>
);
export const SizeExtraSmallDismissible = () => (
  <InteractionTag size="extra-small">
    <InteractionTagPrimary hasSecondaryAction>Primary Text</InteractionTagPrimary>
    <InteractionTagSecondary />
  </InteractionTag>
);
export const SizeExtraSmallWithIcon = () => (
  <InteractionTag size="extra-small">
    <InteractionTagPrimary icon={<CalendarMonth />}>Primary Text</InteractionTagPrimary>
  </InteractionTag>
);
export const SizeExtraSmallWithMedia = () => (
  <InteractionTag size="extra-small">
    <InteractionTagPrimary media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
      Primary Text
    </InteractionTagPrimary>
  </InteractionTag>
);
