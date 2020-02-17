import * as React from 'react';

import Content from './Content';
import Types from './Types';
import Rtl from './Rtl';
import Variations from './Variations';
import Usage from './Usage';

import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection';
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample/ComponentExample';

const DialogExamples = () => (
  <>
    <Types />
    <Variations />
    <Content />
    <Usage />
    <Rtl />
    <NonPublicSection title="Visual tests">
      <ComponentExample examplePath="components/Dialog/Variations/DialogExampleScroll" />
    </NonPublicSection>
  </>
);

export default DialogExamples;
