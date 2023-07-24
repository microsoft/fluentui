import * as React from 'react';
import { InteractionTag } from '@fluentui/react-tags-preview';
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

export const Default = () => <InteractionTag>Primary Text</InteractionTag>;

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

// disabled
export const Disabled = () => (
  <InteractionTag disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const OutlineDisabled = () => (
  <InteractionTag appearance="outline" disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const OutlineDisabledHighContrast = getStoryVariant(OutlineDisabled, HIGH_CONTRAST);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);

export const BrandDisabled = () => (
  <InteractionTag appearance="brand" disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const BrandDisabledHighContrast = getStoryVariant(BrandDisabled, HIGH_CONTRAST);
export const BrandDisabledDarkMode = getStoryVariant(BrandDisabled, DARK_MODE);

// size
export const SizeSmall = () => <InteractionTag size="small">Primary Text</InteractionTag>;
export const SizeSmallDismissible = () => (
  <InteractionTag size="small" dismissible>
    Primary Text
  </InteractionTag>
);
export const SizeSmallWithIcon = () => (
  <InteractionTag size="small" icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const SizeSmallWithMedia = () => (
  <InteractionTag size="small" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </InteractionTag>
);

export const SizeExtraSmall = () => <InteractionTag size="extra-small">Primary Text</InteractionTag>;
export const SizeExtraSmallDismissible = () => (
  <InteractionTag size="extra-small" dismissible>
    Primary Text
  </InteractionTag>
);
export const SizeExtraSmallWithIcon = () => (
  <InteractionTag size="extra-small" icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const SizeExtraSmallWithMedia = () => (
  <InteractionTag size="extra-small" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </InteractionTag>
);
