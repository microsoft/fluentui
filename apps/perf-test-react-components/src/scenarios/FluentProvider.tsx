import * as React from 'react';
import { webLightThemeClassName } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';

const Scenario = () => <FluentProvider themeClassName={webLightThemeClassName} />;

export default Scenario;
