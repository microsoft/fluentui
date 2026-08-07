import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';

const Scenario = () => <Button>I am a button</Button>;

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider themeClassName={webLightThemeClassName}>{props.children}</FluentProvider>
);

export default Scenario;
