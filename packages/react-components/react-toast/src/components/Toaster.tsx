/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { ToastContainerProps, ToastPosition, useToaster } from '../state';
import { Toast } from './Toast';
import { makeStyles, mergeClasses } from '@griffel/react';

interface ToasterProps extends Pick<ToastContainerProps, 'offset'> {
  position: ToastPosition;
  targetDocument: Document | null | undefined;
  limit?: number;
}

const useStyles = makeStyles({
  container: {
    position: 'fixed',
  },
});

export const Toaster: React.FC<ToasterProps> = props => {
  const { targetDocument, limit, offset } = props;
  const { containerRef, getToastToRender, isToastActive, getPositionStyles } = useToaster({
    targetDocument,
    limit,
    offset,
    autoClose: 3000,
  });

  const styles = useStyles();

  return (
    <Portal>
      <div ref={containerRef}>
        {getToastToRender((position, toasts) => {
          return (
            <div key={position} style={getPositionStyles(position)} className={mergeClasses(styles.container)}>
              {toasts.map(({ content, props: toastProps }, i) => {
                return (
                  <Toast {...toastProps} key={`toast-${toastProps.key}`} isIn={isToastActive(toastProps.toastId)}>
                    {content as React.ReactNode}
                  </Toast>
                );
              })}
            </div>
          );
        })}
      </div>
    </Portal>
  );
};
