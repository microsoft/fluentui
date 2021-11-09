import * as React from 'react';
import { useARIAButton } from '@fluentui/react-aria';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState } from './Button.types';

/**
 * Modifies state to include aria props and keyboard navigation handlers.
 * @param state - Computed state for Button.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButtonARIA = (
  state: ButtonState,
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  const ariaProps = getNativeElementProps(
    props.as || 'button',
    useARIAButton(props, {
      required: true,
      defaultProps: {
        // useARIAButton isn't working with React.Ref<HTMLButtonElement | HTMLAnchorElement>
        ref: ref as React.Ref<HTMLButtonElement>,
        type: 'button', // This is added because the default for type is 'submit'
      },
    }),
  );

  state.root = { ...state.root, ...ariaProps };
};
