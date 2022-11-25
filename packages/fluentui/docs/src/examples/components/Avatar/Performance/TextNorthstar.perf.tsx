import * as React from 'react';
import { Text } from '@fluentui/react-northstar';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Text content="Text" />
      ))}
    </>
  );
};

export default Scenario;
