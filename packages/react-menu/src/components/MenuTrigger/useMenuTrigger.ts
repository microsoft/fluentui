import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { MenuTriggerProps, MenuTriggerState } from './MenuTrigger.types';
import { useTriggerElement } from './useTriggerElement';

export const menuTriggerShorthandPropsCompat: (keyof MenuTriggerProps)[] = [];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuTriggerState>({ deepMerge: menuTriggerShorthandPropsCompat });

/**
 * Create the state required to render MenuTrigger.
 * Clones the only child component and adds necessary event handling behaviours to open a popup menu
 *
 * @param props - props from this instance of MenuTrigger
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory MenuTrigger }
 */
export const useMenuTrigger = (props: MenuTriggerProps, defaultProps?: MenuTriggerProps): MenuTriggerState => {
  const state = mergeProps({}, defaultProps, resolveShorthandProps(props, menuTriggerShorthandPropsCompat));

  return useTriggerElement(state);
};
