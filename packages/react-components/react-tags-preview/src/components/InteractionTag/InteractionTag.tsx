import * as React from 'react';
import { useInteractionTag_unstable } from './useInteractionTag';
import { renderInteractionTag_unstable } from './renderInteractionTag';
import { useInteractionTagStyles_unstable } from './useInteractionTagStyles.styles';
import type { InteractionTagProps } from './InteractionTag.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagContextValues_unstable } from '../../utils/useTagContextValues';

/**
 * InteractionTag component - TODO: add more docs
 */
export const InteractionTag: ForwardRefComponent<InteractionTagProps> = React.forwardRef((props, ref) => {
  const state = useInteractionTag_unstable(props, ref);

  useInteractionTagStyles_unstable(state);
  return renderInteractionTag_unstable(state, useTagContextValues_unstable(state));
});

InteractionTag.displayName = 'InteractionTag';
