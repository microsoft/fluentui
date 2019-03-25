import { styled } from '../../Utilities';
import { IPivotProps, IPivotStyleProps, IPivotStyles } from './Pivot.types';
import { PivotBase } from './Pivot.base';
import { getStyles } from './Pivot.styles';

/**
 * The Pivot control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. Pivots allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
export const Pivot: React.StatelessComponent<IPivotProps> = styled<IPivotProps, IPivotStyleProps, IPivotStyles>(
  PivotBase,
  getStyles,
  undefined,
  {
    scope: 'Pivot'
  }
);
