import { renderPersona_unstable } from '@fluentui/react-persona';

import type { PersonaState } from './Persona.types';
import type { JSXElement } from '@fluentui/react-utilities/';

export const renderPersona = renderPersona_unstable as (state: PersonaState) => JSXElement;
