import * as React from 'react';
import { InteractionTag } from '@fluentui/react-tags-preview';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { Avatar } from '@fluentui/react-avatar';
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

export const Default = () => <InteractionTag content={{ id: contentId }}>Primary Text</InteractionTag>;

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

// slots
export const Icon = () => (
  <InteractionTag content={{ id: contentId }} icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const IconRTL = getStoryVariant(Icon, RTL);

export const Media = () => (
  <InteractionTag content={{ id: contentId }} media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </InteractionTag>
);
export const MediaRTL = getStoryVariant(Media, RTL);

export const Dismissible = () => (
  <InteractionTag content={{ id: contentId }} dismissible dismissButton={{ id: dismissButtonId }}>
    Primary Text
  </InteractionTag>
);
export const DismissibleRTL = getStoryVariant(Dismissible, RTL);

export const SecondaryText = () => (
  <InteractionTag content={{ id: contentId }} secondaryText="Secondary Text">
    Primary Text
  </InteractionTag>
);

// shape
export const Circular = () => (
  <InteractionTag content={{ id: contentId }} shape="circular">
    Primary Text
  </InteractionTag>
);
export const CircularWithMedia = () => (
  <InteractionTag
    content={{ id: contentId }}
    shape="circular"
    media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}
  >
    Primary Text
  </InteractionTag>
);
export const CircularDismissible = () => (
  <InteractionTag content={{ id: contentId }} shape="circular" dismissible dismissButton={{ id: dismissButtonId }}>
    Primary Text
  </InteractionTag>
);

// appearance
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

// disabled
export const Disabled = () => (
  <InteractionTag
    content={{ id: contentId }}
    disabled
    dismissible
    dismissButton={{ id: dismissButtonId }}
    icon={<CalendarMonth />}
  >
    Primary Text
  </InteractionTag>
);
export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const OutlineDisabled = () => (
  <InteractionTag
    content={{ id: contentId }}
    appearance="outline"
    disabled
    dismissible
    dismissButton={{ id: dismissButtonId }}
    icon={<CalendarMonth />}
  >
    Primary Text
  </InteractionTag>
);
export const OutlineDisabledHighContrast = getStoryVariant(OutlineDisabled, HIGH_CONTRAST);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);

export const BrandDisabled = () => (
  <InteractionTag
    content={{ id: contentId }}
    appearance="brand"
    disabled
    dismissible
    dismissButton={{ id: dismissButtonId }}
    icon={<CalendarMonth />}
  >
    Primary Text
  </InteractionTag>
);
export const BrandDisabledHighContrast = getStoryVariant(BrandDisabled, HIGH_CONTRAST);
export const BrandDisabledDarkMode = getStoryVariant(BrandDisabled, DARK_MODE);

// size
export const SizeSmall = () => (
  <InteractionTag content={{ id: contentId }} size="small">
    Primary Text
  </InteractionTag>
);
export const SizeSmallDismissible = () => (
  <InteractionTag content={{ id: contentId }} size="small" dismissible dismissButton={{ id: dismissButtonId }}>
    Primary Text
  </InteractionTag>
);
export const SizeSmallWithIcon = () => (
  <InteractionTag content={{ id: contentId }} size="small" icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const SizeSmallWithMedia = () => (
  <InteractionTag
    content={{ id: contentId }}
    size="small"
    media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}
  >
    Primary Text
  </InteractionTag>
);

export const SizeExtraSmall = () => (
  <InteractionTag content={{ id: contentId }} size="extra-small">
    Primary Text
  </InteractionTag>
);
export const SizeExtraSmallDismissible = () => (
  <InteractionTag content={{ id: contentId }} size="extra-small" dismissible dismissButton={{ id: dismissButtonId }}>
    Primary Text
  </InteractionTag>
);
export const SizeExtraSmallWithIcon = () => (
  <InteractionTag content={{ id: contentId }} size="extra-small" icon={<CalendarMonth />}>
    Primary Text
  </InteractionTag>
);
export const SizeExtraSmallWithMedia = () => (
  <InteractionTag
    content={{ id: contentId }}
    size="extra-small"
    media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}
  >
    Primary Text
  </InteractionTag>
);
