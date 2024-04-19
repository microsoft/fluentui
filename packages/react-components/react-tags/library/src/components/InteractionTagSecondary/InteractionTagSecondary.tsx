import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useInteractionTagSecondary_unstable } from './useInteractionTagSecondary';
import { renderInteractionTagSecondary_unstable } from './renderInteractionTagSecondary';
import { useInteractionTagSecondaryStyles_unstable } from './useInteractionTagSecondaryStyles.styles';
import type { InteractionTagSecondaryProps } from './InteractionTagSecondary.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * InteractionTagSecondary component - used as the second child of the `InteractionTag` component and provides the secondary action, which is dismiss by default.
 */
export const InteractionTagSecondary: ForwardRefComponent<InteractionTagSecondaryProps> = React.forwardRef(
  (props, ref) => {
    const state = useInteractionTagSecondary_unstable(props, ref);

    useInteractionTagSecondaryStyles_unstable(state);

    useCustomStyleHook_unstable('useInteractionTagSecondaryStyles_unstable')(state);

    return renderInteractionTagSecondary_unstable(state);
  },
);

InteractionTagSecondary.displayName = 'InteractionTagSecondary';
