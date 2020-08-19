import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Custom cell slot"
      description={
        <>
          <code>calendarCell</code> inside <code>calendar</code> prop can be used for customizing datepicker cell
        </>
      }
      examplePath="components/Datepicker/Slots/DatepickerCellExample"
    />
    <ComponentExample
      title="Custom header cell slot"
      description={
        <>
          <code>calendarHeaderCell</code> inside <code>calendar</code> prop can be used for customizing datepicker
          header cell
        </>
      }
      examplePath="components/Datepicker/Slots/DatepickerHeaderCellExample"
    />
  </ExampleSection>
);

export default Usage;
