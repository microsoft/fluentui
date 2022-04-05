import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Reducing"
      description="A reducing layout renders the minimum number of areas necessary to accomplish the layout."
      examplePath="components/Layout/Variations/LayoutExampleReducing"
    />
    <ComponentExample
      title="Disappearing"
      description={[
        'A disappearing layout renders will render content directly when possible',
        ' (i.e. without wrapping elements).',
      ].join('')}
      examplePath="components/Layout/Variations/LayoutExampleDisappearing"
    />
    <ComponentExample
      title="Gap"
      description="A layout can add whitespace between areas."
      examplePath="components/Layout/Variations/LayoutExampleGap"
    />
  </ExampleSection>
);

export default Variations;
