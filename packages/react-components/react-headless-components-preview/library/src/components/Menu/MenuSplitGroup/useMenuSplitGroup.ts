'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight } from '@fluentui/keyboard-keys';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getIntrinsicElementProps,
  getRTLSafeKey,
  isHTMLElement,
  slot,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { MenuSplitGroupProps, MenuSplitGroupState } from '@fluentui/react-menu';
import { findNextFocusable, findPrevFocusable } from '../../../hooks/focus';

/**
 * Headless `useMenuSplitGroup`.
 * Renders a `role="group"` div and wires the consumer ref. The inline arrow keys move focus between the
 * items of the group.
 */
export const useMenuSplitGroup = (props: MenuSplitGroupProps, ref: React.Ref<HTMLElement>): MenuSplitGroupState => {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const { dir } = useFluent();
  const nextArrowKey = getRTLSafeKey(ArrowRight, dir);
  const prevArrowKey = getRTLSafeKey(ArrowLeft, dir);

  const onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const container = innerRef.current;
    const activeElement = container?.ownerDocument.activeElement;
    if (!container || !isHTMLElement(activeElement) || !container.contains(activeElement)) {
      return;
    }

    if (event.key === nextArrowKey) {
      findNextFocusable(activeElement, { container })?.focus();
    } else if (event.key === prevArrowKey) {
      findPrevFocusable(activeElement, { container })?.focus();
    }
  });

  return {
    components: {
      root: 'div',
    },
    setMultiline: NOOP_SET_MULTILINE,
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME: `ref` is wrongly typed as `Ref<HTMLElement>` instead of
        // `Ref<HTMLDivElement>` upstream; casting to keep behaviour aligned.
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLDivElement>,
        role: 'group',
        onKeyDown,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};

const NOOP_SET_MULTILINE = () => {
  /* no-op: multiline attribute is a styling concern handled by consumers. */
};
