/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
'use client';

import * as React from 'react';
import { assertSlots, mergeCallbacks, slot, type ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverFooter,
  useTeachingPopoverFooter,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import { Button } from '../Button/Button';
import type { ButtonAppearance } from '../Button/Button.types';
import { usePopoverLook } from '../Popover/PopoverContext';
import type {
  TeachingPopoverFooterButtonSlot,
  TeachingPopoverFooterProps,
  TeachingPopoverFooterState,
} from './TeachingPopoverFooter.types';
import { useTeachingPopoverFooterStyles } from './useTeachingPopoverFooterStyles';

const EMPHASIS: ButtonAppearance = 'primary';

/**
 * The action row of a TeachingPopover. Windmod TeachingPopoverFooter: the headless footer plus the
 * two Button slots the headless base hook leaves to the styled layer, and the auto-close handler it
 * publishes for one of them.
 */
export const TeachingPopoverFooter: ForwardRefComponent<TeachingPopoverFooterProps> = React.forwardRef((props, ref) => {
  const { primary, secondary, ...rest } = props;
  const base = useTeachingPopoverFooter(rest, ref);
  const { appearance } = usePopoverLook();

  // Griffel inverts the emphasis under brand: on a brand surface the SECONDARY slot is the
  // filled one. Both go through defaultProps, so a consumer's own appearance still wins.
  const isBrand = appearance === 'brand';

  const secondarySlot = slot.optional(secondary, {
    defaultProps: { appearance: isBrand ? EMPHASIS : undefined },
    renderByDefault: false,
    elementType: Button,
  });
  const primarySlot = slot.always(primary, {
    defaultProps: { appearance: isBrand ? undefined : EMPHASIS },
    elementType: Button,
  });

  // The base hook publishes an auto-close handler and wires it to nothing. It belongs on the
  // dismissing action — the secondary where there is one, the primary otherwise, never both.
  // A spread drops the call signature a slot carries for JSX, so it is restored by assertion.
  const closing = (slotProps: TeachingPopoverFooterButtonSlot): TeachingPopoverFooterButtonSlot =>
    ({
      ...slotProps,
      onClick: mergeCallbacks(base.handleButtonClick, slotProps.onClick),
    }) as TeachingPopoverFooterButtonSlot;

  const state: TeachingPopoverFooterState = useTeachingPopoverFooterStyles({
    ...base,
    appearance,
    primary: secondarySlot ? primarySlot : closing(primarySlot),
    secondary: secondarySlot && closing(secondarySlot),
  });

  assertSlots<Pick<TeachingPopoverFooterState, 'root'>>(state);

  // The headless render draws the root and nothing else, so the slots reach the DOM as its
  // children. Consumer children always win — a footer given its own buttons keeps them.
  const rendered: TeachingPopoverFooterState = {
    ...state,
    root: {
      ...state.root,
      children: state.root.children ?? (
        <>
          <state.primary />
          {state.secondary && <state.secondary />}
        </>
      ),
    },
  };

  return renderTeachingPopoverFooter(rendered);
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<TeachingPopoverFooterProps>;

TeachingPopoverFooter.displayName = 'TeachingPopoverFooter';
