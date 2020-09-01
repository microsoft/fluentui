import * as React from 'react';

import Types from './Types';
import Performance from './Performance';
import Rtl from './Rtl';
import Variations from './Variations';
import States from './States';
import Usage from './Usage';
import NonPublicSection from '../../../components/ComponentDoc/NonPublicSection';

const IconExamples = () => (
  <NonPublicSection title="Visual tests">
    <Types />
    <States />
    <Variations />
    <Rtl />
    <Performance />
    <Usage />
  </NonPublicSection>
);

export default IconExamples;
