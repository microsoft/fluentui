import * as React from 'react';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import type { Meta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { Avatar } from '@fluentui/react-avatar';
import { Steps, type StoryParameters } from 'storywright';
import { makeStyles } from '@griffel/react';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'InteractionTag Converged',
  component: InteractionTag,
  parameters: {
    storyWright: { steps: new Steps().snapshot('default').end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof InteractionTag>;

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

// selected
export const Selected = () => (
  <InteractionTag selected>
    <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary />
  </InteractionTag>
);
export const SelectedHighContrast = getStoryVariant(Selected, HIGH_CONTRAST);
export const SelectedDarkMode = getStoryVariant(Selected, DARK_MODE);

export const OutlineSelected = () => (
  <InteractionTag appearance="outline" selected>
    <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary />
  </InteractionTag>
);
export const OutlineSelectedHighContrast = getStoryVariant(OutlineSelected, HIGH_CONTRAST);
export const OutlineSelectedDarkMode = getStoryVariant(OutlineSelected, DARK_MODE);

export const BrandSelected = () => (
  <InteractionTag appearance="brand" selected>
    <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
      Primary Text
    </InteractionTagPrimary>
    <InteractionTagSecondary />
  </InteractionTag>
);
export const BrandSelectedHighContrast = getStoryVariant(BrandSelected, HIGH_CONTRAST);
export const BrandSelectedDarkMode = getStoryVariant(BrandSelected, DARK_MODE);

const useBoxSizingContainerStyles = makeStyles({
  container: {
    boxSizing: 'border-box',
    '& *, & *::before, & *::after': {
      boxSizing: 'inherit',
    },
  },
});

// Make sure the icon measurements are correct when `box-sizing` default value is `border-box`
// https://github.com/microsoft/fluentui/issues/32952
export const WithIconBoxSizing = () => {
  const styles = useBoxSizingContainerStyles();

  return (
    <div className={styles.container}>
      <InteractionTag>
        <InteractionTagPrimary icon={<CalendarMonth />}>Primary Text</InteractionTagPrimary>
      </InteractionTag>
    </div>
  );
};
