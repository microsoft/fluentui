'use client';

import * as React from 'react';
import { useTagGroupBase_unstable } from '@fluentui/react-tags';
import { isHTMLElement, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';

import type { TagGroupProps, TagGroupState } from './TagGroup.types';
import { toDataAttributeValue } from '../../utils';
import { findNextFocusable, findPrevFocusable } from '../../hooks/focus';
import { INTERACTION_TAG_ATTRIBUTE } from '../InteractionTag/useInteractionTag';

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

    // An InteractionTag is dismissed as a whole, so neither of its actions is a valid destination.
    const dismissedTag = activeElement.closest<HTMLElement>(`[${INTERACTION_TAG_ATTRIBUTE}]`);
    const dismissed = dismissedTag && container.contains(dismissedTag) ? dismissedTag : activeElement;

    let next = findNextFocusable(activeElement, { container });
    while (next && dismissed.contains(next)) {
      next = findNextFocusable(next, { container });
    }
    if (next) {
      next.focus();
      return;
    }

    findPrevFocusable(dismissed, { container })?.focus();
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
