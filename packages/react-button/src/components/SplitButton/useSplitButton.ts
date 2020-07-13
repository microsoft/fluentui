import * as React from 'react';
import { getCode, ArrowDownKey } from '@fluentui/keyboard-key';
import { mergeSlotProp, ComposePreparedOptions } from '@fluentui/react-compose';
import { useControllableValue, useMergedRefs } from '@uifabric/react-hooks';
import { DirectionalHint, IContextualMenuProps } from 'office-ui-fabric-react';
import { useButton } from '../Button/useButton';
import { SplitButtonProps, SplitButtonState } from './SplitButton.types';

/**
 * The useSplitButton hook processes the SplitButton component props and returns state.
 * @param props - SplitButton props to derive state from.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  options: ComposePreparedOptions,
): SplitButtonState => {
  const {
    defaultExpanded = false,
    expanded: controlledExpanded,
    menu,
    menuIcon,
    onClick,
    onKeyDown,
    onMenuDismiss,
    ...rest
  } = props;
  const [expanded, setExpanded] = useControllableValue(controlledExpanded, defaultExpanded);
  const buttonRef = React.useRef(null);

  const _onClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(ev);

      if (ev.defaultPrevented) {
        return;
      }
    }

    setExpanded(!expanded);
  };

  const onDismiss = () => {
    if (onMenuDismiss) {
      onMenuDismiss();
    }

    setExpanded(false);
  };

  const _onKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    if (onKeyDown) {
      onKeyDown(ev);

      if (ev.defaultPrevented) {
        return;
      }
    }

    if ((ev.altKey || ev.metaKey) && getCode(ev) === ArrowDownKey) {
      setExpanded(true);
    }
  };

  const state = {
    ...rest,
    'aria-expanded': expanded,
    expanded,
    onClick: _onClick,
    onKeyDown: _onKeyDown,
    ref: useMergedRefs(ref, buttonRef),

    // Menu slot props.
    menu: mergeSlotProp<Partial<IContextualMenuProps>>(menu, {
      directionalHint: DirectionalHint.bottomRightEdge,
      onDismiss,
      target: buttonRef && buttonRef.current,
    }),
  };

  return useButton(state, ref, options);
};
