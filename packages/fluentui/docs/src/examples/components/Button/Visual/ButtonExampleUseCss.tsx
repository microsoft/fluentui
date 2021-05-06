import * as React from 'react';
import { Button, useCSS } from '@fluentui/react-northstar';

const ButtonExampleUseCss = () => {
  const className1 = useCSS(({ siteVariables }) => ({ border: `1px solid ${siteVariables.colors.brand[500]}` }), {
    color: 'blue',
  });
  const className2 = useCSS({ border: '1px solid blue' });
  const className3 = useCSS({ border: '1px solid red' });
  const className4 = useCSS(({ siteVariables }) => ({
    border: `1px solid ${siteVariables.colors.brand[500]}`,
    color: 'blue',
  }));
  const className5 = useCSS({ border: '1px solid #8B8CC7', color: 'blue', ':hover': { color: 'yellow' } });

  return (
    <>
      <Button content="Click here" className={className1} />
      <Button content="Click here" className={className2} />
      <Button content="Click here" className={className3} />
      <Button content="Click here" className={className4} />
      <Button content="Click here" className={className5} />
    </>
  );
};

export default ButtonExampleUseCss;
