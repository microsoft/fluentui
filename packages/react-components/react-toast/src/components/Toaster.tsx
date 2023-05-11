/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { useToaster, getPositionStyles } from '../state';
import { Toast } from './Toast';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    position: 'fixed',
  },
});

export const Toaster: React.FC = () => {
  const { getToastsToRender, isToastVisible } = useToaster();

  const styles = useStyles();

  return (
    <Portal>
      <div>
        {getToastsToRender((position, toasts) => {
          return (
            <div key={position} style={getPositionStyles(position)} className={mergeClasses(styles.container)}>
              {toasts.map(({ content, ...toastProps }) => {
                return (
                  <Toast {...toastProps} key={toastProps.toastId} visible={isToastVisible(toastProps.toastId)}>
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
