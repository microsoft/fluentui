import { styled } from '../../Utilities';
import { IPanelProps, IPanelStyleProps, IPanelStyles } from './Panel.types';
import { PanelBase } from './Panel.base';
import { getStyles } from './Panel.styles';

/**
 * Panel description
 */
export const Panel: React.StatelessComponent<IPanelProps> = styled<IPanelProps, IPanelStyleProps, IPanelStyles>(
  PanelBase,
  getStyles,
  undefined,
  {
    scope: 'Panel'
  }
);
