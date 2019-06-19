import * as React from 'react';
import { Button } from '@uifabric/experiments';

// const scenario = () => (
//   <Button> I am a button</Button>
// );

const scenario = () => (
  <div>
    {Array.from({ length: 5000 }, () => (
      <Button> I am a button</Button>
    ))}
  </div>
);

export default scenario;
