import * as React from 'react';
import { Label } from '@fluentui/react-next/lib/Label';
import { Pivot, PivotItem } from '@fluentui/react-next/lib/Pivot';

export const PivotRTLExample: React.FunctionComponent = () => {
  return (
    <Pivot aria-label="Pivot RTL Example" style={{ direction: 'rtl' }}>
      <PivotItem headerText="First tab">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem headerText="Second tab">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Tab number three">
        <Label>Pivot #3</Label>
      </PivotItem>
      <PivotItem headerText="Tab four">
        <Label>Pivot #4</Label>
      </PivotItem>
      <PivotItem headerText="Fifth tab">
        <Label>Pivot #5</Label>
      </PivotItem>
      <PivotItem headerText="This is the sixth tab">
        <Label>Pivot #6</Label>
      </PivotItem>
      <PivotItem headerText="Tab seven">
        <Label>Pivot #7</Label>
      </PivotItem>
      <PivotItem headerText="Tab eight">
        <Label>Pivot #8</Label>
      </PivotItem>
    </Pivot>
  );
};
