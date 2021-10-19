import * as React from 'react';
import { styled } from '../../Utilities';
import { PersonaBase } from './Persona.base';
import { getStyles } from './Persona.styles';
import type { IPersonaProps, IPersonaStyleProps, IPersonaStyles } from './Persona.types';

/**
 * Personas are used for rendering an individual's avatar, presence and details.
 * They are used within the PeoplePicker components.
 */
export const Persona: React.FunctionComponent<IPersonaProps> = styled<
  IPersonaProps,
  IPersonaStyleProps,
  IPersonaStyles
>(PersonaBase, getStyles, undefined, {
  scope: 'Persona',
});
