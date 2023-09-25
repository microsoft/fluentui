import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useInteractionTagPrimary_unstable } from './useInteractionTagPrimary';
import { renderInteractionTagPrimary_unstable } from './renderInteractionTagPrimary';
import { useInteractionTagPrimaryStyles_unstable } from './useInteractionTagPrimaryStyles.styles';
import type { InteractionTagPrimaryProps } from './InteractionTagPrimary.types';
import { useTagAvatarContextValues_unstable } from '../../utils';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * InteractionTagPrimary component - used as the first child of the `InteractionTag` component.
 * Provides visual attributes such as media, icon, primary and secondary text, as well as the ability to attach a primary action.
 */
export const InteractionTagPrimary: ForwardRefComponent<InteractionTagPrimaryProps> = React.forwardRef((props, ref) => {
  const state = useInteractionTagPrimary_unstable(props, ref);

  useInteractionTagPrimaryStyles_unstable(state);

  useCustomStyleHook_unstable('useInteractionTagPrimaryStyles_unstable')(state);

  return renderInteractionTagPrimary_unstable(state, useTagAvatarContextValues_unstable(state));
});

InteractionTagPrimary.displayName = 'InteractionTagPrimary';
