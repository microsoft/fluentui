import * as React from 'react';
import { getNativeElementProps, getRTLSafeKey, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent } from '@fluentui/react-shared-contexts';
import type { MenuSplitGroupProps, MenuSplitGroupState } from './MenuSplitGroup.types';
import { ArrowRight, ArrowLeft } from '@fluentui/keyboard-keys';

/**
 * Create the state required to render MenuSplitGroup.
 *
 * The returned state can be modified with hooks such as useMenuSplitGroupStyles_unstable,
 * before being passed to renderMenuSplitGroup_unstable.
 *
 * @param props - props from this instance of MenuSplitGroup
 * @param ref - reference to root HTMLElement of MenuSplitGroup
 */
export const useMenuSplitGroup_unstable = (
  props: MenuSplitGroupProps,
  ref: React.Ref<HTMLElement>,
): MenuSplitGroupState => {
  const innerRef = React.useRef<HTMLElement>();
  const { dir, targetDocument } = useFluent();

  const nextArrowKey = getRTLSafeKey(ArrowRight, dir);
  const prevArrowKey = getRTLSafeKey(ArrowLeft, dir);

  const { findNextFocusable, findPrevFocusable } = useFocusFinders();

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const activeElement = targetDocument?.activeElement;
      if (!activeElement) {
        return;
      }

      if (!innerRef.current?.contains(activeElement)) {
        return;
      }

      if (e.key === nextArrowKey) {
        const next = findNextFocusable(activeElement as HTMLElement, { container: innerRef.current });
        next?.focus();
      }

      if (e.key === prevArrowKey) {
        const prev = findPrevFocusable(activeElement as HTMLElement, { container: innerRef.current });
        prev?.focus();
      }
    },
    [findNextFocusable, findPrevFocusable, targetDocument, nextArrowKey, prevArrowKey],
  );

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      role: 'group',
      ref: useMergedRefs(ref, innerRef),
      onKeyDown,
      ...props,
    }),
  };
};
