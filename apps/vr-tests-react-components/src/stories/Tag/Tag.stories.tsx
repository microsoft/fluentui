import * as React from 'react';
import { Tag } from '@fluentui/react-tags-preview';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { tagId, steps } from './utils';
import { Avatar } from '@fluentui/react-avatar';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'Tag Converged',
  Component: Tag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof Tag>;

export const Default = () => <Tag id={tagId}>Primary Text</Tag>;

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

// slots
export const Icon = () => (
  <Tag id={tagId} icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const IconRTL = getStoryVariant(Icon, RTL);

export const Media = () => (
  <Tag id={tagId} media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </Tag>
);
export const MediaRTL = getStoryVariant(Media, RTL);

export const Dismissible = () => (
  <Tag id={tagId} dismissible>
    Primary Text
  </Tag>
);
export const DismissibleRTL = getStoryVariant(Dismissible, RTL);

export const SecondaryText = () => (
  <Tag id={tagId} secondaryText="Secondary Text">
    Primary Text
  </Tag>
);

// shape
export const Circular = () => (
  <Tag id={tagId} shape="circular">
    Primary Text
  </Tag>
);
export const CircularWithMedia = () => (
  <Tag id={tagId} shape="circular" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </Tag>
);
export const CircularDismissible = () => (
  <Tag id={tagId} shape="circular" dismissible>
    Primary Text
  </Tag>
);

// appearance
export const Outline = () => (
  <Tag id={tagId} appearance="outline" dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const OutlineHighContrast = getStoryVariant(Outline, HIGH_CONTRAST);
export const OutlineDarkMode = getStoryVariant(Outline, DARK_MODE);

export const Brand = () => (
  <Tag id={tagId} appearance="brand" dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const BrandHighContrast = getStoryVariant(Brand, HIGH_CONTRAST);
export const BrandDarkMode = getStoryVariant(Brand, DARK_MODE);

// disabled
export const Disabled = () => (
  <Tag id={tagId} disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const OutlineDisabled = () => (
  <Tag id={tagId} appearance="outline" disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const OutlineDisabledHighContrast = getStoryVariant(OutlineDisabled, HIGH_CONTRAST);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);

export const BrandDisabled = () => (
  <Tag id={tagId} appearance="brand" disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const BrandDisabledHighContrast = getStoryVariant(BrandDisabled, HIGH_CONTRAST);
export const BrandDisabledDarkMode = getStoryVariant(BrandDisabled, DARK_MODE);

// size
export const SizeSmall = () => (
  <Tag id={tagId} size="small">
    Primary Text
  </Tag>
);
export const SizeSmallDismissible = () => (
  <Tag id={tagId} size="small" dismissible>
    Primary Text
  </Tag>
);
export const SizeSmallWithIcon = () => (
  <Tag id={tagId} size="small" icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const SizeSmallWithMedia = () => (
  <Tag id={tagId} size="small" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </Tag>
);

export const SizeExtraSmall = () => (
  <Tag id={tagId} size="extra-small">
    Primary Text
  </Tag>
);
export const SizeExtraSmallDismissible = () => (
  <Tag id={tagId} size="extra-small" dismissible>
    Primary Text
  </Tag>
);
export const SizeExtraSmallWithIcon = () => (
  <Tag id={tagId} size="extra-small" icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const SizeExtraSmallWithMedia = () => (
  <Tag id={tagId} size="extra-small" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </Tag>
);
