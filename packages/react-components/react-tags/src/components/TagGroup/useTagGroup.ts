import * as React from 'react';
import { getNativeElementProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TagGroupProps, TagGroupState } from './TagGroup.types';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { tagClassNames } from '../Tag/index';
import { tagButtonClassNames } from '../TagButton/index';

/**
 * Create the state required to render TagGroup.
 *
 * The returned state can be modified with hooks such as useTagGroupStyles_unstable,
 * before being passed to renderTagGroup_unstable.
 *
 * @param props - props from this instance of TagGroup
 * @param ref - reference to root HTMLElement of TagGroup
 */
export const useTagGroup_unstable = (props: TagGroupProps, ref: React.Ref<HTMLElement>): TagGroupState => {
  const { onDismiss, size = 'medium' } = props;

  const innerRef = React.useRef<HTMLElement>();
  const { targetDocument } = useFluent();
  const { findNextFocusable, findFirstFocusable } = useFocusFinders();

  const handleTagDismiss = useEventCallback((e: React.MouseEvent | React.KeyboardEvent, id: string) => {
    onDismiss?.(e, { dismissedTagValue: id });

    // set focus after tag dismiss
    const activeElement = targetDocument?.activeElement;
    if (
      activeElement?.className.includes(tagClassNames.root) ||
      activeElement?.className.includes(tagButtonClassNames.dismissButton)
    ) {
      // focus on next tag only if the active element is a tag/tag button
      const next =
        findNextFocusable(activeElement as HTMLElement, { container: innerRef.current }) ??
        findFirstFocusable(innerRef.current as HTMLElement);
      next?.focus();
    }
  });

  const arrowNavigationProps = useArrowNavigationGroup({
    circular: true,
    axis: 'both',
  });

  return {
    dismissible: !!onDismiss,
    handleTagDismiss,
    size,

    components: {
      root: 'div',
    },

    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, innerRef),
      role: 'listbox',
      ...arrowNavigationProps,
      ...props,
    }),
  };
};
