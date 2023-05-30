/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { useToaster, getPositionStyles, ToasterOptions } from '../state';
import { Toast } from './Toast';
import { mergeClasses } from '@griffel/react';
import { AriaLive, Announce } from '../AriaLive';

import { useToasterStyles } from './Toaster.styles';

export type ToasterProps = Partial<ToasterOptions>;

export const Toaster: React.FC<ToasterProps> = props => {
  const { offset } = props;
  const { getToastsToRender, isToastVisible } = useToaster<HTMLDivElement>(props);
  const announceRef = React.useRef<Announce>(() => null);

  const announce = React.useCallback<Announce>((message, options) => {
    announceRef.current(message, options);
  }, []);

  const styles = useToasterStyles();

  const toastsToRender = getToastsToRender((position, toasts) => {
    return (
      <div key={position} style={getPositionStyles(position, offset)} className={mergeClasses(styles.container)}>
        {toasts.map(toastProps => {
          return (
            <Toast
              {...toastProps}
              announce={announce}
              key={toastProps.toastId}
              visible={isToastVisible(toastProps.toastId)}
            >
              {toastProps.content as React.ReactNode}
            </Toast>
          );
        })}
      </div>
    );
  });

  return (
    <>
      <AriaLive announceRef={announceRef} />
      {toastsToRender.length ? (
        <Portal>
          <div>{toastsToRender}</div>
        </Portal>
      ) : null}
    </>
  );
};
