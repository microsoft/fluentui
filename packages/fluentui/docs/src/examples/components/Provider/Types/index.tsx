import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Types = () => (
  <>
    <ExampleSection title="Types">
      <ComponentExample
        title="Theme"
        description="A Provider defines the theme for your components."
        examplePath="components/Provider/Types/ProviderExample"
      />
      <ComponentExample
        title="Rtl"
        description="A Provider can specify that the content inside it should be in rtl mode."
        examplePath="components/Provider/Types/ProviderRtlExample"
      />
      <ComponentExample
        title="Disable animations"
        description="A Provider can specify that the animations inside it's content should be disabled."
        examplePath="components/Provider/Types/ProviderDisableAnimationsExample"
      />
    </ExampleSection>
    <NonPublicSection title="Types for visual tests">
      <ComponentExample examplePath="components/Provider/Types/ProviderExampleScrollbar" />
      <ComponentExample examplePath="components/Provider/Types/ProviderExampleStyles" />
      <ComponentExample examplePath="components/Provider/Types/ProviderExampleRendererFelaPluginFallbackValue" />
      <ComponentExample examplePath="components/Provider/Types/ProviderExampleFocusBorder" />
    </NonPublicSection>
  </>
);

export default Types;
