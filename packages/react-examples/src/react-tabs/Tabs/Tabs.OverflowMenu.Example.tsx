import * as React from 'react';
import { Fabric, Icon, Label, Toggle } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { TabItemProps, Tabs, TabItem } from '@fluentui/react-tabs';

export const TabsOverflowMenuExample: React.FunctionComponent = () => {
  const [overflow, { toggle: toggleOverflow }] = useBoolean(true);
  const [tabs, { toggle: toggleTabs }] = useBoolean(false);
  const [rtl, { toggle: toggleRtl }] = useBoolean(false);

  return (
    <>
      <Fabric // eslint-disable-line deprecation/deprecation
        dir={rtl ? 'rtl' : 'ltr'}
      >
        <Tabs
          aria-label="Tabs Overflow Menu Example"
          tabFormat={tabs ? 'tabs' : 'links'}
          overflowBehavior={overflow ? 'menu' : 'none'}
        >
          <TabItem headerText="My Files">
            <Label>Tab #1</Label>
          </TabItem>
          <TabItem itemCount={23} itemIcon="Recent">
            <Label>Tab #2</Label>
          </TabItem>
          <TabItem headerText="Placeholder" itemIcon="Globe">
            <Label>Tab #3</Label>
          </TabItem>
          <TabItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
            <Label>Tab #4</Label>
          </TabItem>
          <TabItem headerText="Custom Renderer" itemIcon="Airplane" onRenderTab={_customRenderer}>
            <Label>Tab #5</Label>
          </TabItem>
          <TabItem headerText="This tab has a relatively long title">
            <Label>Tab #6</Label>
          </TabItem>
          <TabItem headerText="Short">
            <Label>Tab #7</Label>
          </TabItem>
          <TabItem headerText="The Last Tab">
            <Label>Tab #8</Label>
          </TabItem>
        </Tabs>
        {/* eslint-disable-next-line deprecation/deprecation */}
      </Fabric>
      <div style={{ background: '#EEE', marginTop: 10 }}>
        <Toggle label="overflow" offText="none" onText="menu" checked={overflow} onChange={toggleOverflow} />
        <Toggle label="tabFormat" offText="links" onText="tabs" checked={tabs} onChange={toggleTabs} />
        <Toggle label="direction" offText="ltr" onText="rtl" checked={rtl} onChange={toggleRtl} />
      </div>
    </>
  );
};

function _customRenderer(
  tab?: TabItemProps,
  defaultRenderer?: (tab?: TabItemProps) => JSX.Element | null,
): JSX.Element | null {
  if (!tab || !defaultRenderer) {
    return null;
  }

  return (
    <span style={{ flex: '0 1 100%' }}>
      {defaultRenderer({ ...tab, itemIcon: undefined })}
      <Icon iconName={tab.itemIcon} style={{ color: 'red' }} />
    </span>
  );
}
