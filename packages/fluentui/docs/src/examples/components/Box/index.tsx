import * as React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@fluentui/react-northstar';

import Types from './Types';
import Performance from './Performance';
import { LayoutSuggestions } from '../../../components/ComponentDoc/Suggestions';

const BoxExamples = () => (
  <>
    <Alert styles={{ display: 'block' }} warning>
      <p>
        <code>Box</code> component should be used carefully, in almost all cases you don't need it.
      </p>
      <ul>
        <li>
          <LayoutSuggestions />
        </li>
        <li>
          Consider to use <Link to="/components/text">Text</Link> component to wrap text.
        </li>
        <li>In other cases consider to style existing components via theming features.</li>
        <li>
          You also can <Link to="/integrate-custom-components">create your own custom component</Link> for custom
          behaviors.
        </li>
      </ul>
      <p>
        Remember that <code>styles</code> prop applied directly to an element most probably will break theme switching
        scenarios - thus, prefer to use <code>variables</code> instead of <code>styles</code> for overrides.
      </p>
    </Alert>

    <Types />
    <Performance />
  </>
);

export default BoxExamples;
