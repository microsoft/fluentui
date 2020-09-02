import * as React from 'react';
import { useControllableValue, useMergedRefs } from '@uifabric/react-hooks';
import { getCode, ArrowDownKey } from '@fluentui/keyboard-key';

export type ExpandedState = {
  ref?: React.Ref<unknown>;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  onMenuDismiss?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean;

  menu: {
    target?: React.Ref<HTMLElement | undefined>;
    onDismiss?: () => void;
  };
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

  // Assign extra props to the menu slot.
  draftState.menu = {
    ...draftState.menu,
    target: rootRef,
    onDismiss: React.useCallback(() => {
      onMenuDismiss?.();

      setExpandedValue(false);

      // TODO: should we re-focus the root?
    }, [onMenuDismiss, setExpandedValue]),
  };

  draftState['aria-expanded'] = expandedValue;
  draftState['aria-haspopup'] = true;
};
