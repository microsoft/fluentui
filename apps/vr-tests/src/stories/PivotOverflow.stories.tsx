import * as React from 'react';
import { Steps } from 'storywright';
import { Pivot, PivotItem, IPivotItemProps, Icon, Fabric } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

export default {
  title: 'Pivot - Overflow',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .executeScript('document.getElementById("testWrapper").style.width = "500px"')
        .snapshot('Medium', { cropTo: '.testWrapper' })
        .executeScript('document.getElementById("testWrapper").style.width = "750px"')
        .snapshot('Wide', { cropTo: '.testWrapper' })
        .executeScript('document.getElementById("testWrapper").style.width = "250px"')
        .click('.ms-Pivot-overflowMenuButton')
        .wait(1500)
        .click('.ms-Pivot-linkInMenu[data-last-tab]')
        .snapshot('Narrow - Last tab selected', { cropTo: '.testWrapper' })
        .click('.ms-Pivot-overflowMenuButton')
        .wait(1500)
        .hover('.ms-Pivot-overflowMenuButton')
        .snapshot('Narrow - Overflow menu', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
  parameters: {
    testWrapperStyle: { paddingBottom: '200px' },
  },
};

export const Root = () => (
  <Pivot overflowBehavior="menu">
    <PivotItem headerText="My Files">
      <p>Pivot #1</p>
    </PivotItem>
    <PivotItem itemCount={23} itemIcon="Recent">
      <p>Pivot #2</p>
    </PivotItem>
    <PivotItem headerText="Placeholder" itemIcon="Globe">
      <p>Pivot #3</p>
    </PivotItem>
    <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
      <p>Pivot #4</p>
    </PivotItem>
    <PivotItem headerText="Custom Renderer" itemIcon="Airplane" onRenderItemLink={_customRenderer}>
      <p>Pivot #5</p>
    </PivotItem>
    <PivotItem headerText="The Last Tab" headerButtonProps={{ 'data-last-tab': 'true' }}>
      <p>Pivot #6</p>
    </PivotItem>
  </Pivot>
);

export const TabsRTL = () => (
  <Fabric dir="rtl">
    <Pivot overflowBehavior="menu" linkFormat="tabs">
      <PivotItem headerText="My Files">
        <p>Pivot #1</p>
      </PivotItem>
      <PivotItem itemCount={23} itemIcon="Recent">
        <p>Pivot #2</p>
      </PivotItem>
      <PivotItem headerText="Placeholder" itemIcon="Globe">
        <p>Pivot #3</p>
      </PivotItem>
      <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
        <p>Pivot #4</p>
      </PivotItem>
      <PivotItem
        headerText="Custom Renderer"
        itemIcon="Airplane"
        onRenderItemLink={_customRenderer}
      >
        <p>Pivot #5</p>
      </PivotItem>
      <PivotItem headerText="The Last Tab" headerButtonProps={{ 'data-last-tab': 'true' }}>
        <p>Pivot #6</p>
      </PivotItem>
    </Pivot>
  </Fabric>
);
TabsRTL.storyName = 'Tabs - RTL';

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
