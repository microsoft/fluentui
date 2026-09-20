import * as React from 'react';

import { Persona } from '@fluentui/react-modern-components-preview/persona';
import type { PersonaProps } from '@fluentui/react-modern-components-preview/persona';

export const Default = (props: Partial<PersonaProps>): React.ReactNode => {
  return (
    <Persona
      name="Kevin Sturgis"
      secondaryText="Available"
      avatar={{
        badge: { status: 'available' },
        image: {
          src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
        },
      }}
      {...props}
    />
  );
};
