import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => <Avatar />;

Scenario.decorator = (children: React.ReactNode) => <FluentProvider theme={webLightTheme}>{children}</FluentProvider>;

export default Scenario;
