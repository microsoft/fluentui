import * as React from 'react';
import { useInteractionTag_unstable } from './useInteractionTag';
import { renderInteractionTag_unstable } from './renderInteractionTag';
import { useInteractionTagStyles_unstable } from './useInteractionTagStyles.styles';
import { useInteractionTagContextValues_unstable } from './useInteractionTagContextValues';
import type { InteractionTagProps } from './InteractionTag.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * InteractionTag component - a visual representation of an attribute with primary and secondary actions.
 * Can have `InteractionTagPrimary` and `InteractionTagSecondary` components as its children.
 */
export const InteractionTag: ForwardRefComponent<InteractionTagProps> = React.forwardRef((props, ref) => {
  const state = useInteractionTag_unstable(props, ref);

  useInteractionTagStyles_unstable(state);

  useCustomStyleHook_unstable('useInteractionTagStyles_unstable')(state);

  return renderInteractionTag_unstable(state, useInteractionTagContextValues_unstable(state));
});

InteractionTag.displayName = 'InteractionTag';
