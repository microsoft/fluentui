import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => (
  <Persona
    name="Kevin Sturgis"
    secondaryText="Available"
    presence={{ status: 'available' }}
    avatar={{
      image: {
        src: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-male.png',
      },
    }}
  />
);

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default Scenario;
