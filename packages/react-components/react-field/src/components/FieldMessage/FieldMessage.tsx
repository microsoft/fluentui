import * as React from 'react';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldMessageProps } from './FieldMessage.types';
import { renderFieldMessage_unstable } from './renderFieldMessage';
import { useFieldMessage_unstable } from './useFieldMessage';
import { useFieldMessageStyles_unstable } from './useFieldMessageStyles';

/**
 * FieldMessage is used for the validationMessage or hint of a Field.
 */
export const FieldMessage: ForwardRefComponent<FieldMessageProps> = React.forwardRef((props, ref) => {
  const state = useFieldMessage_unstable(props, ref);

  useFieldMessageStyles_unstable(state);
  return renderFieldMessage_unstable(state);
});

FieldMessage.displayName = 'FieldMessage';
