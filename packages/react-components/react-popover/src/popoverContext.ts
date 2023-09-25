import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { PopoverState } from './components/Popover/index';

export const PopoverContext: Context<PopoverContextValue> = createContext<PopoverContextValue | undefined>(
  undefined,
) as Context<PopoverContextValue>;
const popoverContextDefaultValue: PopoverContextValue = {
  open: false,
  setOpen: () => null,
  toggleOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  arrowRef: { current: null },
  openOnContext: false,
  openOnHover: false,
  size: 'medium' as const,
  trapFocus: false,
  inline: false,
};

export const PopoverProvider = PopoverContext.Provider;

/**
 * Context shared between Popover and its children components
 */
export type PopoverContextValue = Pick<
  PopoverState,
  | 'open'
  | 'toggleOpen'
  | 'setOpen'
  | 'triggerRef'
  | 'contentRef'
  | 'openOnHover'
  | 'openOnContext'
  | 'mountNode'
  | 'withArrow'
  | 'arrowRef'
  | 'size'
  | 'appearance'
  | 'trapFocus'
  | 'inertTrapFocus'
  | 'inline'
>;

export const usePopoverContext_unstable = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, (ctx = popoverContextDefaultValue) => selector(ctx));
