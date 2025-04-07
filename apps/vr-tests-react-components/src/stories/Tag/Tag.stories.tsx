import * as React from 'react';
import { Tag } from '@fluentui/react-tags';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import type { Meta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { Avatar } from '@fluentui/react-avatar';
import { Steps } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const steps = new Steps().snapshot('default').end();

export default {
  title: 'Tag Converged',
  component: Tag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} satisfies Meta<typeof Tag>;

export const Default = () => <Tag>Primary Text</Tag>;

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

// disabled
export const Disabled = () => (
  <Tag disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const OutlineDisabled = () => (
  <Tag appearance="outline" disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const OutlineDisabledHighContrast = getStoryVariant(OutlineDisabled, HIGH_CONTRAST);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);

export const BrandDisabled = () => (
  <Tag appearance="brand" disabled dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const BrandDisabledHighContrast = getStoryVariant(BrandDisabled, HIGH_CONTRAST);
export const BrandDisabledDarkMode = getStoryVariant(BrandDisabled, DARK_MODE);

// size
export const SizeSmall = () => <Tag size="small">Primary Text</Tag>;
export const SizeSmallDismissible = () => (
  <Tag size="small" dismissible>
    Primary Text
  </Tag>
);
export const SizeSmallWithIcon = () => (
  <Tag size="small" icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const SizeSmallWithMedia = () => (
  <Tag size="small" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </Tag>
);

export const SizeExtraSmall = () => <Tag size="extra-small">Primary Text</Tag>;
export const SizeExtraSmallDismissible = () => (
  <Tag size="extra-small" dismissible>
    Primary Text
  </Tag>
);
export const SizeExtraSmallWithIcon = () => (
  <Tag size="extra-small" icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const SizeExtraSmallWithMedia = () => (
  <Tag size="extra-small" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </Tag>
);

// selected
export const Selected = () => (
  <Tag selected dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const SelectedHighContrast = getStoryVariant(Selected, HIGH_CONTRAST);
export const SelectedDarkMode = getStoryVariant(Selected, DARK_MODE);

export const OutlineSelected = () => (
  <Tag appearance="outline" selected dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const OutlineSelectedHighContrast = getStoryVariant(OutlineSelected, HIGH_CONTRAST);
export const OutlineSelectedDarkMode = getStoryVariant(OutlineSelected, DARK_MODE);

export const BrandSelected = () => (
  <Tag appearance="brand" selected dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);
export const BrandSelectedHighContrast = getStoryVariant(BrandSelected, HIGH_CONTRAST);
export const BrandSelectedDarkMode = getStoryVariant(BrandSelected, DARK_MODE);
