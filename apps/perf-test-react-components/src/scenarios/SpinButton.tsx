import * as React from 'react';
import { SpinButton } from '@fluentui/react-spinbutton';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';

const Scenario = () => <SpinButton defaultValue={0} min={0} max={0} />;

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider themeClassName={webLightThemeClassName}>{props.children}</FluentProvider>
);

export default Scenario;
