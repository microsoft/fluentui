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
        src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
      },
    }}
  />
);

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default Scenario;
