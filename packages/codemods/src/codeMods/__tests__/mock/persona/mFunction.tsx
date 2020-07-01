import * as React from 'react';

import { Persona } from 'office-ui-fabric-react/lib/Persona';

// tslint:disable-next-line: no-any
export const RenderPersona = (props: any) => {
  return (
    <div>
      <Persona>Persona</Persona>
      {/* include self closing persona check */}
      <Persona text={'PersonaName'} />
    </div>
  );
};
