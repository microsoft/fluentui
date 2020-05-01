import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';

import { LayoutSuggestions } from '../../../components/ComponentDoc/Suggestions';
import Types from './Types';
import Content from './Content';
import Rtl from './Rtl';

const ItemLayoutExamples = () => (
  <div>
    <Alert warning>
      <LayoutSuggestions />
    </Alert>
    <Types />
    <Content />
    <Rtl />
  </div>
);

export default ItemLayoutExamples;
