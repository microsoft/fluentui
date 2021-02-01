import * as React from 'react';
import { Icon, ILabelStyles, IStyleSet, Label } from '@fluentui/react';
import { TabItemProps, Tabs, TabItem } from '@fluentui/react-tabs';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const TabsIconCountExample: React.FunctionComponent = () => {
  return (
    <div>
      <Tabs aria-label="Count and Icon Tabs Example">
        <TabItem headerText="My Files" itemCount={42} itemIcon="Emoji2">
          <Label styles={labelStyles}>Tab #1</Label>
        </TabItem>
        <TabItem itemCount={23} itemIcon="Recent">
          <Label styles={labelStyles}>Tab #2</Label>
        </TabItem>
        <TabItem headerText="Placeholder" itemIcon="Globe">
          <Label styles={labelStyles}>Tab #3</Label>
        </TabItem>
        <TabItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
          <Label styles={labelStyles}>Tab #4</Label>
        </TabItem>
        <TabItem headerText="Customized Rendering" itemIcon="Globe" itemCount={10} onRenderTab={_customRenderer}>
          <Label styles={labelStyles}>Customized Rendering</Label>
        </TabItem>
      </Tabs>
    </div>
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
