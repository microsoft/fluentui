import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Rtl = () => (
  <NonPublicSection title="Rtl">
    <ComponentExample examplePath="components/SvgIcon/Rtl/IconExample.rtl" />
    <ComponentExample examplePath="components/SvgIcon/Rtl/IconExampleRotate.rtl" />
  </NonPublicSection>
);

export default Rtl;
