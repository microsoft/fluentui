import { styled } from '../../Utilities';
import {
  IPivotProps,
  IPivotStyleProps,
  IPivotStyles
} from './Pivot.types';
import { PivotBase } from './Pivot.base';
import { getStyles } from './Pivot.styles';

/**
* Pivot description
*/
export const Pivot = styled<IPivotProps, IPivotStyleProps, IPivotStyles>(
  PivotBase,
  getStyles
);
