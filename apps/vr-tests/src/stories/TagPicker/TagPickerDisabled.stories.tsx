import * as React from 'react';
import { TagPicker, ITag } from '@fluentui/react';
import { TestWrapperDecorator } from '../../utilities';

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
  decorators: [TestWrapperDecorator],
};

export const Disabled = () => <TagPicker onResolveSuggestions={getList} disabled />;

Disabled.storyName = 'TagPicker disabled';
