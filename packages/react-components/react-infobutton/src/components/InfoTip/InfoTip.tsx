import * as React from 'react';
import { useInfoTip_unstable } from './useInfoTip';
import { renderInfoTip_unstable } from './renderInfoTip';
import { useInfoTipStyles_unstable } from './useInfoTipStyles.styles';
import type { InfoTipProps } from './InfoTip.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * InfoTip component - TODO: add more docs
 */
export const InfoTip: ForwardRefComponent<InfoTipProps> = React.forwardRef((props, ref) => {
  const state = useInfoTip_unstable(props, ref);

  useInfoTipStyles_unstable(state);
  return renderInfoTip_unstable(state);
});

InfoTip.displayName = 'InfoTip';
