import * as React from 'react';
import VirtualizedTable from './VirtualizedTable';
import VirtualizedTables from './VirtualizedTables';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

export default () => (
  <PrototypeSection title="VirtualizedTable">
    <ComponentPrototype
      title="Virtualized Table"
      description="Single table with fixed header and its content virtualized using `react-virtualized`."
    >
      <VirtualizedTable />
    </ComponentPrototype>
    <ComponentPrototype
      title="Two virtualized tables in an accordion"
      description={
        <>
          <b>Notes:</b>
          <br />
          <span>
            Prototype is using fixed row height, for dynamic height please check{' '}
            <a href="https://github.com/bvaughn/react-virtualized/tree/master/source/CellMeasurer">
              CellMeasurer component.
            </a>
          </span>
          <br />
          <b>Known issues:</b>
          <br />
          <b>Integration with React-custom-scrollbars. </b>
          <span>
            React-virtualized has{' '}
            <a href="https://github.com/techniq/mui-downshift/issues/34">an opened feature request</a> to support
            React-custom-scrollbars and there are a couple of ways to add custom scrollbars to List component (see{' '}
            <a href="https://github.com/bvaughn/react-virtualized/issues/143">issue one</a> and{' '}
            <a href="https://github.com/bvaughn/react-virtualized/issues/692">issue two</a>). Unfortunately, suggested
            solutions do not seem to work with two lists wrapped with WindowScroller elements.
          </span>
        </>
      }
    >
      <VirtualizedTables />
    </ComponentPrototype>
  </PrototypeSection>
);
