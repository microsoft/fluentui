import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';

import { LayoutSuggestions } from '../../../components/ComponentDoc/Suggestions';
import Types from './Types';
import Variations from './Variations';

const LayoutExamples = () => (
  <div>
    <Alert warning>
      <LayoutSuggestions />
    </Alert>
    <Types />
    <Variations />
  </div>
);

export default LayoutExamples;
