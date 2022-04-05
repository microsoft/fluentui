import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Dismiss on actions"
      description="You can also dismiss alerts on actions."
      examplePath="components/Alert/Usage/AlertExampleDismissActions"
    />
    <ComponentExample
      title="Important message"
      description="An Alert that displays an important information."
      examplePath="components/Alert/Usage/AlertExampleImportantMessage"
    />
    <ComponentExample
      title="Width"
      description="An Alert can fit container width."
      examplePath="components/Alert/Usage/AlertExampleWidth"
    />
  </ExampleSection>
);

export default Usage;
