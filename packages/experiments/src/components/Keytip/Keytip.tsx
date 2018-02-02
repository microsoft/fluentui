import {
  styled
} from '../../Utilities';
/* tslint:disable:no-unused-variable */
import { IKeytipProps } from './Keytip.types';
import { KeytipBase } from './Keytip.base';
import { getStyles } from './Keytip.styles';

export const Keytip = styled(
  KeytipBase,
  getStyles
);