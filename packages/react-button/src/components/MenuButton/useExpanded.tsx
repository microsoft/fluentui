import * as React from 'react';
import { getCode, ArrowDownKey } from '@fluentui/keyboard-key';
import { useControllableValue, useMergedRefs } from '@fluentui/react-hooks';
import { MenuButtonState } from './MenuButton.types';

export type ExpandedState = {
  ref?: React.Ref<unknown>;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  onMenuDismiss?: () => void;
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
  const rootRef = React.useRef<HTMLElement | undefined>();

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

  const onDismiss = React.useCallback(() => {
    onMenuDismiss?.();

    setExpandedValue(false);

    // TODO: should we re-focus the root?
  }, [onMenuDismiss, setExpandedValue]);

  if (draftState.menu) {
    draftState.menu.hidden = !expandedValue;
    draftState.menu.onDismiss = onDismiss;
    draftState.menu.target = rootRef;
  }

  draftState['aria-expanded'] = expandedValue;
  draftState['aria-haspopup'] = true;
};
