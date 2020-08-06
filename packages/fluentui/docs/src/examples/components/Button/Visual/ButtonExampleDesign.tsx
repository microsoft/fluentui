import * as React from 'react';
import { Button } from '@fluentui/react-northstar';

const ButtonExample = () => (
  <>
    <Button
      content="Click here"
      design={[
        ({ theme: { siteVariables } }) => ({ border: `1px solid ${siteVariables.colors.brand[500]}` }),
        { color: 'blue' },
      ]}
    />
    <Button content="Click here" design={{ border: '1px solid blue' }} />
    <Button content="Click here" design={{ border: '1px solid red' }} />
    <Button
      content="Click here"
      design={({ theme: { siteVariables } }) => /* console.log(siteVariables) || */ ({
        border: `1px solid ${siteVariables.colors.brand[500]}`,
        color: 'blue',
      })}
    />
    <Button content="Click here" design={{ border: '1px solid #8B8CC7', color: 'blue' }} />
  </>
);

export default ButtonExample;
