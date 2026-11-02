'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  useControllableState,
  useEventCallback,
  mergeCallbacks,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import type { TagGroupBaseProps, TagGroupBaseState, TagGroupProps, TagGroupState } from './TagGroup.types';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { interactionTagSecondaryClassNames } from '../InteractionTagSecondary/useInteractionTagSecondaryStyles.styles';
import type { TagValue } from '../../utils/types';

/**
 * Create the base state required to render TagGroup, without design-only props.
 *
 * @param props - props from this instance of TagGroup (without appearance, size)
 * @param ref - reference to root HTMLDivElement of TagGroup
 */
export const useTagGroupBase_unstable = (
  props: TagGroupBaseProps,
  ref: React.Ref<HTMLDivElement>,
): TagGroupBaseState => {
  const {
    onDismiss,
    disabled = false,
    defaultSelectedValues,
    dismissible = false,
    role = 'toolbar',
    onTagSelect,
    selectedValues,
    ...rest
  } = props;

  const [items, setItems] = useControllableState<Array<TagValue>>({
    defaultState: defaultSelectedValues,
    state: selectedValues,
    initialState: [],
  });

  const handleTagDismiss: TagGroupBaseState['handleTagDismiss'] = useEventCallback((e, data) => {
    onDismiss?.(e, data);
  });

  const handleTagSelect: TagGroupBaseState['handleTagSelect'] = useEventCallback(
    mergeCallbacks(onTagSelect, (_, data) => {
      if (items.includes(data.value)) {
        setItems(items.filter(item => item !== data.value));
      } else {
        setItems([...items, data.value]);
      }
    }),
  );

  return {
    handleTagDismiss,
    handleTagSelect: onTagSelect ? handleTagSelect : undefined,
    selectedValues: items,
    role,
    disabled,
    dismissible,
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role,
        'aria-disabled': disabled,
        ...rest,
      }),
      { elementType: 'div' },
    ),
  };
};

/**
 * Create the state required to render TagGroup.
 *
 * The returned state can be modified with hooks such as useTagGroupStyles_unstable,
 * before being passed to renderTagGroup_unstable.
 *
 * @param props - props from this instance of TagGroup
 * @param ref - reference to root HTMLDivElement of TagGroup
 */
export const useTagGroup_unstable = (props: TagGroupProps, ref: React.Ref<HTMLDivElement>): TagGroupState => {
  const { size = 'medium', appearance = 'filled' } = props;

  const { targetDocument } = useFluent();
  const { findNextFocusable, findPrevFocusable } = useFocusFinders();

  const arrowNavigationProps = useArrowNavigationGroup({
    circular: true,
    axis: 'both',
    memorizeCurrent: true,
  });

  const innerRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(ref, innerRef);

  const enhancedOnDismiss: TagGroupProps['onDismiss'] = useEventCallback((e, data) => {
    props.onDismiss?.(e, data);

    const container = innerRef.current;
    const activeElement = targetDocument?.activeElement;

    if (container?.contains(activeElement as HTMLElement)) {
      // focus on next tag only if the active element is within the current tag group
      const next = findNextFocusable(activeElement as HTMLElement, { container });
      if (next) {
        next.focus();
        return;
      }

      // if there is no next focusable, focus on the previous focusable
      if (activeElement?.className.includes(interactionTagSecondaryClassNames.root)) {
        const prev = findPrevFocusable(activeElement.parentElement as HTMLElement, { container });
        prev?.focus();
      } else {
        const prev = findPrevFocusable(activeElement as HTMLElement, { container });
        prev?.focus();
      }
    }
  });

  return {
    ...useTagGroupBase_unstable({ ...arrowNavigationProps, ...props, onDismiss: enhancedOnDismiss }, mergedRef),
    size,
    appearance,
  };
};
