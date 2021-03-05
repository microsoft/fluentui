import * as React from 'react';

// @ts-ignore
import { Persona, IPersonaSharedProps, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
// @ts-ignore
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

const renderCoin: IRenderFunction<IPersonaSharedProps> = (props: IPersonaSharedProps | undefined) => {
  return <div>Foo</div>;
};

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
