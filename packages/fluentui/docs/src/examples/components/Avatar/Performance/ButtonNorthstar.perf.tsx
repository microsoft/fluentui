import * as React from 'react';
import { Button } from '@fluentui/react-northstar';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Button content="Button" />
      ))}
    </>
  );
};

export default Scenario;
