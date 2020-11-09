import * as React from 'react';
import { Panel } from '@fluentui/react/lib/Panel';

const Scenario = () => (
  <Panel isOpen={true} headerText="Panel header" closeButtonAriaLabel="Close">
    <p>Content goes here.</p>
  </Panel>
);

export default Scenario;
