'use client';

import * as React from 'react';
import { useTagGroupBase_unstable } from '@fluentui/react-tags';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';

import type { TagGroupProps, TagGroupState } from './TagGroup.types';
import { toDataAttributeValue } from '../../utils';
import { useTagDismissFocus } from '../../utils/useTagDismissFocus';

/**
 * Returns the state for a TagGroup component, given its props and ref.
 */
export const useTagGroup = (props: TagGroupProps, ref: React.Ref<HTMLDivElement>): TagGroupState => {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const restoreFocusOnDismiss = useTagDismissFocus(innerRef);

  const state: TagGroupState = useTagGroupBase_unstable(
    {
      ...props,
      onDismiss: useEventCallback((event, data) => {
        props.onDismiss?.(event, data);
        restoreFocusOnDismiss(event);
      }),
    },
    useMergedRefs(ref, innerRef),
  );

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with focusgroup + data-* attrs */
  state.root.focusgroup = 'toolbar inline wrap';
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-dismissible'] = toDataAttributeValue(state.dismissible);
  /* eslint-enable react-hooks/immutability */

  return state;
};
