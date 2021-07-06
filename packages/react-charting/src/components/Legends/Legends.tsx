import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { ILegendsProps, ILegendStyleProps, ILegendsStyles } from './Legends.types';
import { LegendsBase } from './Legends.base';
import { getStyles } from './Legends.styles';

export const Legends: React.FunctionComponent<ILegendsProps> = styled<ILegendsProps, ILegendStyleProps, ILegendsStyles>(
  LegendsBase,
  getStyles,
);
