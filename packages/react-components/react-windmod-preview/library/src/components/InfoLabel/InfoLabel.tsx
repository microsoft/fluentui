'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderInfoLabel, useInfoLabel } from '@fluentui/react-headless-components-preview/info-label';

import { InfoButton } from '../InfoButton';
import { Label } from '../Label';
import type { InfoLabelProps } from './InfoLabel.types';
import { useInfoLabelStyles } from './useInfoLabelStyles';

/**
 * An InfoLabel is a Label with an InfoButton beside it. Windmod InfoLabel: the headless info label
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const InfoLabel: ForwardRefComponent<InfoLabelProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them, and it
  // forwards `size` to neither child. Defaults mirror @fluentui/react-infolabel's styled
  // useInfoLabel. `weight` is not destructured: it rides `...rest` into the label slot.
  ({ size = 'medium', ...rest }: InfoLabelProps, ref: React.Ref<HTMLLabelElement>) => {
    const state = useInfoLabel(rest, ref);

    return renderInfoLabel(
      useInfoLabelStyles({
        ...state,
        // Both slots are re-slotted, not merely swapped in components — see InfoButton.tsx.
        // `size` first so a consumer's own label/infoButton shorthand still wins.
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
        components: { ...state.components, label: Label, infoButton: InfoButton },
        label: slot.always({ size, ...state.label }, { elementType: Label }),
        infoButton: state.infoButton && slot.always({ size, ...state.infoButton }, { elementType: InfoButton }),
        size,
      }),
    );
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<InfoLabelProps>;

InfoLabel.displayName = 'InfoLabel';
