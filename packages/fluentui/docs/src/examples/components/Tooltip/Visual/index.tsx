import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection';

const Variations = () => (
  <NonPublicSection title="Visual tests">
    <ComponentExample examplePath="components/Tooltip/Visual/TooltipExamplePointerMargin" />
  </NonPublicSection>
);

export default Variations;
