import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { PopupState } from './components/Popup/index';

export const PopupContext = createContext<PopupContextValue>({
  open: false,
  setOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  target: undefined,
  openOnContext: false,
  openOnHover: false,
});

/**
 * Context shared between Popup and its children components
 */
export interface PopupContextValue
  extends Pick<
    PopupState,
    'open' | 'setOpen' | 'triggerRef' | 'contentRef' | 'target' | 'openOnHover' | 'openOnContext' | 'mountNode'
  > {}

export const usePopupContext = <T>(selector: ContextSelector<PopupContextValue, T>): T =>
  useContextSelector(PopupContext, selector);
