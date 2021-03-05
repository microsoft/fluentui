import * as React from 'react';

// @ts-ignore
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export const RenderPersona = (props: { size: PersonaSize }) => {
  return (
    <div>
      <Persona size={PersonaSize.size100}>Persona</Persona>
    </div>
  );
};
