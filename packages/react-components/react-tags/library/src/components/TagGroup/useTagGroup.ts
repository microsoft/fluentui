import * as React from 'react';
import {
  getIntrinsicElementProps,
  useControllableState,
  useEventCallback,
  mergeCallbacks,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import type { TagGroupProps, TagGroupState } from './TagGroup.types';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { interactionTagSecondaryClassNames } from '../InteractionTagSecondary/useInteractionTagSecondaryStyles.styles';
import type { TagValue } from '../../utils/types';

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
  const {
    onDismiss,
    disabled = false,
    defaultSelectedValues,
    size = 'medium',
    appearance = 'filled',
    dismissible = false,
    role = 'toolbar',
    onTagSelect,
    selectedValues,
    ...rest
  } = props;

  const innerRef = React.useRef<HTMLElement>(undefined);
  const { targetDocument } = useFluent();
  const { findNextFocusable, findPrevFocusable } = useFocusFinders();

  const [items, setItems] = useControllableState<Array<TagValue>>({
    defaultState: defaultSelectedValues,
    state: selectedValues,
    initialState: [],
  });

  const handleTagDismiss: TagGroupState['handleTagDismiss'] = useEventCallback((e, data) => {
    onDismiss?.(e, data);

    // set focus after tag dismiss
    const activeElement = targetDocument?.activeElement;
    if (innerRef.current?.contains(activeElement as HTMLElement)) {
      // focus on next tag only if the active element is within the current tag group
      const next = findNextFocusable(activeElement as HTMLElement, { container: innerRef.current });
      if (next) {
        next.focus();
        return;
      }

      // if there is no next focusable, focus on the previous focusable
      if (activeElement?.className.includes(interactionTagSecondaryClassNames.root)) {
        const prev = findPrevFocusable(activeElement.parentElement as HTMLElement, { container: innerRef.current });
        prev?.focus();
      } else {
        const prev = findPrevFocusable(activeElement as HTMLElement, { container: innerRef.current });
        prev?.focus();
      }
    }
  });

  const handleTagSelect: TagGroupState['handleTagSelect'] = useEventCallback(
    mergeCallbacks(onTagSelect, (_, data) => {
      if (items.includes(data.value)) {
        setItems(items.filter(item => item !== data.value));
      } else {
        setItems([...items, data.value]);
      }
    }),
  );

  const arrowNavigationProps = useArrowNavigationGroup({
    circular: true,
    axis: 'both',
    memorizeCurrent: true,
  });

  return {
    handleTagDismiss,
    handleTagSelect: onTagSelect ? handleTagSelect : undefined,
    selectedValues: items,
    role,
    size,
    disabled,
    appearance,
    dismissible,
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLDivElement>,
        role,
        'aria-disabled': disabled,
        ...arrowNavigationProps,
        ...rest,
      }),
      { elementType: 'div' },
    ),
  };
};
