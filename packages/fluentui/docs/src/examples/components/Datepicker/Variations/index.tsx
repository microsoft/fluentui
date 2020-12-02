import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Standalone DatepickerCalendar with Button"
      description={
        <>
          One can decide to use the <code>DatepickerCalendar</code> without <code>Input</code>, just with the triger
          <code>Button</code>. The way to achieve this is through <code>buttonOnly</code> prop.
        </>
      }
      examplePath="components/Datepicker/Variations/DatepickerExampleStandaloneCalendarButton"
    />
    <ComponentExample
      title="Standalone DatepickerCalendar with Input"
      description={
        <>
          One can also use the <code>DatepickerCalendar</code> without trigger <code>Button</code>. The way to achieve
          this is through <code>inputOnly</code> prop.
        </>
      }
      examplePath="components/Datepicker/Variations/DatepickerExampleStandaloneCalendarInput"
    />
  </ExampleSection>
);

export default Variations;
