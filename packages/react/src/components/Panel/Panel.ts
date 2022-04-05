import * as React from 'react';
import { styled } from '../../Utilities';
import { PanelBase } from './Panel.base';
import { getStyles } from './Panel.styles';
import type { IPanelProps, IPanelStyleProps, IPanelStyles } from './Panel.types';

/**
 * Panel description
 */
export const Panel: React.FunctionComponent<IPanelProps> = styled<IPanelProps, IPanelStyleProps, IPanelStyles>(
  PanelBase,
  getStyles,
  undefined,
  {
    scope: 'Panel',
  },
);
