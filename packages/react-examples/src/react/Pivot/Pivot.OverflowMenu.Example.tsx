import * as React from 'react';
import { Fabric, Icon, Label, Pivot, IPivotItemProps, PivotItem, Toggle } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

export const PivotOverflowMenuExample: React.FunctionComponent = () => {
  const [overflow, { toggle: toggleOverflow }] = useBoolean(true);
  const [tabs, { toggle: toggleTabs }] = useBoolean(false);
  const [rtl, { toggle: toggleRtl }] = useBoolean(false);

  return (
    <>
      <div style={{ background: '#EEE' }}>
        <Toggle label="overflow" offText="none" onText="menu" checked={overflow} onChange={toggleOverflow} />
        <Toggle label="linkFormat" offText="links" onText="tabs" checked={tabs} onChange={toggleTabs} />
        <Toggle label="direction" offText="ltr" onText="rtl" checked={rtl} onChange={toggleRtl} />
      </div>
      {/* eslint-disable-next-line deprecation/deprecation */}
      <Fabric dir={rtl ? 'rtl' : 'ltr'}>
        <Pivot
          aria-label="Pivot Overflow Menu Example"
          linkFormat={tabs ? 'tabs' : 'links'}
          overflowBehavior={overflow ? 'menu' : 'none'}
          overflowAriaLabel="more items"
        >
          <PivotItem headerText="My Files">
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem itemCount={23} itemIcon="Recent">
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="Placeholder" itemIcon="Globe">
            <Label>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
            <Label>Pivot #4</Label>
          </PivotItem>
          <PivotItem headerText="Custom Renderer" itemIcon="Airplane" onRenderItemLink={_customRenderer}>
            <Label>Pivot #5</Label>
          </PivotItem>
          <PivotItem headerText="This tab has a relatively long title">
            <Label>Pivot #6</Label>
          </PivotItem>
          <PivotItem headerText="Short">
            <Label>Pivot #7</Label>
          </PivotItem>
          <PivotItem headerText="The Last Tab">
            <Label>Pivot #8</Label>
          </PivotItem>
        </Pivot>
      </Fabric>
    </>
  );
};

function _customRenderer(
  link?: IPivotItemProps,
  defaultRenderer?: (link?: IPivotItemProps) => JSX.Element | null,
): JSX.Element | null {
  if (!link || !defaultRenderer) {
    return null;
  }

  return (
    <span style={{ flex: '0 1 100%' }}>
      {defaultRenderer({ ...link, itemIcon: undefined })}
      <Icon iconName={link.itemIcon} style={{ color: 'red' }} />
    </span>
  );
}
