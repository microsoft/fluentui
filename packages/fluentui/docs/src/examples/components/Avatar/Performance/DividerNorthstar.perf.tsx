import * as React from 'react';
import { Divider } from '@fluentui/react-northstar';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Divider />
      ))}
    </>
  );
};

export default Scenario;
