import * as React from 'react';
import { Avatar, PersonIcon } from '@fluentui/react-northstar';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Avatar name="Avatar Avatar" icon={<PersonIcon />} />
      ))}
    </>
  );
};

export default Scenario;
