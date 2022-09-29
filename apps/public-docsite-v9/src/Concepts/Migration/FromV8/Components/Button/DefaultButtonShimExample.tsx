import * as React from 'react';
import { DefaultButton, IButtonProps } from '@fluentui/react';
import { Button, webLightTheme, FluentProvider } from '@fluentui/react-components';
import { DefaultButtonShim } from '@fluentui/react-button-shim-v8-v9';

export const DefaultButtonShimExample = (props: IButtonProps) => {
  return (
    <>
      <DefaultButton {...props}>Default</DefaultButton>
      <FluentProvider theme={webLightTheme}>
        <DefaultButtonShim {...props}>Default</DefaultButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button>Default</Button>
      </FluentProvider>
    </>
  );
};
