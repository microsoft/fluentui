import * as React from 'react';
import { Persona, PersonaProps } from '@fluentui/react-persona';

export const Default = (props: Partial<PersonaProps>) => {
  return (
    <Persona
      name="Kevin Sturgis"
      secondaryText="Available"
      presence={{ status: 'available' }}
      avatar={{
        image: {
          src:
            'https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/office-ui-fabric-react-assets/persona-male.png',
        },
      }}
      {...props}
    />
  );
};
