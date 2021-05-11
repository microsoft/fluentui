import * as React from 'react';

// @ts-ignore
import { Persona } from 'office-ui-fabric-react/lib/Persona';

export const RenderPersona = (props: any) => {
  return (
    <div>
      <Persona>Persona</Persona>
      {/* include self closing persona check */}
      <Persona text={'PersonaName'} />
    </div>
  );
};
