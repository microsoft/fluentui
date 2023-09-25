import * as React from 'react';
import { styled } from '../../../Utilities';
import { ColorRectangleBase } from './ColorRectangle.base';
import { getStyles } from './ColorRectangle.styles';
import type { IColorRectangleProps, IColorRectangleStyles, IColorRectangleStyleProps } from './ColorRectangle.types';

export const ColorRectangle: React.FunctionComponent<IColorRectangleProps> = styled<
  IColorRectangleProps,
  IColorRectangleStyleProps,
  IColorRectangleStyles
>(ColorRectangleBase, getStyles, undefined, { scope: 'ColorRectangle' });
