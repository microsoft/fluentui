import { createContext, useContextSelector, ContextSelector, Context } from '@fluentui/react-context-selector';
import { PopoverState } from './components/Popover/index';

export const PopoverContext: Context<PopoverContextValue> = createContext<PopoverContextValue>({
  open: false,
  setOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  target: undefined,
  openOnContext: false,
  openOnHover: false,
});

/**
 * Context shared between Popover and its children components
 */
export interface PopoverContextValue
  extends Pick<
    PopoverState,
    'open' | 'setOpen' | 'triggerRef' | 'contentRef' | 'target' | 'openOnHover' | 'openOnContext' | 'mountNode'
  > {}

export const usePopoverContext = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, selector);
