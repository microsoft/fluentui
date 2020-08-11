import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="Default Datepicker"
      examplePath="components/Datepicker/Types/DatepickerExample"
    />
    <ComponentExample
      title="Disabled"
      description="The datepicker can be disabled."
      examplePath="components/Datepicker/Types/DatepickerExampleDisabled"
    />
    <ComponentExample
      title="Required"
      description="The user needs to fill out the date."
      examplePath="components/Datepicker/Types/DatepickerExampleRequired"
    />
    <ComponentExample
      title="Open"
      description="The calendar starts with an open state."
      examplePath="components/Datepicker/Types/DatepickerExampleOpen"
    />
    <ComponentExample
      title="No manual input"
      description="The user cannot enter the date manually."
      examplePath="components/Datepicker/Types/DatepickerExampleNoInput"
    />
  </ExampleSection>
);

export default Types;
