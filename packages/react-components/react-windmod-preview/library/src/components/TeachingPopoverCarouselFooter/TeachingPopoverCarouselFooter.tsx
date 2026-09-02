/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
'use client';

import * as React from 'react';
import { assertSlots, slot, type ForwardRefComponent, type JSXElement } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverCarouselFooter as renderTeachingPopoverCarouselFooterHeadless,
  useTeachingPopoverCarouselFooter as useTeachingPopoverCarouselFooterHeadless,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';
import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterSlots,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import { useTeachingPopoverCarouselFooterStyles } from './useTeachingPopoverCarouselFooterStyles';

// Windmod re-spells both button slots over its own footer button (see the types file), so the two
// headless entry points are re-typed at the seam — the same aliasing the headless package applies
// to the reference's own exports.
const useTeachingPopoverCarouselFooter = useTeachingPopoverCarouselFooterHeadless as unknown as (
  props: Omit<TeachingPopoverCarouselFooterProps, 'layout'>,
  ref: React.Ref<HTMLDivElement>,
) => Omit<TeachingPopoverCarouselFooterState, 'layout'>;

const renderTeachingPopoverCarouselFooter = renderTeachingPopoverCarouselFooterHeadless as unknown as (
  state: TeachingPopoverCarouselFooterState,
) => JSXElement;

/**
 * The navigation row of a TeachingPopoverCarousel. Windmod TeachingPopoverCarouselFooter: the
 * headless footer with its two buttons re-resolved onto windmod's own, the layout look prop the
 * headless surface omits, and the ordering that look prop drives.
 */
export const TeachingPopoverCarouselFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps> = React.forwardRef(
  (props, ref) => {
    const { layout = 'centered', ...rest } = props;
    const base = useTeachingPopoverCarouselFooter(rest, ref);

    const previousSlot = slot.optional(props.previous, {
      defaultProps: { navType: 'prev' as const },
      renderByDefault: true,
      elementType: TeachingPopoverCarouselFooterButton,
    });
    const nextSlot = slot.always(props.next, {
      defaultProps: { navType: 'next' as const },
      elementType: TeachingPopoverCarouselFooterButton,
    });

    const state: TeachingPopoverCarouselFooterState = useTeachingPopoverCarouselFooterStyles({
      ...base,
      // Both halves of the swap are required: the renderer re-derives each slot's element type from
      // this map and writes it back onto the slot when the two disagree.
      components: {
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
        ...base.components,
        previous: TeachingPopoverCarouselFooterButton,
        next: TeachingPopoverCarouselFooterButton,
      },
      layout,
      previous: previousSlot,
      next: nextSlot,
    });

    assertSlots<TeachingPopoverCarouselFooterSlots>(state);

    // The offset layout moves the previous button behind the row's own children, which the headless
    // renderer draws in one fixed order. Composing it into those children is what puts it there in
    // the DOM, and therefore in reading and tab order too.
    const rendered: TeachingPopoverCarouselFooterState =
      layout === 'offset' && state.previous
        ? {
            ...state,
            previous: undefined,
            root: {
              ...state.root,
              children: (
                <>
                  {state.root.children}
                  <state.previous />
                </>
              ),
            },
          }
        : state;

    return renderTeachingPopoverCarouselFooter(rendered);
  },
);

TeachingPopoverCarouselFooter.displayName = 'TeachingPopoverCarouselFooter';
