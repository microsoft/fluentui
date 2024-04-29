/* eslint-disable deprecation/deprecation */
import * as React from 'react';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderInfoButton_unstable } from './renderInfoButton';
import { useInfoButton_unstable } from './useInfoButton';
import { useInfoButtonStyles_unstable } from './useInfoButtonStyles.styles';
import type { InfoButtonProps } from './InfoButton.types';

/**
 * InfoButtons provide a way to display additional information about a form field or an area in the UI.
 *
 * @deprecated use {@link @fluentui/react-components#InfoLabel} from `\@fluentui/react-components` or `\@fluentui/react-infolabel` instead
 */
export const InfoButton: ForwardRefComponent<InfoButtonProps> = React.forwardRef((props, ref) => {
  const state = useInfoButton_unstable(props, ref);

  useInfoButtonStyles_unstable(state);
  return renderInfoButton_unstable(state);
});

InfoButton.displayName = 'InfoButton';
