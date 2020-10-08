import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';

const Scenario = () => (
  <Pivot aria-label="Basic Pivot Example">
    <PivotItem
      headerText="My Files"
      headerButtonProps={{
        'data-order': 1,
        'data-title': 'My Files Title',
      }}
    >
      <div>Pivot #1</div>
    </PivotItem>
    <PivotItem headerText="Recent">
      <div>Pivot #2</div>
    </PivotItem>
    <PivotItem headerText="Shared with me">
      <div>Pivot #3</div>
    </PivotItem>
  </Pivot>
);

export default Scenario;
