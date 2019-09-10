import { useImperativeHandle, useRef } from 'react';
import { IActionableComponent } from './Actionable.types';

export const useActionableState: IActionableComponent['state'] = props => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(props.componentRef, () => ({
    focus: () => {
      buttonRef.current && buttonRef.current.focus();
    }
  }));

  const viewProps = {
    ...props,
    buttonRef
  };

  return viewProps;
};
