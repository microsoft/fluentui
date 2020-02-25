import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Static"
      description="Static table with no interactive content"
      examplePath="components/Table/Usage/TableExampleStatic"
    />
    <ComponentExample
      title="Static compact"
      description="Compact view static table"
      examplePath="components/Table/Usage/TableExampleStaticCompact"
    />
    <ComponentExample
      title="Content truncation"
      description="Static table with content truncation"
      examplePath="components/Table/Usage/TableExampleStaticTruncate"
    />
    <ComponentExample
      title="Static headless"
      description="Static table with no header"
      examplePath="components/Table/Usage/TableExampleStaticHeadless"
    />
    <ComponentExample
      title="Static no rows"
      description="Static table with no rows"
      examplePath="components/Table/Usage/TableExampleStaticRowless"
    />
    <ComponentExample
      title="Nested navigation in table by row and cell"
      description="Navigable table by row and cell"
      examplePath="components/Table/Usage/TableExampleNavigable"
    />
  </ExampleSection>
);

export default Usage;
