'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderInteractionTagSecondary,
  useInteractionTagSecondary,
} from '@fluentui/react-headless-components-preview/interaction-tag';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { useInteractionTagContext } from '../InteractionTag/InteractionTagContext';
import type { InteractionTagSecondaryProps, InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import { useInteractionTagSecondaryStyles } from './useInteractionTagSecondaryStyles';

/**
 * The secondary, dismissing action of an InteractionTag. Takes no look props: appearance, shape
 * and size come only from the tag.
 */
export const InteractionTagSecondary: ForwardRefComponent<InteractionTagSecondaryProps> = React.forwardRef(
  (props, ref) => {
    const { appearance = 'filled', shape = 'rounded', size = 'medium' } = useInteractionTagContext();
    const base = useInteractionTagSecondary(props, ref);

    // The headless secondary ships no glyph of its own and the renderer draws the button
    // unconditionally, so an unrestored root is a correctly-padded empty hole. Consumer children
    // always win; `children={[]}` still renders nothing, matching Griffel on all eight inputs.
    const state: InteractionTagSecondaryState = {
      ...base,
      root: { ...base.root, children: base.root.children ?? <DismissRegular /> },
      appearance,
      shape,
      size,
    };

    return renderInteractionTagSecondary(useInteractionTagSecondaryStyles(state));
  },
);

InteractionTagSecondary.displayName = 'InteractionTagSecondary';
