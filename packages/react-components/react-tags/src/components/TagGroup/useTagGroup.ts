import * as React from 'react';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import type { TagGroupProps, TagGroupState } from './TagGroup.types';
import { useFocusFinders } from '@fluentui/react-tabster';
import { tagButtonClassNames } from '../TagButton/useTagButtonStyles.styles';

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
  const { findLastFocusable, findPrevFocusable } = useFocusFinders();
  const innerRef = React.useRef<HTMLDivElement>(null);

  const handleTagDismiss = React.useCallback(() => {
    const lastFocusable = findLastFocusable(innerRef.current as HTMLElement);
    if (lastFocusable && lastFocusable.classList.contains(tagButtonClassNames.dismissButton)) {
      findPrevFocusable(lastFocusable)?.focus();
    } else {
      lastFocusable?.focus();
    }
  }, [findLastFocusable, findPrevFocusable]);

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, innerRef),
      // TODO aria attributes
      ...props,
    }),
    handleTagDismiss,
  };
};
