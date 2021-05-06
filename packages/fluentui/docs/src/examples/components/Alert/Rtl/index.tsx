import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Rtl = () => (
  <NonPublicSection title="Rtl">
    <ComponentExample examplePath="components/Alert/Rtl/AlertExample.rtl" />
    <ComponentExample examplePath="components/Alert/Rtl/AlertExampleChildren.rtl" />
    <ComponentExample examplePath="components/Alert/Rtl/AlertExampleDismissAction.rtl" />
  </NonPublicSection>
);

export default Rtl;
