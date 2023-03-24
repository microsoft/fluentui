import * as React from 'react';
import { InfoButton } from '@fluentui/react-infobutton';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => <InfoButton info={"This is an InfoButton's content."} />;

Scenario.decorator = (props: { children: React.ReactNode }) => {
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>;
};

export default Scenario;
