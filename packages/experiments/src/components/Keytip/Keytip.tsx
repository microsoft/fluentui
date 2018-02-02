import * as React from 'react';
import {
  styled
} from '../../Utilities';
import { IKeytipProps } from './Keytip.types';
import { KeytipBase } from './Keytip.base';
import { getStyles } from './Keytip.styles';

export const Keytip = styled(
  KeytipBase,
  getStyles
);