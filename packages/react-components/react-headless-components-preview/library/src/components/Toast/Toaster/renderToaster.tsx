/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToasterState } from './Toaster.types';
import { ToastContainer } from '../ToastContainer';

export const renderToaster = (state: ToasterState): JSXElement => {
  const { toastsToRender, isToastVisible, tryRestoreFocus, getStackTransform } = state;

  return (
    <>
      {Array.from(toastsToRender.entries()).flatMap(([position, toasts]) =>
        toasts.map((toast, index) => {
          const stackIndex = position.startsWith('bottom') ? toasts.length - 1 - index : index;

          return (
            <ToastContainer
              key={toast.toastId}
              {...toast}
              visible={isToastVisible(toast.toastId)}
              tryRestoreFocus={tryRestoreFocus}
              style={{
                transform: getStackTransform(position, stackIndex),
                zIndex: stackIndex + 1,
              }}
            >
              {toast.content as React.ReactNode}
            </ToastContainer>
          );
        }),
      )}
    </>
  );
};
