import * as React from 'react';
import { styled } from '@fluentui/utilities';
import { PivotBase } from './Pivot.base';
import { getStyles } from './Pivot.styles';
import type { IPivotProps, IPivotStyleProps, IPivotStyles } from './Pivot.types';

/**
 * The Pivot control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. Pivots allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
export const Pivot: React.FunctionComponent<IPivotProps> = styled<IPivotProps, IPivotStyleProps, IPivotStyles>(
  PivotBase,
  getStyles,
  undefined,
  {
    scope: 'Pivot',
  },
);
