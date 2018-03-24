import { styled } from '../../Utilities';
import {
  IPersonaProps,
  IPersonaStyleProps,
  IPersonaStyles
} from './Persona.types';
import { PersonaCoinBase } from './PersonaCoin.base';
import { getStyles } from './PersonaCoin.styles';

export const PersonaCoin = styled<IPersonaProps, IPersonaStyleProps, IPersonaStyles>(
  PersonaCoinBase,
  getStyles
);
