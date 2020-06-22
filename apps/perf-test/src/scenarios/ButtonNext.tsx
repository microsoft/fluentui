import * as React from 'react';
import { Button } from '@fluentui/react-button';

const Scenario = () => (
  <Button
    content="I am a button"
    icon="X"
    tokens={{ background: 'red', height: '50px', minWidth: '80px', padding: '10px', margin: '8px', fontWeight: '600' }}
  />
);

export default Scenario;
