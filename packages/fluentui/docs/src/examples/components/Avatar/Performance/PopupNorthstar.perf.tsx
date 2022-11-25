import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Popup trigger={<Button content="Popup" />} content="Hello from popup!" />
      ))}
    </>
  );
};

export default Scenario;
