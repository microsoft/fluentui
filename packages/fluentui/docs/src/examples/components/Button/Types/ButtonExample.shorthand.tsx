import * as React from 'react';
import { Button } from '@fluentui/react-northstar';

const design = { border: '1px solid blue' };
const ButtonExample = () => (
  <>
    <Button content="Click here" design={design} />
    <Button content="Click here" design={design} />
  </>
);

export default ButtonExample;
