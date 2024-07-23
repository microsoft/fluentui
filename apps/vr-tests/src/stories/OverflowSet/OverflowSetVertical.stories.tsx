import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { Fabric, OverflowSet, IOverflowSetItemProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';

const onRenderItem = (item: IOverflowSetItemProps) => item.name;
const onRenderOverflowButton = (overflowItems: any[]) => {
  return <IconButton menuProps={{ items: overflowItems! }} />;
};

export default {
  title: 'OverflowSet variant',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const VerticalDirection = () => (
  <Fabric>
    <OverflowSet
      vertical
      items={[
        { key: 'item1', name: 'Link 1' },
        { key: 'item2', name: 'Link 2' },
        { key: 'item3', name: 'Link 3' },
      ]}
      overflowItems={[
        { key: 'item4', name: 'Overflow Link 1' },
        { key: 'item5', name: 'Overflow Link 2' },
      ]}
      onRenderOverflowButton={onRenderOverflowButton}
      onRenderItem={onRenderItem}
    />
  </Fabric>
);
