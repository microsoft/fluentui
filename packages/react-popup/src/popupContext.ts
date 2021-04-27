import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { PopupState } from './components/Popup/index';

export const PopupContext = createContext<PopupContextValue>({
  open: false,
  setOpen: () => false,
  triggerRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
  contentRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
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

export const usePopupContext = <T>(selector: ContextSelector<PopupContextValue, T>) =>
  useContextSelector(PopupContext, selector);
