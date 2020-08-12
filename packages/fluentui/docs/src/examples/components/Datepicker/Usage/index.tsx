import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Custom formatting"
      description="Custom date formatting"
      examplePath="components/Datepicker/Usage/DatepickerFormatExample"
    />
    <ComponentExample
      title="Custom parsing"
      description="Custom date parsing"
      examplePath="components/Datepicker/Usage/DatepickerParseExample"
    />
  </ExampleSection>
);

export default Usage;
