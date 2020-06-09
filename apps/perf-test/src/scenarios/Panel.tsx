import * as React from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';

const Scenario = () => (
  <Panel isOpen={true} headerText="Panel header" closeButtonAriaLabel="Close">
    <p>Content goes here.</p>
  </Panel>
);

export default Scenario;
