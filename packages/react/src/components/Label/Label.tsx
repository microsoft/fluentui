import * as React from 'react';
import { styled } from '../../Utilities';
import { LabelBase } from './Label.base';
import { getStyles } from './Label.styles';
import type { ILabelProps, ILabelStyleProps, ILabelStyles } from './Label.types';

export const Label: React.FunctionComponent<ILabelProps> = styled<ILabelProps, ILabelStyleProps, ILabelStyles>(
  LabelBase,
  getStyles,
  undefined,
  {
    scope: 'Label',
  },
);
