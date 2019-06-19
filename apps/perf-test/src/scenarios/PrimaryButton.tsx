import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

// const scenario = () => (
//   <Button> I am a button</Button>
// );

const scenario = () => (
  <div>
    {Array.from({ length: 5000 }, () => (
      <PrimaryButton> I am a button</PrimaryButton>
    ))}
  </div>
);

export default scenario;
