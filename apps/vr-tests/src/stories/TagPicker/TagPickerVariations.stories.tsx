import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TagPicker, Fabric, ITag } from '@fluentui/react';
import { TestWrapperDecoratorFixedWidth } from '../../utilities';

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
  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof TagPicker>;

export const WithLongTag = () => (
  // This example MUST be inside a narrow container which forces the tag to overflow
  <Fabric style={{ width: 180 }}>
    <TagPicker
      onResolveSuggestions={getList}
      defaultSelectedItems={[
        {
          key: 'test',
          name: 'Very very long tag (this part should be truncated)',
        },
      ]}
    />
  </Fabric>
);

WithLongTag.storyName = 'With long tag';
