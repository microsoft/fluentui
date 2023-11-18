/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PersonaState, PersonaSlots } from './Persona.types';

/**
 * Render the final JSX of Persona
 */
export const renderPersona_unstable = (state: PersonaState) => {
  const { presenceOnly, textPosition } = state;
  assertSlots<PersonaSlots>(state);

  const coin = presenceOnly ? state.presence && <state.presence /> : state.avatar && <state.avatar />;

  return (
    <state.root>
      {(textPosition === 'after' || textPosition === 'below') && coin}
      {state.primaryText && <state.primaryText />}
      {state.secondaryText && <state.secondaryText />}
      {state.tertiaryText && <state.tertiaryText />}
      {state.quaternaryText && <state.quaternaryText />}
      {textPosition === 'before' && coin}
    </state.root>
  );
};
