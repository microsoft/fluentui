import * as React from 'react';
import { VanillaButton } from '@fluentui/react-vanilla-extract';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => <VanillaButton>I am a button</VanillaButton>;

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default Scenario;
