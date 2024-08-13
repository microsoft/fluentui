import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '../../utilities';
import {
  Multiselect,
  MultiselectChecked,
  MultiselectMixed,
  PrimaryCell,
  SizeExtraSmall,
  SizeMedium,
  SizeSmall,
  SingleSelectChecked,
  SingleSelect,
} from './utils';

export default {
  title: 'Table layout table',
} satisfies Meta<typeof Table>;

export const SizeMediumStory = () => <SizeMedium noNativeElements={false} />;
SizeMediumStory.storyName = 'size - medium';

export const SizeMediumRTLStory = getStoryVariant(SizeMediumStory, RTL);

export const SizeMediumHighContrastStory = getStoryVariant(SizeMediumStory, HIGH_CONTRAST);

export const SizeMediumDarkModeStory = getStoryVariant(SizeMediumStory, DARK_MODE);

export const SizeSmallStory = () => <SizeSmall noNativeElements={false} />;
SizeSmallStory.storyName = 'size - small';

export const SizeExtraSmallStory = () => <SizeExtraSmall noNativeElements={false} />;
SizeExtraSmallStory.storyName = 'size - extra small';

export const PrimaryCellStory = () => <PrimaryCell noNativeElements={false} />;
PrimaryCellStory.storyName = 'primary cell';

export const MultiselectStory = () => <Multiselect noNativeElements={false} />;
MultiselectStory.storyName = 'multiselect';

export const MultiselectRTLStory = getStoryVariant(MultiselectStory, RTL);

export const MultiselectHighContrastStory = getStoryVariant(MultiselectStory, HIGH_CONTRAST);

export const MultiselectDarkModeStory = getStoryVariant(MultiselectStory, DARK_MODE);

export const MultiselectCheckedBrand = () => (
  <MultiselectChecked noNativeElements={false} selectedRowAppearance="brand" />
);
MultiselectCheckedBrand.storyName = 'multiselect (checked) - brand';

export const MultiselectCheckedBrandRTL = getStoryVariant(MultiselectCheckedBrand, RTL);

export const MultiselectCheckedBrandHighContrast = getStoryVariant(MultiselectCheckedBrand, HIGH_CONTRAST);

export const MultiselectCheckedBrandDarkMode = getStoryVariant(MultiselectCheckedBrand, DARK_MODE);

export const MultiselectMixedBrand = () => <MultiselectMixed noNativeElements={false} selectedRowAppearance="brand" />;
MultiselectMixedBrand.storyName = 'multiselect (mixed) - brand';

export const MultiselectMixedBrandRTL = getStoryVariant(MultiselectMixedBrand, RTL);

export const MultiselectMixedBrandHighContrast = getStoryVariant(MultiselectMixedBrand, HIGH_CONTRAST);

export const MultiselectMixedBrandDarkMode = getStoryVariant(MultiselectMixedBrand, DARK_MODE);

export const SingleSelectStory = () => <SingleSelect noNativeElements={false} />;
SingleSelectStory.storyName = 'single select';

export const SingleSelectRTLStory = getStoryVariant(SingleSelectStory, RTL);

export const SingleSelectHighContrastStory = getStoryVariant(SingleSelectStory, HIGH_CONTRAST);

export const SingleSelectDarkModeStory = getStoryVariant(SingleSelectStory, DARK_MODE);

export const SingleSelectCheckedBrand = () => (
  <SingleSelectChecked noNativeElements={false} selectedRowAppearance="brand" />
);
SingleSelectCheckedBrand.storyName = 'single select (checked) - brand';

export const SingleSelectCheckedBrandRTL = getStoryVariant(SingleSelectCheckedBrand, RTL);

export const SingleSelectCheckedBrandHighContrast = getStoryVariant(SingleSelectCheckedBrand, HIGH_CONTRAST);

export const SingleSelectCheckedBrandDarkMode = getStoryVariant(SingleSelectCheckedBrand, DARK_MODE);

export const MultiselectCheckedNeutral = () => (
  <MultiselectChecked noNativeElements={false} selectedRowAppearance="neutral" />
);
MultiselectCheckedNeutral.storyName = 'multiselect (checked) - neutral';

export const MultiselectCheckedNeutralRTL = getStoryVariant(MultiselectCheckedNeutral, RTL);

export const MultiselectCheckedNeutralHighContrast = getStoryVariant(MultiselectCheckedNeutral, HIGH_CONTRAST);

export const MultiselectCheckedNeutralDarkMode = getStoryVariant(MultiselectCheckedNeutral, DARK_MODE);

export const MultiselectMixedNeutral = () => (
  <MultiselectMixed noNativeElements={false} selectedRowAppearance="neutral" />
);
MultiselectMixedNeutral.storyName = 'multiselect (mixed) - neutral';

export const MultiselectMixedNeutralRTL = getStoryVariant(MultiselectMixedNeutral, RTL);

export const MultiselectMixedNeutralHighContrast = getStoryVariant(MultiselectMixedNeutral, HIGH_CONTRAST);

export const MultiselectMixedNeutralDarkMode = getStoryVariant(MultiselectMixedNeutral, DARK_MODE);

export const SingleSelectCheckedNeutral = () => (
  <SingleSelectChecked noNativeElements={false} selectedRowAppearance="neutral" />
);
SingleSelectCheckedNeutral.storyName = 'single select (checked) - neutral';

export const SingleSelectCheckedNeutralRTL = getStoryVariant(SingleSelectCheckedNeutral, RTL);

export const SingleSelectCheckedNeutralHighContrast = getStoryVariant(SingleSelectCheckedNeutral, HIGH_CONTRAST);

export const SingleSelectCheckedNeutralDarkMode = getStoryVariant(SingleSelectCheckedNeutral, DARK_MODE);

export const SingleSelectCheckedStory = () => <SingleSelectChecked noNativeElements={false} />;
SingleSelectCheckedStory.storyName = 'single select (checked)';

export const SingleSelectCheckedRTLStory = getStoryVariant(SingleSelectCheckedStory, RTL);

export const SingleSelectCheckedHighContrastStory = getStoryVariant(SingleSelectCheckedStory, HIGH_CONTRAST);

export const SingleSelectCheckedDarkModeStory = getStoryVariant(SingleSelectCheckedStory, DARK_MODE);
