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
      title="Controlled Open"
      description="The calendar's open state can be controlled by its parent."
      examplePath="components/Datepicker/Types/DatepickerExampleOpen"
    />
    <ComponentExample
      title="No manual input"
      description="The user cannot enter the date manually."
      examplePath="components/Datepicker/Types/DatepickerExampleNoInput"
    />
    <ComponentExample
      title="Localized Calendar"
      description="The dates can be localized."
      examplePath="components/Datepicker/Types/DatepickerExampleLocalizationStrings"
    />
  </ExampleSection>
);

export default Types;
