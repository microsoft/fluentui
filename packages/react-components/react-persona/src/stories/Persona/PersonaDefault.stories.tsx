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
          src: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-male.png',
        },
      }}
      {...props}
    />
  );
};
