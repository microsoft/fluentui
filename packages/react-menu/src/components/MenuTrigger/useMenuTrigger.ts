import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuTriggerProps, MenuTriggerState } from './MenuTrigger.types';
import { useMenuContext, MenuContextValue } from '../../menuContext';

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
  const setOpen = useMenuContext(context => context.setOpen);
  const triggerRef = useMenuContext(context => context.triggerRef);

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, menuTriggerShorthandProps),
  );

  state.setOpen = setOpen;

  const child = React.Children.only(state.children);
  state.children = React.cloneElement(child as React.ReactElement, {
    ...getTriggerProps(state.setOpen, child.props),
    ref: useMergedRefs(child.props.ref, triggerRef),
  });

  return state;
};

// TODO this is quick 'n dirty, follow up and improve interactions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTriggerProps = (setOpen: MenuContextValue['setOpen'], props: any) => {
  const triggerProps: React.HTMLAttributes<HTMLElement> = {};
  triggerProps.onClick = e => {
    setOpen(s => !s);
    props.onClick?.(e);
  };

  return triggerProps;
};
