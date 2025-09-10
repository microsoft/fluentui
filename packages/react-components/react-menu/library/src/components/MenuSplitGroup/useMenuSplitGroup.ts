import * as React from 'react';
import { getIntrinsicElementProps, getRTLSafeKey, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { MenuSplitGroupProps, MenuSplitGroupState } from './MenuSplitGroup.types';
import { ArrowRight, ArrowLeft } from '@fluentui/keyboard-keys';
import { menuSplitGroupMultilineAttr } from './useMenuSplitGroupStyles.styles';

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
  const innerRef = React.useRef<HTMLDivElement>(undefined);
  const { dir, targetDocument } = useFluent();

  const nextArrowKey = getRTLSafeKey(ArrowRight, dir);
  const prevArrowKey = getRTLSafeKey(ArrowLeft, dir);

  const { findNextFocusable, findPrevFocusable } = useFocusFinders();
  const { multilineRef, setMultiline } = useHandleMultilineMenuItem();

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
    setMultiline,
    root: slot.always(
      getIntrinsicElementProps('div', {
        role: 'group',
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, innerRef, multilineRef) as React.Ref<HTMLDivElement>,
        onKeyDown,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};

/**
 * Creates a callback that lets a multiline menu item child set an attribute on this component
 * Children can mount before parents so we need to store the value and apply it when the parent is mounted
 */
const useHandleMultilineMenuItem = () => {
  const [handle] = React.useState(() => {
    let isMultiline = false;
    let multilineNode: HTMLElement | null = null;

    function applyAttr() {
      multilineNode?.toggleAttribute(menuSplitGroupMultilineAttr, isMultiline);
    }

    return {
      multilineRef: (node: HTMLDivElement | null) => {
        if (node) {
          multilineNode = node;
          applyAttr();
        } else {
          multilineNode = null;
        }
      },
      setMultiline: (value: boolean) => {
        isMultiline = value;
        applyAttr();
      },
    };
  });

  return handle;
};
