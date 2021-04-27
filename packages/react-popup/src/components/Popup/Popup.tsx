import * as React from 'react';
import { usePopup } from './usePopup';
import { PopupProps } from './Popup.types';
import { renderPopup } from './renderPopup';

/**
 * Popup component
 */
export const Popup: React.FC<PopupProps> = props => {
  const state = usePopup(props);

  return renderPopup(state);
};

Popup.displayName = 'Popup';
