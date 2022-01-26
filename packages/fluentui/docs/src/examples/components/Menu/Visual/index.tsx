import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Usage = () => (
  <NonPublicSection title="Visual tests">
    <ComponentExample examplePath="components/Menu/Visual/MenuExamplePositioning" />
    <ComponentExample examplePath="components/Menu/Visual/MenuExampleVertical" />
  </NonPublicSection>
);

export default Usage;
