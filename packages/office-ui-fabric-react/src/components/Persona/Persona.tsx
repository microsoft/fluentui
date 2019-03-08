import { styled } from '../../Utilities';
import { IPersonaProps, IPersonaStyleProps, IPersonaStyles } from './Persona.types';
import { PersonaBase } from './Persona.base';
import { getStyles } from './Persona.styles';

/**
 * Personas are used for rendering an individual's avatar, presence and details.
 * They are used within the PeoplePicker components.
 */
export const Persona: React.StatelessComponent<IPersonaProps> = styled<IPersonaProps, IPersonaStyleProps, IPersonaStyles>(
  PersonaBase,
  getStyles,
  undefined,
  {
    scope: 'Persona'
  }
);
