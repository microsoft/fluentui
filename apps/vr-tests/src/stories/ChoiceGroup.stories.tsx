import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';
import { TestImages } from '@fluentui/example-data';

const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Selected' },
  { key: 'B', text: 'Unselected' },
  { key: 'C', text: 'Disabled', disabled: true },
];

storiesOf('ChoiceGroup', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('div.ms-ChoiceField:nth-of-type(1)')
        .snapshot('hover unselected', { cropTo: '.testWrapper' })
        .click('div.ms-ChoiceField:nth-of-type(1)')
        .snapshot('selected', { cropTo: '.testWrapper' })
        .click('div.ms-ChoiceField:nth-of-type(1)')
        .hover('div.ms-ChoiceField:nth-of-type(1)')
        .snapshot('hover selected', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () =>
    // prettier-ignore
    <ChoiceGroup
      options={ options }
      label="Pick one"
    />,
  )
  .addStory('Required', () =>
    // prettier-ignore
    <ChoiceGroup
      options={ options }
      label="Pick one"
      required
    />,
  )
  .addStory(
    'With icons',
    () => (
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
    ),
    { includeRtl: true },
  )
  .addStory('With default size images', () => (
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
  ))
  .addStory('With large size images', () => (
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
  ));
