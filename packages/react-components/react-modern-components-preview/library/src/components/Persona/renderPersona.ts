import { renderPersona as renderPersonaBase } from '@fluentui/react-headless-components-preview/persona';
import type { JSXElement } from '@fluentui/react-utilities';
import type { PersonaState } from './Persona.types';

export const renderPersona = renderPersonaBase as (state: PersonaState) => JSXElement;
