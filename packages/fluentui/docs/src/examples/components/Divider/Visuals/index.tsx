import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Visual = () => (
  <NonPublicSection title="Visual tests">
    <ComponentExample examplePath="components/Divider/Visuals/DividerExampleRtlAndLtr" />
  </NonPublicSection>
);

export default Visual;
