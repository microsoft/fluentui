import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { ResizeGroup, OverflowSet } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';

const list = {
  primary: [
    { key: 'item0', name: 'Item 0', iconProps: { iconName: 'Add' }, checked: false },
    { key: 'item1', name: 'Item 1', iconProps: { iconName: 'Share' }, checked: false },
    { key: 'item2', name: 'Item 2', iconProps: { iconName: 'Upload' }, checked: false },
    { key: 'item3', name: 'Item 3', iconProps: { iconName: 'Add' }, checked: false },
    { key: 'item4', name: 'Item 4', iconProps: { iconName: 'Share' }, checked: false },
    { key: 'item5', name: 'Item 5', iconProps: { iconName: 'Upload' }, checked: false },
  ],
  overflow: [
    { key: 'item6', name: 'Item 6', iconProps: { iconName: 'Add' }, checked: false },
    { key: 'item7', name: 'Item 7', iconProps: { iconName: 'Share' }, checked: false },
    { key: 'item8', name: 'Item 8', iconProps: { iconName: 'Upload' }, checked: false },
    { key: 'item9', name: 'Item 9', iconProps: { iconName: 'Add' }, checked: false },
    { key: 'item10', name: 'Item 10', iconProps: { iconName: 'Share' }, checked: false },
  ],
};

const noop = () => null;

export default {
  title: 'ResizeGroup',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.OverflowButton')
        .hover('.OverflowButton')
        .snapshot('click overflow')
        .end(),
    ),
  ],
};

export const Root = () => (
  <ResizeGroup
    data={list}
    onReduceData={noop}
    onRenderData={data => {
      return (
        <OverflowSet
          items={data.primary}
          overflowItems={data.overflow.length ? data.overflow : null}
          onRenderItem={item => {
            return (
              <DefaultButton
                text={item.name}
                iconProps={item.iconProps}
                onClick={item.onClick}
                checked={item.checked}
              />
            );
          }}
          onRenderOverflowButton={overflowItems => (
            <DefaultButton className="OverflowButton" menuProps={{ items: overflowItems! }} />
          )}
        />
      );
    }}
  />
);

export const RootRTL = getStoryVariant(Root, RTL);
