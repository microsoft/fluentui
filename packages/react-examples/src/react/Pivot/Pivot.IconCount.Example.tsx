import * as React from 'react';
import { Icon, IStyleSet, Label, ILabelStyles, Pivot, IPivotItemProps, PivotItem } from '@fluentui/react';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const PivotIconCountExample: React.FunctionComponent = () => {
  return (
    <div>
      <Pivot aria-label="Count and Icon Pivot Example">
        <PivotItem headerText="My Files" itemCount={42} itemIcon="Emoji2">
          <Label styles={labelStyles}>Pivot #1</Label>
        </PivotItem>
        <PivotItem itemCount={23} itemIcon="Recent">
          <Label styles={labelStyles}>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Placeholder" itemIcon="Globe">
          <Label styles={labelStyles}>Pivot #3</Label>
        </PivotItem>
        <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
          <Label styles={labelStyles}>Pivot #4</Label>
        </PivotItem>
        <PivotItem headerText="Customized Rendering" itemIcon="Globe" itemCount={10} onRenderItemLink={_customRenderer}>
          <Label styles={labelStyles}>Customized Rendering</Label>
        </PivotItem>
      </Pivot>
    </div>
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
