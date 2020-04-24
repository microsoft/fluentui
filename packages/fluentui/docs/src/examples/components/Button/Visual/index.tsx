import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection';

const Types = () => (
  <NonPublicSection title="Visual tests">
    <ComponentExample examplePath="components/Button/Visual/ButtonExampleCompose" />
  </NonPublicSection>
);

export default Types;
