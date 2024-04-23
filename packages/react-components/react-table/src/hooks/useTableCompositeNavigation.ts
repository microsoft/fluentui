import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { ArrowDown, ArrowRight, ArrowUp } from '@fluentui/keyboard-keys';
import {
  useArrowNavigationGroup,
  useFocusableGroup,
  useMergedTabsterAttributes_unstable,
  TabsterDOMAttribute,
  useFocusFinders,
  GroupperMoveFocusEvent,
  MoverMoveFocusEvent,
  GroupperMoveFocusActions,
  MoverKeys,
} from '@fluentui/react-tabster';
import { isHTMLElement } from '@fluentui/react-utilities';

export function useTableCompositeNavigation(): {
  onTableKeyDown: React.KeyboardEventHandler;
  tableTabsterAttribute: TabsterDOMAttribute;
  tableRowTabsterAttribute: TabsterDOMAttribute;
} {
  const horizontalAttr = useArrowNavigationGroup({ axis: 'horizontal' });
  const gridAttr = useArrowNavigationGroup({ axis: 'grid' });
  const groupperAttr = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent();

  const rowAttr = useMergedTabsterAttributes_unstable(horizontalAttr, groupperAttr);

  const onKeyDown: React.KeyboardEventHandler = React.useCallback(
    e => {
      if (!targetDocument) {
        return;
      }

      let activeElement = targetDocument.activeElement;
      if (!activeElement || !e.currentTarget.contains(activeElement)) {
        return;
      }
      const activeElementRole = activeElement.getAttribute('role');

      // Enter groupper when in row focus mode to navigate cells
      if (e.key === ArrowRight && activeElementRole === 'row' && isHTMLElement(activeElement)) {
        findFirstFocusable(activeElement)?.focus();
      }

      if (activeElementRole === 'row') {
        return;
      }

      const isInCell = (() => {
        let cur = isHTMLElement(activeElement) ? activeElement : null;
        while (cur) {
          const curRole = cur.getAttribute('role');
          if (curRole === 'cell' || curRole === 'gridcell') {
            return true;
          }

          cur = cur.parentElement;
        }

        return false;
      })();

      // Escape groupper focus trap before arrow down
      if ((e.key === ArrowDown || e.key === ArrowUp) && isInCell) {
        activeElement.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Escape }));

        activeElement = targetDocument.activeElement;

        if (activeElement) {
          activeElement.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys[e.key] }));
        }
      }
    },
    [targetDocument, findFirstFocusable],
  );

  return {
    onTableKeyDown: onKeyDown,
    tableTabsterAttribute: gridAttr,
    tableRowTabsterAttribute: rowAttr,
  };
}
