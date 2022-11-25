import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Tooltip trigger={<Button content="Button" />} content="Tooltip" />
      ))}
    </>
  );
};

export default Scenario;
