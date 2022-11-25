import * as React from 'react';
import { Checkbox } from '@fluentui/react-components';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Checkbox label="Checkbox" />
      ))}
    </>
  );
};

export default Scenario;
