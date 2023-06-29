import * as React from 'react';
import { InteractionTag } from '@fluentui/react-tags';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { tagId, steps } from './utils';
import { Avatar } from '@fluentui/react-avatar';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'InteractionTag Converged',
  Component: InteractionTag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof InteractionTag>;

export const Default = () => <InteractionTag id={tagId}>Primary Text</InteractionTag>;

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

// slots
export const Icon = () => (
  <InteractionTag id={tagId} icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const IconRTL = getStoryVariant(Icon, RTL);

export const Media = () => (
  <InteractionTag id={tagId} media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </InteractionTag>
);
export const MediaRTL = getStoryVariant(Media, RTL);

export const Dismissible = () => (
  <InteractionTag id={tagId} dismissible>
    Primary Text
  </InteractionTag>
);
export const DismissibleRTL = getStoryVariant(Dismissible, RTL);

export const SecondaryText = () => (
  <InteractionTag id={tagId} secondaryText="Secondary Text">
    Primary Text
  </InteractionTag>
);

// shape
export const Circular = () => (
  <InteractionTag id={tagId} shape="circular">
    Primary Text
  </InteractionTag>
);
export const CircularWithMedia = () => (
  <InteractionTag id={tagId} shape="circular" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </InteractionTag>
);
export const CircularDismissible = () => (
  <InteractionTag id={tagId} shape="circular" dismissible>
    Primary Text
  </InteractionTag>
);

// appearance
export const Outline = () => (
  <InteractionTag id={tagId} appearance="outline" dismissible icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const OutlineHighContrast = getStoryVariant(Outline, HIGH_CONTRAST);
export const OutlineDarkMode = getStoryVariant(Outline, DARK_MODE);

export const Brand = () => (
  <InteractionTag id={tagId} appearance="brand" dismissible icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const BrandHighContrast = getStoryVariant(Brand, HIGH_CONTRAST);
export const BrandDarkMode = getStoryVariant(Brand, DARK_MODE);

// disabled
export const Disabled = () => (
  <InteractionTag id={tagId} disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const OutlineDisabled = () => (
  <InteractionTag id={tagId} appearance="outline" disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const OutlineDisabledHighContrast = getStoryVariant(OutlineDisabled, HIGH_CONTRAST);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);

export const BrandDisabled = () => (
  <InteractionTag id={tagId} appearance="brand" disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const BrandDisabledHighContrast = getStoryVariant(BrandDisabled, HIGH_CONTRAST);
export const BrandDisabledDarkMode = getStoryVariant(BrandDisabled, DARK_MODE);

// size
export const SizeSmall = () => (
  <InteractionTag id={tagId} size="small">
    Primary Text
  </InteractionTag>
);
export const SizeSmallDismissible = () => (
  <InteractionTag id={tagId} size="small" dismissible>
    Primary Text
  </InteractionTag>
);
export const SizeSmallWithIcon = () => (
  <InteractionTag id={tagId} size="small" icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const SizeSmallWithMedia = () => (
  <InteractionTag id={tagId} size="small" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </InteractionTag>
);

export const SizeExtraSmall = () => (
  <InteractionTag id={tagId} size="extra-small">
    Primary Text
  </InteractionTag>
);
export const SizeExtraSmallDismissible = () => (
  <InteractionTag id={tagId} size="extra-small" dismissible>
    Primary Text
  </InteractionTag>
);
export const SizeExtraSmallWithIcon = () => (
  <InteractionTag id={tagId} size="extra-small" icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const SizeExtraSmallWithMedia = () => (
  <InteractionTag id={tagId} size="extra-small" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </InteractionTag>
);
