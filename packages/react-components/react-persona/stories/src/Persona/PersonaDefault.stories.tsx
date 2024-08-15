import * as React from 'react';
import { Persona } from '@fluentui/react-components';
import type { PersonaProps } from '@fluentui/react-components';

export const Default = (props: Partial<PersonaProps>) => {
  return (
    <Persona
      name="Kevin Sturgis"
      secondaryText="Available"
      presence={{ status: 'available' }}
      avatar={{
        image: {
          src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
        },
      }}
      {...props}
    />
  );
};
