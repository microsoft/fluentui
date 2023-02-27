import * as React from 'react';
import { SpinButton } from '@fluentui/react-spinbutton';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => <SpinButton defaultValue={0} min={0} max={0} />;

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default Scenario;
