import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';

const Scenario = () => <Avatar />;

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider themeClassName={webLightThemeClassName}>{props.children}</FluentProvider>
);

export default Scenario;
