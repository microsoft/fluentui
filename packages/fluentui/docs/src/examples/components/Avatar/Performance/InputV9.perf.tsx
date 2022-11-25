import * as React from 'react';
import { Input } from '@fluentui/react-components';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Input />
      ))}
    </>
  );
};

export default Scenario;
