import { useImperativeHandle, useRef } from 'react';
import { IButtonComponent, IButtonViewProps } from './Button.types';

export const useButtonState: IButtonComponent['state'] = props => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(props.componentRef, () => ({
    focus: () => {
      buttonRef.current && buttonRef.current.focus();
    }
  }));

  const viewProps: IButtonViewProps = {
    ...props,
    buttonRef
  };

  return viewProps;
};
