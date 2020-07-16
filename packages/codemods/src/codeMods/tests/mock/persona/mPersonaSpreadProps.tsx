import * as React from 'react';

import { Persona, IPersonaSharedProps, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

const renderCoin: IRenderFunction<IPersonaSharedProps> = (props: IPersonaSharedProps | undefined) => {
  return <div>Foo</div>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RenderPersona = (props: any) => {
  const propsTest = { onRenderCoin: renderCoin, primaryText: 'ConstPersona' };
  return (
    <div>
      <Persona {...propsTest} id="d">
        Persona
      </Persona>
      {/* include self closing persona check */}
      <Persona {...propsTest} id="d1" />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RenderLetPersona = (props: any) => {
  // eslint-disable-next-line prefer-const
  let propsTest = { onRenderCoin: renderCoin, primaryText: 'LetPersona' };
  return (
    <div>
      <Persona {...propsTest} id="l">
        Persona
      </Persona>
      {/* include self closing persona check */}
      <Persona {...propsTest} />
    </div>
  );
};

export const RenderPersonaProps = (props: IPersonaProps) => {
  return (
    <div>
      <Persona {...props} id="pl">
        Persona
      </Persona>
      {/* include self closing persona check */}
      <Persona {...props} />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export function RenderPersonaPropsFunc(props: IPersonaProps) {
  return (
    <div>
      <Persona {...props} id="pf">
        Persona
      </Persona>
      {/* include self closing persona check */}
      <Persona {...props} />
    </div>
  );
}
