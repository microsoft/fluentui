import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InteractiveTabProps } from './InteractiveTab.types';
import { renderInteractiveTab_unstable } from './renderInteractiveTab';
import { useInteractiveTab_unstable } from './useInteractiveTab';
import { useInteractiveTabStyles_unstable } from './useInteractiveTabStyles.styles';

/**
 * A tab provides a selectable item in a tab list.
 */
export const InteractiveTab: ForwardRefComponent<InteractiveTabProps> = React.forwardRef((props, ref) => {
  const state = useInteractiveTab_unstable(props, ref);

  useInteractiveTabStyles_unstable(state);

  return renderInteractiveTab_unstable(state);
});

InteractiveTab.displayName = 'InteractiveTab';
