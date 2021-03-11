import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs, elementContains } from '@fluentui/react-utilities';
import { MenuTriggerProps, MenuTriggerState } from './MenuTrigger.types';
import { useMenuContext } from '../../menuContext';

export const menuTriggerShorthandProps: (keyof MenuTriggerProps)[] = [];

const mergeProps = makeMergeProps<MenuTriggerState>({ deepMerge: menuTriggerShorthandProps });

/**
 * Create the state required to render MenuTrigger.
 * Clones the only child component and adds necessary event handling behaviours to open a popup menu
 *
 * @param props - props from this instance of MenuTrigger
 * @param ref - reference to root HTMLElement of MenuTrigger
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory MenuTrigger }
 */
export const useMenuTrigger = (
  props: MenuTriggerProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuTriggerProps,
): MenuTriggerState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, menuTriggerShorthandProps),
  );

  return useTriggerElement(state);
};

const useTriggerElement = (state: MenuTriggerState): MenuTriggerState => {
  const triggerRef = useMenuContext(context => context.triggerRef);
  const menuPopupRef = useMenuContext(context => context.menuPopupRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const on = useMenuContext(context => context.on);

  const child = React.Children.only(state.children);

  const triggerProps: Partial<React.HTMLAttributes<HTMLElement>> = {};
  if (on.includes('click')) {
    triggerProps.onClick = (e: React.MouseEvent) => {
      if (!on.includes('context')) {
        setOpen(true);
      }

      child.props?.onClick?.(e);
    };
  }

  if (on.includes('focus')) {
    triggerProps.onFocus = (e: React.FocusEvent) => {
      setOpen(true);
      child.props?.onFocus?.(e);
    };
  }

  if (on.includes('context')) {
    triggerProps.onContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(true);
      child.props?.onContextMenu?.(e);
    };
  }

  if (on.includes('hover')) {
    triggerProps.onMouseEnter = (e: React.MouseEvent) => {
      setOpen(true);
      child.props?.onMouseEnter?.(e);
    };
    triggerProps.onMouseLeave = (e: React.MouseEvent) => {
      setOpen(false);
      child.props?.onMouseLeave?.(e);
    };
    if (!on.includes('context')) {
      triggerProps.onClick = (e: React.MouseEvent) => {
        setOpen(true);
        child.props?.onClick?.(e);
      };
    }

    triggerProps.onBlur = (e: React.FocusEvent) => {
      const isInsidePopupAndTrigger =
        elementContains(triggerRef.current, e.relatedTarget as HTMLElement) ||
        elementContains(menuPopupRef.current, e.relatedTarget as HTMLElement);

      if (!isInsidePopupAndTrigger) {
        setOpen(false);
      }
      child.props?.onBlur?.(e);
    };
  }

  state.children = React.cloneElement(child as React.ReactElement, {
    ...child.props,
    ...triggerProps,
    ref: useMergedRefs(child.props.ref, triggerRef),
  });

  return state;
};
