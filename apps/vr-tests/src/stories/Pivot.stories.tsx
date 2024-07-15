import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Pivot, PivotItem, IPivotItemProps, Icon } from '@fluentui/react';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

export default {
  title: 'Pivot',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Pivot-link.is-selected')
        .snapshot('hover-selected', { cropTo: '.testWrapper' })
        .hover('.ms-Pivot-link:not(.is-selected)')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Pivot-link:not(.is-selected)')
        .hover('.ms-Pivot-link.is-selected')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
} satisfies Meta<typeof Pivot>;

export const Root = () => (
  <Pivot>
    <PivotItem headerText="My Files">
      <p>Pivot #1</p>
    </PivotItem>
    <PivotItem headerText="Recent">
      <p>Pivot #2</p>
    </PivotItem>
    <PivotItem headerText="Shared with me">
      <p>Pivot #3</p>
    </PivotItem>
  </Pivot>
);

export const CountAndIcon = () => (
  <Pivot>
    <PivotItem headerText="My Files" itemCount={42} itemIcon="Emoji2">
      <p>Pivot #1</p>
    </PivotItem>
    <PivotItem itemCount="20+" itemIcon="Recent">
      <p>Pivot #2</p>
    </PivotItem>
    <PivotItem itemIcon="Globe">
      <p>Pivot #3</p>
    </PivotItem>
    <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
      <p>Pivot #4</p>
    </PivotItem>
    <PivotItem
      headerText="Customized Rendering"
      itemIcon="Airplane"
      itemCount={10}
      onRenderItemLink={_customRenderer}
    >
      <p>Customized Rendering</p>
    </PivotItem>
  </Pivot>
);

CountAndIcon.storyName = 'Count and icon';

export const CountAndIconRTL = getStoryVariant(CountAndIcon, RTL);

export const Large = () => (
  <Pivot linkSize="large">
    <PivotItem headerText="My Files">
      <p>Pivot #1</p>
    </PivotItem>
    <PivotItem headerText="Recent">
      <p>Pivot #2</p>
    </PivotItem>
    <PivotItem headerText="Shared with me">
      <p>Pivot #3</p>
    </PivotItem>
  </Pivot>
);

export const Tabs = () => (
  <Pivot linkFormat="tabs">
    <PivotItem headerText="Foo">
      <p>Pivot #1</p>
    </PivotItem>
    <PivotItem headerText="Bar">
      <p>Pivot #2</p>
    </PivotItem>
    <PivotItem headerText="Bas">
      <p>Pivot #3</p>
    </PivotItem>
    <PivotItem headerText="Biz">
      <p>Pivot #4</p>
    </PivotItem>
  </Pivot>
);

export const TabsRTL = getStoryVariant(Tabs, RTL);

export const TabsLarge = () => (
  <Pivot linkFormat="tabs" linkSize="large">
    <PivotItem headerText="Foo">
      <p>Pivot #1</p>
    </PivotItem>
    <PivotItem headerText="Bar">
      <p>Pivot #2</p>
    </PivotItem>
    <PivotItem headerText="Bas">
      <p>Pivot #3</p>
    </PivotItem>
    <PivotItem headerText="Biz">
      <p>Pivot #4</p>
    </PivotItem>
  </Pivot>
);

TabsLarge.storyName = 'Tabs large';

function _customRenderer(
  link: IPivotItemProps,
  defaultRenderer: (link: IPivotItemProps) => JSX.Element,
): JSX.Element {
  return (
    <span style={{ flex: '0 1 100%' }}>
      {defaultRenderer({ ...link, itemIcon: undefined })}
      <Icon iconName={link.itemIcon} style={{ color: 'red' }} />
    </span>
  );
}
