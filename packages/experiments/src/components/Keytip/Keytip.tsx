import {
  styled
} from '../../Utilities';
import { IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types';
import { KeytipBase } from './Keytip.base';
import { getStyles } from './Keytip.styles';

export const Keytip = styled<IKeytipProps, IKeytipStyleProps, IKeytipStyles>(
  KeytipBase,
  getStyles
);