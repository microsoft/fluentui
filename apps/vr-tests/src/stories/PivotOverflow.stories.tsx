import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { Pivot, PivotItem, IPivotItemProps, Icon, Fabric } from '@fluentui/react';

export default {
  title: 'Pivot - Overflow',

  decorators: [
    (story, context) => (
      <div style={{ display: 'flex' }}>
        <div
          className="testWrapper"
          style={{ padding: '10px', overflow: 'hidden', paddingBottom: '200px' }}
        >
          {story(context)}
        </div>
      </div>
    ),
  ],

  parameters: {
    storyWright: {
      steps: new Steps()
        .executeScript('document.querySelector(".testWrapper").style.width = "500px"')
        .snapshot('Medium', { cropTo: '.testWrapper' })
        .executeScript('document.querySelector(".testWrapper").style.width = "750px"')
        .snapshot('Wide', { cropTo: '.testWrapper' })
        .executeScript('document.querySelector(".testWrapper").style.width = "250px"')
        .snapshot('Narrow', { cropTo: '.testWrapper' })
        .click('.ms-Pivot-overflowMenuButton')
        .wait(2500)
        .snapshot('Narrow - Overflow menu open', { cropTo: '.testWrapper' })
        .click('.ms-Pivot-linkInMenu[data-last-tab]')
        .snapshot('Narrow - Last tab selected', { cropTo: '.testWrapper' })
        .click('.ms-Pivot-overflowMenuButton')
        .wait(2500)
        .hover('.ms-Pivot-overflowMenuButton')
        .snapshot('Narrow - Overflow menu', { cropTo: '.testWrapper' })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Pivot>;

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
  defaultRenderer: (link: IPivotItemProps) => React.ReactElement,
): React.ReactElement {
  return (
    <span style={{ flex: '0 1 100%' }}>
      {defaultRenderer({ ...link, itemIcon: undefined })}
      <Icon iconName={link.itemIcon} style={{ color: 'red' }} />
    </span>
  );
}
