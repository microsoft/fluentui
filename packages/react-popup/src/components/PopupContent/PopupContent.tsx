import * as React from 'react';
import { usePopupContent } from './usePopupContent';
import { PopupContentProps } from './PopupContent.types';
import { renderPopupContent } from './renderPopupContent';
import { usePopupContentStyles } from './usePopupContentStyles';

/**
 * PopupContent component
 */
export const PopupContent = React.forwardRef<HTMLElement, PopupContentProps>((props, ref) => {
  const state = usePopupContent(props, ref);

  usePopupContentStyles(state);
  return renderPopupContent(state);
});

PopupContent.displayName = 'PopupContent';
