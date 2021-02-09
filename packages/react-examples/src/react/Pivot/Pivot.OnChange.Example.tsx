import * as React from 'react';
import { Label, IPivotItemProps, Pivot, PivotItem } from '@fluentui/react';

export const PivotOnChangeExample = () => {
  const [lastHeader, setLastHeader] = React.useState<{ props: IPivotItemProps } | undefined>(undefined);

  return (
    <div>
      <Label>Last onLinkClick from: {lastHeader?.props.headerText}</Label>
      <Pivot aria-label="OnChange Pivot Example" linkSize="large" linkFormat="tabs" onLinkClick={setLastHeader}>
        <PivotItem headerText="Foo">
          <Label>Pivot #1</Label>
        </PivotItem>
        <PivotItem headerText="Bar">
          <Label>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Bas">
          <Label>Pivot #3</Label>
        </PivotItem>
        <PivotItem headerText="Biz">
          <Label>Pivot #4</Label>
        </PivotItem>
      </Pivot>
    </div>
  );
};
