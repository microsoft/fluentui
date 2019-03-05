import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { ILegendsProps, ILegendStyleProps, ILegendsStyles } from './Legends.types';
import { LegendsBase } from './Legends.base';
import { getStyles } from './Legends.styles';

export const Legends: React.StatelessComponent<ILegendsProps> = styled<ILegendsProps, ILegendStyleProps, ILegendsStyles>(
  LegendsBase,
  getStyles
);
