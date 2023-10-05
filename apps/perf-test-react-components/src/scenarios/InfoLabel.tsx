import * as React from 'react';
import { InfoLabel } from '@fluentui/react-infobutton';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => <InfoLabel info="This is an InfoButton's content." label="Sample label text" />;

Scenario.decorator = (props: { children: React.ReactNode }) => {
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>;
};

export default Scenario;
