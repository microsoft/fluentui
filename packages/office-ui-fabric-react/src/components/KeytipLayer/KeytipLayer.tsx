import { styled } from '../../Utilities';
import { IKeytipLayerProps, IKeytipLayerStyleProps, IKeytipLayerStyles } from './KeytipLayer.types';
import { KeytipLayerBase } from './KeytipLayer.base';
import { getStyles } from './KeytipLayer.styles';

export const KeytipLayer: React.StatelessComponent<IKeytipLayerProps> = styled<
  IKeytipLayerProps,
  IKeytipLayerStyleProps,
  IKeytipLayerStyles
>(KeytipLayerBase, getStyles, undefined, {
  scope: 'KeytipLayer'
});
