import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { PopoverState } from './components/Popover/index';

// eslint-disable-next-line @fluentui/no-context-default-value
export const PopoverContext: Context<PopoverContextValue> = createContext<PopoverContextValue>({
  open: false,
  setOpen: () => null,
  toggleOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  arrowRef: { current: null },
  openOnContext: false,
  openOnHover: false,
  size: 'medium',
  trapFocus: false,
  inline: false,
});

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
  | 'legacyTrapFocus'
  | 'inline'
>;

export const usePopoverContext_unstable = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, selector);
