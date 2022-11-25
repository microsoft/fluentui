import * as React from 'react';
import { Tooltip, Button } from '@fluentui/react-components';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Tooltip content="Tooltip" visible relationship="label">
          <Button>Button</Button>
        </Tooltip>
      ))}
    </>
  );
};

export default Scenario;
