import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { PopoverState } from './components/Popover/index';

export const PopoverContext: Context<PopoverContextValue> = createContext<PopoverContextValue>({
  open: false,
  setOpen: () => null,
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
export interface PopoverContextValue
  extends Pick<
    PopoverState,
    | 'open'
    | 'setOpen'
    | 'triggerRef'
    | 'contentRef'
    | 'openOnHover'
    | 'openOnContext'
    | 'mountNode'
    | 'noArrow'
    | 'arrowRef'
    | 'size'
    | 'brand'
    | 'inverted'
    | 'trapFocus'
  > {}

export const usePopoverContext = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, selector);
