import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { Link } from 'react-router-dom';

import Rtl from './Rtl';
import Types from './Types';
import States from './States';
import Variations from './Variations';

const SegmentExamples = () => (
  <>
    <Alert styles={{ display: 'block' }} warning>
      <p>
        <code>Segment</code> component shouldn't be used to handle layout aspects. To address layouts and positioning
        aspects refer to <Link to="/components/flex">Flex</Link> and <Link to="/components/grid">Grid</Link> components
        (and general <Link to="/layout">Layout guide</Link>).
      </p>
    </Alert>

    <Types />
    <States />
    <Variations />
    <Rtl />
  </>
);

export default SegmentExamples;
