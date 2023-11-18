import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Pivot, PivotItem, IPivotItemProps, Icon, Fabric } from '@fluentui/react';

storiesOf('Pivot', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Pivot-link.is-selected')
        .snapshot('hover-selected', { cropTo: '.testWrapper' })
        .hover('.ms-Pivot-link:not(.is-selected)')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Pivot-link:not(.is-selected)')
        .hover('.ms-Pivot-link.is-selected')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => (
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
  ))

  .addStory(
    'Count and icon',
    () => (
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
    ),
    { includeRtl: true },
  )
  .addStory('Large', () => (
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
  ))
  .addStory(
    'Tabs',
    () => (
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
    ),
    { includeRtl: true },
  )
  .addStory('Tabs large', () => (
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
  ));

storiesOf('Pivot - Overflow', module)
  .addDecorator(story => (
    <div style={{ display: 'flex' }}>
      <div id="testWrapper" className="testWrapper" style={{ padding: '10px 10px 200px' }}>
        {story()}
      </div>
    </div>
  ))
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
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
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => (
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
  ))
  .addStory('Tabs - RTL', () => (
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
  ));

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
