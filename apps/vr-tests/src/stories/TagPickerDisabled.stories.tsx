import * as React from 'react';
import { Steps, Keys } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { TagPicker, ITag } from '@fluentui/react';

const testTags: ITag[] = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'magenta',
  'mauve',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'violet',
  'white',
  'yellow',
].map(item => ({ key: item, name: item }));

const getList = () => testTags;

export default {
  title: 'TagPicker',
  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-BasePicker-input')
        .setValue('.ms-BasePicker-input', 'a')
        .snapshot('Open Suggestion Menu', { cropTo: '.testWrapper' })
        .hover('.ms-Suggestions-item')
        .snapshot('Suggestion Menu Item Hover', { cropTo: '.testWrapper' })
        .keys('.ms-BasePicker-input', Keys.upArrow)
        .end(),
    ),
  ],
};

export const Disabled = () => <TagPicker onResolveSuggestions={getList} disabled />;

Disabled.storyName = 'TagPicker disabled';
