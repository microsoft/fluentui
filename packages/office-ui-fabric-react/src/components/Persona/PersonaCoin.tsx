import { styled } from '../../Utilities';
import {
  IPersonaCoinProps,
  IPersonaCoinStyleProps,
  IPersonaCoinStyles
} from './Persona.types';
import { PersonaCoinBase } from './PersonaCoin.base';
import { getStyles } from './PersonaCoin.styles';

export const PersonaCoin = styled<IPersonaCoinProps, IPersonaCoinStyleProps, IPersonaCoinStyles>(
  PersonaCoinBase,
  getStyles
);
