import * as React from 'react';
import { Text } from '@fluentui/react-components';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Text>Text</Text>
      ))}
    </>
  );
};

export default Scenario;
