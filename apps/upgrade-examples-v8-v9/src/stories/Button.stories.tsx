import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Button, webLightTheme, FluentProvider } from '@fluentui/react-components';

export default {
  title: 'Button',
  component: DefaultButton,
};

export const v8 = () => <DefaultButton>Click me</DefaultButton>;
export const v9 = () => (
  <FluentProvider theme={webLightTheme}>
    <Button>No Click Me</Button>
  </FluentProvider>
);
export const Both = () => (
  <FluentProvider theme={webLightTheme}>
    <DefaultButton>Click me</DefaultButton> <Button>No Click Me</Button>
  </FluentProvider>
);
