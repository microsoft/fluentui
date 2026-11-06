'use client';

import * as React from 'react';
import { useTagGroupBase_unstable } from '@fluentui/react-tags';
import { isHTMLElement, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';

import type { TagGroupProps, TagGroupState } from './TagGroup.types';
import { toDataAttributeValue } from '../../utils';
import { findNextFocusable, findPrevFocusable } from '../../hooks/focus';

/**
 * Returns the state for a TagGroup component, given its props and ref.
 * When a tag is dismissed while focused, focus moves to the next tag, or to the previous one when it was the last.
 */
export const useTagGroup = (props: TagGroupProps, ref: React.Ref<HTMLDivElement>): TagGroupState => {
  const innerRef = React.useRef<HTMLDivElement>(null);

  const onDismiss: TagGroupProps['onDismiss'] = useEventCallback((event, data) => {
    props.onDismiss?.(event, data);

    const container = innerRef.current;
    const activeElement = container?.ownerDocument.activeElement;
    if (!container || !isHTMLElement(activeElement) || !container.contains(activeElement)) {
      return;
    }

    const next = findNextFocusable(activeElement, { container });
    if (next) {
      next.focus();
      return;
    }

    // Skip the rest of the dismissed tag, e.g. the primary action of an InteractionTag whose secondary was focused.
    const parent = activeElement.parentElement;
    const dismissedTag = parent && parent !== container ? parent : activeElement;
    findPrevFocusable(dismissedTag, { container })?.focus();
  });

  const state: TagGroupState = useTagGroupBase_unstable(
    { ...props, onDismiss },
    useMergedRefs(ref, innerRef) as React.Ref<HTMLDivElement>,
  );

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with focusgroup + data-* attrs */
  state.root.focusgroup = 'toolbar inline wrap';
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-dismissible'] = toDataAttributeValue(state.dismissible);
  /* eslint-enable react-hooks/immutability */

  return state;
};
