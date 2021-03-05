import * as React from 'react';

// @ts-ignore
import { Persona, IPersonaSharedProps } from 'office-ui-fabric-react/lib/Persona';
// @ts-ignore
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

const renderCoin: IRenderFunction<IPersonaSharedProps> = (props: IPersonaSharedProps | undefined) => {
  return <div>Foo</div>;
};

export const RenderPersona = (props: any) => {
  return (
    <div>
      <Persona onRenderCoin={renderCoin} primaryText={'PersonaName'}>
        Persona
      </Persona>
      {/* include self closing persona check */}
      <Persona primaryText={'PersonaName'} onRenderCoin={renderCoin} />
    </div>
  );
};
