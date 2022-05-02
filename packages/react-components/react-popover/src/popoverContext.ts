import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { PopoverState } from './components/Popover/index';

export const PopoverContext: Context<PopoverContextValue> = createContext<PopoverContextValue>({
  setOpen: () => null,
  toggleOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  arrowRef: { current: null },
  openOnContext: false,
  openOnHover: false,
  size: 'medium',
  trapFocus: false,
});

/**
 * Context shared between Popover and its children components
 */
export type PopoverContextValue = Pick<
  PopoverState,
  | 'toggleOpen'
  | 'setOpen'
  | 'triggerRef'
  | 'contentRef'
  | 'openOnHover'
  | 'openOnContext'
  | 'mountNode'
  | 'noArrow'
  | 'arrowRef'
  | 'size'
  | 'appearance'
  | 'trapFocus'
>;

export const usePopoverContext_unstable = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, selector);
