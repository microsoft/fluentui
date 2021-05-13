import * as React from 'react';
import { getCode, ArrowDownKey } from '@fluentui/keyboard-key';
import { MinimalMenuProps } from '@fluentui/react-shared-contexts';
import { useControllableValue, useMergedRefs } from '@fluentui/react-utilities';
import { MenuButtonState } from './MenuButton.types';

export type ExpandedState = {
  menu?: MenuButtonState['menu'];

  defaultExpanded?: boolean;
  expanded?: boolean;
  onClick?: MenuButtonState['onClick'];
  onKeyDown?: MenuButtonState['onKeyDown'];
  onMenuDismiss?: MenuButtonState['onMenuDismiss'];
  ref?: React.Ref<unknown>;

  'aria-expanded'?: MenuButtonState['aria-expanded'];
  'aria-haspopup'?: MenuButtonState['aria-haspopup'];
};

/**
 * @param state - mutable state object to update to add expanded behavior.
 */
export const useExpanded = <TState extends ExpandedState>(state: TState): TState => {
  const { expanded, defaultExpanded, onClick, onMenuDismiss, onKeyDown } = state;
  const [expandedValue, setExpandedValue] = useControllableValue(expanded, defaultExpanded);
  const rootRef = React.useRef<HTMLElement>(null);

  // Set up a ref to be used for the menu target.
  state.ref = useMergedRefs(state.ref, rootRef);

  // Set true value.
  state.expanded = expandedValue;

  // When the root is clicked, toggle menu.
  state.onClick = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
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
  state.onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
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
    async (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
      setExpandedValue(false);
      await rootRef.current?.focus();
      onMenuDismiss?.(ev);
    },
    [onMenuDismiss, setExpandedValue],
  );

  const menuProps: MinimalMenuProps = {
    hidden: !expandedValue,
    onDismiss: onDismiss,
    target: rootRef,
  };

  if (state.menu) {
    if (React.isValidElement(state.menu.children)) {
      state.menu.children = React.cloneElement(state.menu.children, {
        ...menuProps,
      });
    }
    state.menu.hidden = menuProps.hidden;
    state.menu.onDismiss = menuProps.onDismiss;
    state.menu.target = menuProps.target;
  }

  state['aria-expanded'] = expandedValue;
  state['aria-haspopup'] = true;

  return state;
};
