import { styled } from '../../Utilities';
import { FabricBase } from './Fabric.base';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';

export const Fabric = styled<IFabricProps, IFabricStyleProps, IFabricStyles>(FabricBase, getStyles, undefined, {
  scope: 'Fabric'
});
