import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default breadcrumb."
      examplePath="components/Breadcrumb/Types/BreadcrumbExample"
    />
    <ComponentExample
      title="Configuring divider"
      description="The divider can be customized by setting the content property"
      examplePath="components/Breadcrumb/Types/BreadcrumbExampleIconDivider"
    />
  </ExampleSection>
);

export default Types;
