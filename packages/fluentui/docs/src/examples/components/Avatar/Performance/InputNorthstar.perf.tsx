import * as React from 'react';
import { Input } from '@fluentui/react-northstar';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Input placeholder="Input" />
      ))}
    </>
  );
};

export default Scenario;
