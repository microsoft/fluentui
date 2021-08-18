import * as React from 'react';
import { styled } from '../../Utilities';
import { KeytipLayerBase } from './KeytipLayer.base';
import { getStyles } from './KeytipLayer.styles';
import type { IKeytipLayerProps, IKeytipLayerStyleProps, IKeytipLayerStyles } from './KeytipLayer.types';

export const KeytipLayer: React.FunctionComponent<IKeytipLayerProps> = styled<
  IKeytipLayerProps,
  IKeytipLayerStyleProps,
  IKeytipLayerStyles
>(KeytipLayerBase, getStyles, undefined, {
  scope: 'KeytipLayer',
});
