import { styled } from '../../Utilities';
import {
  IPersonaProps,
  IPersonaStyleProps,
  IPersonaStyles
} from './Persona.types';
import { PersonaBase } from './Persona.base';
import { getStyles } from './Persona.styles';

export const Persona = styled<IPersonaProps, IPersonaStyleProps, IPersonaStyles>(
  PersonaBase,
  getStyles
);