import * as React from 'react';
import { Label } from '@fluentui/react-next/lib/Label';
import { Pivot, PivotItem, PivotLinkSize } from '@fluentui/react-next/lib/Pivot';

export const PivotLargeExample = () => (
  <div>
    <Pivot aria-label="Large Link Size Pivot Example" linkSize={PivotLinkSize.large}>
      <PivotItem headerText="My Files">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem headerText="Recent">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Shared with me">
        <Label>Pivot #3</Label>
      </PivotItem>
    </Pivot>
  </div>
);
