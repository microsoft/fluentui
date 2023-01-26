import * as React from 'react';

import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { FieldMessageProps, FieldMessageState } from './FieldMessage.types';

const validationMessageIcons = {
  error: <ErrorCircle12Filled />,
  warning: <Warning12Filled />,
  success: <CheckmarkCircle12Filled />,
  neutral: undefined,
} as const;

/**
 * Create the state required to render FieldMessage.
 *
 * The returned state can be modified with hooks such as useFieldMessageStyles_unstable,
 * before being passed to renderFieldMessage_unstable.
 *
 * @param props - props from this instance of FieldMessage
 * @param ref - reference to root HTMLElement of FieldMessage
 */
export const useFieldMessage_unstable = (props: FieldMessageProps, ref: React.Ref<HTMLElement>): FieldMessageState => {
  const { validationState = 'neutral' } = props;

  return {
    validationState,
    components: {
      root: 'div',
      icon: 'span',
    },
    root: getNativeElementProps('div', {
      role: validationState === 'error' ? 'alert' : undefined,
      ref,
      ...props,
    }),
    icon: resolveShorthand(props.icon, {
      required: !!validationMessageIcons[validationState],
      defaultProps: {
        children: validationMessageIcons[validationState],
      },
    }),
  };
};
