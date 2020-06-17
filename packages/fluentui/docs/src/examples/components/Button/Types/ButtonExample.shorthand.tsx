import * as React from 'react';
import { Button } from '@fluentui/react-northstar';

const ButtonExample = () => (
  <>
    <Button content="Click here" design={{ border: '1px solid blue' }} />
    <Button content="Click here" design={{ border: '1px solid blue' }} />
    <Button content="Click here" design={{ border: '1px solid red' }} />
    {/*<Button content="Click here" design={({ theme: { siteVariables }}) => ({border: `1px solid ${siteVariables.colorScheme.brand.border}`})} />;*/}
  </>
);

export default ButtonExample;
