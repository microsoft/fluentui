import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToasterProps, ToasterState } from './Toaster.types';
import { useToaster } from '../../state';
import { Announce } from '../AriaLive';

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

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ...props,
    }),
    announceRef,
    toastsToRender,
    isToastVisible,
    offset,
    announce: announceProp ?? announce,
    renderAriaLive: !announceProp,
  };
};
