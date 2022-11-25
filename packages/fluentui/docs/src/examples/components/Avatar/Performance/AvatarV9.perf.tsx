import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Avatar />
      ))}
    </>
  );
};

export default Scenario;
