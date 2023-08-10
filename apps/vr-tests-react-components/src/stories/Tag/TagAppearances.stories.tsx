import * as React from 'react';
import { Tag } from '@fluentui/react-tags-preview';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST } from '../../utilities';
import { Steps } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const tagId = 'tag-id';
const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover(`#${tagId}}`)
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown(`#${tagId}}`)
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'Tag Converged',
  Component: Tag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof Tag>;

export const Filled = () => (
  <Tag id={tagId} appearance="filled" dismissible icon={<CalendarMonth />}>
    Primary Text
  </Tag>
);

export const FilledHighContrast = getStoryVariant(Filled, HIGH_CONTRAST);
export const FilledDarkMode = getStoryVariant(Filled, DARK_MODE);

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
