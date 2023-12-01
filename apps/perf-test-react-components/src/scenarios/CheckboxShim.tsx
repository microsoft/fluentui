import * as React from 'react';
import { ChecboxShim } from '@fluentui/react-migration-v8-v9';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => <ChecboxShim checked>I am a Checkbox shim</ChecboxShim>;

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default Scenario;
