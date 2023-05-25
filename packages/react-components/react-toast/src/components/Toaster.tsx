/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { useToaster, getPositionStyles, ToasterOptions } from '../state';
import { Toast } from './Toast';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    width: '292px',
  },
});

export type ToasterProps = Partial<ToasterOptions>;

export const Toaster: React.FC<ToasterProps> = props => {
  const { offset } = props;
  const { getToastsToRender, isToastVisible, toasterRef } = useToaster<HTMLDivElement>(props);

  const styles = useStyles();

  return (
    <Portal>
      <div ref={toasterRef}>
        {getToastsToRender((position, toasts) => {
          return (
            <div key={position} style={getPositionStyles(position, offset)} className={mergeClasses(styles.container)}>
              {toasts.map(toastProps => {
                return (
                  <Toast {...toastProps} key={toastProps.toastId} visible={isToastVisible(toastProps.toastId)}>
                    {toastProps.content as React.ReactNode}
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
