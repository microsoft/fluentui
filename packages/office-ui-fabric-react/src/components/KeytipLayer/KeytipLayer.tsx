import * as React from 'react';
import {
  styled
} from '../../Utilities';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { KeytipLayerBase } from './KeytipLayer.base';
import { getStyles } from './KeytipLayer.styles';

export const KeytipLayer = styled(
  KeytipLayerBase,
  getStyles
);