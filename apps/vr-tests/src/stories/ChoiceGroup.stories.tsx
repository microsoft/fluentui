import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';
import { TestImages } from '@fluentui/example-data';

const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Selected' },
  { key: 'B', text: 'Unselected' },
  { key: 'C', text: 'Disabled', disabled: true },
];

export default {
  title: 'ChoiceGroup',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('div.ms-ChoiceField:nth-of-type(1)')
        .snapshot('hover unselected', { cropTo: '.testWrapper' })
        .click('div.ms-ChoiceField:nth-of-type(1)')
        .snapshot('selected', { cropTo: '.testWrapper' })
        .click('div.ms-ChoiceField:nth-of-type(1)')
        .hover('div.ms-ChoiceField:nth-of-type(1)')
        .snapshot('hover selected', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
};

export const Root = () => <ChoiceGroup options={options} label="Pick one" />;

export const Required = () => <ChoiceGroup options={options} label="Pick one" required />;

export const WithIcons = () => (
  <ChoiceGroup
    label="Pick one icon"
    options={[
      {
        key: 'day',
        iconProps: { iconName: 'CalendarDay' },
        text: 'Day',
      },
      {
        key: 'week',
        iconProps: { iconName: 'CalendarWeek' },
        text: 'Week',
      },
      {
        key: 'month',
        iconProps: { iconName: 'Calendar' },
        text: 'Month',
        disabled: true,
      },
    ]}
  />
);

WithIcons.storyName = 'With icons';

export const WithIconsRTL = getStoryVariant(WithIcons, RTL);

export const WithDefaultSizeImages = () => (
  <ChoiceGroup
    label="Pick one image"
    options={[
      {
        key: 'bar',
        imageSrc: TestImages.choiceGroupBarUnselected,
        selectedImageSrc: TestImages.choiceGroupBarSelected,
        text: 'Clustered bar chart',
      },
      {
        key: 'pie',
        imageSrc: TestImages.choiceGroupBarUnselected,
        selectedImageSrc: TestImages.choiceGroupBarSelected,
        text: 'Pie chart',
      },
    ]}
  />
);

WithDefaultSizeImages.storyName = 'With default size images';

export const WithLargeSizeImages = () => (
  <ChoiceGroup
    label="Pick one image"
    options={[
      {
        key: 'bar2',
        imageSrc: TestImages.choiceGroupBarUnselected,
        selectedImageSrc: TestImages.choiceGroupBarSelected,
        imageSize: { width: 120, height: 120 },
        text: 'Clustered bar chart',
      },
      {
        key: 'pie2',
        imageSrc: TestImages.choiceGroupBarUnselected,
        selectedImageSrc: TestImages.choiceGroupBarSelected,
        imageSize: { width: 120, height: 120 },
        text: 'Pie chart',
      },
    ]}
  />
);

WithLargeSizeImages.storyName = 'With large size images';
