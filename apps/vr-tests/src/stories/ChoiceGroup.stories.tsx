/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ChoiceGroup } from 'office-ui-fabric-react';
import { TestImages } from '../common/TestImages';

const options = [
  {
    key: 'A',
    text: 'Selected'
  },
  {
    key: 'B',
    text: 'Unselected',
  },
  {
    key: 'C',
    text: 'Disabled',
    disabled: true
  }
];

storiesOf('ChoiceGroup', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('div.ms-ChoiceField:nth-of-type(1)')
        .snapshot('hover selected', { cropTo: '.testWrapper' })
        .hover('div.ms-ChoiceField:nth-of-type(2)')
        .snapshot('hover unselected', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <ChoiceGroup
      defaultSelectedKey='A'
      options={ options }
      label='Pick one'
    />
  ))
  .add('Required', () => (
    <ChoiceGroup
      defaultSelectedKey='A'
      options={ options }
      label='Pick one'
      required
    />
  ))
  .add('With icons', () => (
    <ChoiceGroup
      label='Pick one icon'
      defaultSelectedKey='day'
      options={ [
        {
          key: 'day',
          iconProps: { iconName: 'CalendarDay' },
          text: 'Day'
        },
        {
          key: 'week',
          iconProps: { iconName: 'CalendarWeek' },
          text: 'Week'
        },
        {
          key: 'month',
          iconProps: { iconName: 'Calendar' },
          text: 'Month',
          disabled: true
        }
      ] }
    />
  ))
  .add('With images', () => (
    <ChoiceGroup
      label='Pick one image'
      defaultSelectedKey='bar'
      options={ [
        {
          key: 'bar',
          imageSrc: TestImages.choiceGroupBarUnselected,
          selectedImageSrc: TestImages.choiceGroupBarSelected,
          imageSize: { width: 32, height: 32 },
          text: 'Bar chart'
        },
        {
          key: 'pie',
          imageSrc: TestImages.choiceGroupBarUnselected,
          selectedImageSrc: TestImages.choiceGroupBarSelected,
          imageSize: { width: 32, height: 32 },
          text: 'Pie chart'
        }
      ] }
    />
  ));