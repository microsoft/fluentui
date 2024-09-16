import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { PersonaBasicExample } from '../Persona/Persona.Basic.Example';

export const ShadowDOMPersonaExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <PersonaBasicExample />
    </Shadow>
  );
};
