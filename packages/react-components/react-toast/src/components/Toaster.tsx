/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { ToastPosition, useToaster, getPositionStyles } from '../state';
import { Toast } from './Toast';
import { makeStyles, mergeClasses } from '@griffel/react';

interface ToasterProps {
  position: ToastPosition;
  targetDocument: Document | null | undefined;
}

const useStyles = makeStyles({
  container: {
    position: 'fixed',
  },
});

export const Toaster: React.FC<ToasterProps> = props => {
  const { getToastToRender, isToastVisible } = useToaster();

  const styles = useStyles();

  return (
    <Portal>
      <div>
        {getToastToRender((position, toasts) => {
          return (
            <div key={position} style={getPositionStyles(position)} className={mergeClasses(styles.container)}>
              {toasts.map(({ content, ...toastProps }) => {
                return (
                  <Toast
                    {...toastProps}
                    key={`toast-${toastProps.toastId}`}
                    visible={isToastVisible(toastProps.toastId)}
                  >
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
