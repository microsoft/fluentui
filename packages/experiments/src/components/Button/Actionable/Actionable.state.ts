import { useImperativeHandle, useRef } from 'react';
import { IActionableComponent, IActionableViewProps } from './Actionable.types';

/* eslint-disable deprecation/deprecation */

/** @deprecated */
export const useActionableState: IActionableComponent['state'] = props => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(props.componentRef, () => ({
    focus: () => {
      buttonRef.current && buttonRef.current.focus();
    },
  }));

  const viewProps: IActionableViewProps = {
    ...props,
    buttonRef,
  };

  return viewProps;
};
