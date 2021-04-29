import * as React from 'react';
import { usePopupTrigger } from './usePopupTrigger';
import { PopupTriggerProps } from './PopupTrigger.types';
import { renderPopupTrigger } from './renderPopupTrigger';

/**
 * PopupTrigger component
 */
export const PopupTrigger: React.FC<PopupTriggerProps> = props => {
  const state = usePopupTrigger(props);

  return renderPopupTrigger(state);
};

PopupTrigger.displayName = 'PopupTrigger';
