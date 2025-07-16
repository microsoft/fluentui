import * as React from 'react';
import { useMergedRefs, getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import {
  useArrowNavigationGroup,
  TabsterMoveFocusEventName,
  type TabsterMoveFocusEvent,
} from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { MenuContext } from '../../contexts/menuContext';
import type { MenuGridProps, MenuGridState } from './MenuGrid.types';

/**
 * Returns the props and state required to render the component
 */
export const useMenuGrid_unstable = (props: MenuGridProps, ref: React.Ref<HTMLElement>): MenuGridState => {
  const { targetDocument } = useFluent();
  const hasMenuContext = useHasParentContext(MenuContext);
  const focusAttributes = useArrowNavigationGroup({ axis: 'grid' });

  const innerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = innerRef.current;

    if (hasMenuContext && targetDocument && element) {
      const onTabsterMoveFocus = (e: TabsterMoveFocusEvent) => {
        const nextElement = e.detail.next;

        if (nextElement && element.contains(targetDocument.activeElement) && !element.contains(nextElement)) {
          // Preventing Tabster from handling Tab press, useMenuPopover will handle it.
          e.preventDefault();
        }
      };

      targetDocument.addEventListener(TabsterMoveFocusEventName, onTabsterMoveFocus);

      return () => {
        targetDocument.removeEventListener(TabsterMoveFocusEventName, onTabsterMoveFocus);
      };
    }
  }, [innerRef, targetDocument, hasMenuContext]);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLDivElement>,
        role: 'grid',
        ...focusAttributes,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
