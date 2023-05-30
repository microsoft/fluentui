import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToasterProps, ToasterState } from './Toaster.types';
import { ToastPosition, useToaster } from '../../state';
import { Announce } from '../AriaLive';
import { toastPositions } from './constants';

/**
 * Create the state required to render Toaster.
 *
 * @param props - props from this instance of Toaster
 */
export const useToaster_unstable = (props: ToasterProps): ToasterState => {
  const { offset, announce: announceProp, ...rest } = props;
  const announceRef = React.useRef<Announce>(() => null);
  const { toastsToRender, isToastVisible } = useToaster<HTMLDivElement>(rest);
  const announce = React.useCallback<Announce>((message, options) => announceRef.current(message, options), []);

  const positionSlots = Object.fromEntries(
    toastPositions.map(position => {
      return [position, getNativeElementProps('div', { ...rest, 'data-toaster-position': position })];
    }),
  ) as Record<ToastPosition, React.HTMLAttributes<HTMLDivElement>>;

  return {
    components: {
      root: 'div',
      'bottom-left': 'div',
      'bottom-right': 'div',
      'top-left': 'div',
      'top-right': 'div',
    },
    ...positionSlots,
    root: getNativeElementProps('div', {
      ...props,
    }),
    ...positionSlots,
    announceRef,
    toastsToRender,
    isToastVisible,
    offset,
    announce: announceProp ?? announce,
    renderAriaLive: !announceProp,
  };
};
