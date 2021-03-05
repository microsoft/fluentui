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
      title="Week selection"
      description="The user can choose the entire week"
      examplePath="components/Datepicker/Types/DatepickerExampleWeek"
    />
    <ComponentExample
      title="Localized Calendar"
      description="The dates can be localized."
      examplePath="components/Datepicker/Types/DatepickerExampleLocalizationStrings"
    />
    <ComponentExample
      title="Date Boundary"
      description="The datepicker can restrict the date selection to a min and max."
      examplePath="components/Datepicker/Types/DatepickerExampleMinMaxDate"
    />
    <ComponentExample
      title="Restricted"
      description="The datepicker can exclude a list of dates from being selected."
      examplePath="components/Datepicker/Types/DatepickerExampleRestrictedDates"
    />
  </ExampleSection>
);

export default Types;
