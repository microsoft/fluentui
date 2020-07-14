import * as React from 'react';

import { Persona } from 'office-ui-fabric-react/lib/Persona';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RenderPersona = (props: any) => {
  return (
    <div>
      <Persona>Persona</Persona>
      {/* include self closing persona check */}
      <Persona text={'PersonaName'} />
    </div>
  );
};
