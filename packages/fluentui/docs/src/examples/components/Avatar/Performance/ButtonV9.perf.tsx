import * as React from 'react';
import { Button } from '@fluentui/react-components';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Button>Button</Button>
      ))}
    </>
  );
};

export default Scenario;
