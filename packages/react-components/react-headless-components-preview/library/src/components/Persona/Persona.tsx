'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { usePersona } from './usePersona';
import { renderPersona } from './renderPersona';
import type { PersonaProps } from './Persona.types';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Represents a person or with an avatar, primary text, and optional secondary text.
 */
export const Persona: ForwardRefComponent<PersonaProps> = /*#__PURE__*/ composeComponent(
  'Persona',
  usePersona,
  renderPersona,
);
