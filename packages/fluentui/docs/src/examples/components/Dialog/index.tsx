import * as React from 'react';

import Content from './Content';
import Types from './Types';
import Rtl from './Rtl';
import Variations from './Variations';
import Usage from './Usage';

import NonPublicSection from '../../../components/ComponentDoc/NonPublicSection';
import ComponentExample from '../../../components/ComponentDoc/ComponentExample/ComponentExample';

const DialogExamples = () => (
  <>
    <Types />
    <Variations />
    <Content />
    <Usage />
    <Rtl />
    <NonPublicSection title="Visual tests">
      <ComponentExample examplePath="components/Dialog/Variations/DialogExampleScroll" />
      <ComponentExample title="Zoom with content" examplePath="components/Dialog/Variations/DialogExampleZoomContent" />
      <ComponentExample
        title="Zoom with custom footer"
        examplePath="components/Dialog/Variations/DialogExampleZoomCustomFooter"
      />
    </NonPublicSection>
  </>
);

export default DialogExamples;
