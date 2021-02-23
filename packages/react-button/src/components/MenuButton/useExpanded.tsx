import * as React from 'react';
import { getCode, ArrowDownKey } from '@fluentui/keyboard-key';
import { useControllableValue, useMergedRefs } from '@fluentui/react-utilities';
import { MenuButtonState } from './MenuButton.types';

export type ExpandedState = {
  ref?: React.Ref<unknown>;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  onMenuDismiss?: (ev?: Event | React.MouseEvent | React.KeyboardEvent) => void;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  'aria-expanded'?: React.HTMLAttributes<HTMLElement>['aria-expanded'];
  'aria-haspopup'?: React.HTMLAttributes<HTMLElement>['aria-haspopup'];

  menu?: MenuButtonState['menu'];
};

/**
 * @param draftState - mutable state object to update to add expanded behavior.
 */
export const useExpanded = <TDraftState extends ExpandedState>(draftState: TDraftState) => {
  const { expanded, defaultExpanded, onClick, onMenuDismiss, onKeyDown } = draftState;
  const [expandedValue, setExpandedValue] = useControllableValue(expanded, defaultExpanded);
  const rootRef = React.useRef<HTMLElement | undefined>(null);

  // Set up a ref to be used for the menu target.
  draftState.ref = useMergedRefs(draftState.ref, rootRef);

  // Set true value.
  draftState.expanded = expandedValue;

  // When the root is clicked, toggle menu.
  draftState.onClick = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      setExpandedValue(!expandedValue);
    },
    [onClick, expandedValue, setExpandedValue],
  );

  // When alt/meta down arrow is pressed, expand.
  draftState.onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent) => {
      if (onKeyDown) {
        onKeyDown(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      if ((ev.altKey || ev.metaKey) && getCode(ev) === ArrowDownKey) {
        setExpandedValue(true);
        ev.stopPropagation();
        ev.preventDefault();
      }
    },
    [onKeyDown, setExpandedValue],
  );

  const onDismiss = React.useCallback(
    async (ev?: Event | React.MouseEvent | React.KeyboardEvent) => {
      setExpandedValue(false);
      await rootRef.current?.focus();
      onMenuDismiss?.(ev);
    },
    [onMenuDismiss, setExpandedValue],
  );

  const menuProps = {
    hidden: !expandedValue,
    onDismiss: onDismiss,
    target: rootRef,
  };

  if (draftState.menu) {
    if (React.isValidElement(draftState.menu.children)) {
      draftState.menu.children = React.cloneElement(draftState.menu.children, {
        ...menuProps,
      });
    }
    draftState.menu.hidden = menuProps.hidden;
    draftState.menu.onDismiss = menuProps.onDismiss;
    draftState.menu.target = menuProps.target;
  }

  draftState['aria-expanded'] = expandedValue;
  draftState['aria-haspopup'] = true;
};
