import * as React from 'react';
import { PrimaryButton, IButtonProps } from '@fluentui/react';
import { Button, webLightTheme, FluentProvider } from '@fluentui/react-components';
import { PrimaryButtonShim } from '@fluentui/react-button-shim-v8-v9';

export const PrimaryButtonShimExample = (props: IButtonProps) => {
  return (
    <>
      <PrimaryButton {...props}>Primary</PrimaryButton>
      <FluentProvider theme={webLightTheme}>
        <PrimaryButtonShim {...props}>Primary</PrimaryButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button appearance="primary">Primary</Button>
      </FluentProvider>
    </>
  );
};
