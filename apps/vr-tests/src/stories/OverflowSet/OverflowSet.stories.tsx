import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { Fabric, OverflowSet, IOverflowSetItemProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';

const onRenderItem = (item: IOverflowSetItemProps) => item.name;
const onRenderOverflowButton = (overflowItems: any[]) => {
  return <IconButton menuProps={{ items: overflowItems! }} />;
};

export default {
  title: 'OverflowSet',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-Button-flexContainer')
        .hover('.ms-Button-flexContainer')
        .snapshot('default')
        .end(),
    ),
  ],
};

export const Root = () => (
  <Fabric>
    <OverflowSet
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

export const RootRTL = getStoryVariant(Root, RTL);
