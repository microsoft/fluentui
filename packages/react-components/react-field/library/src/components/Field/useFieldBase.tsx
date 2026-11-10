import type * as React from 'react';

import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import type { FieldBaseProps, FieldBaseState } from './Field.types';

/**
 * Base hook for Field component, which manages state related to validation, ARIA attributes,
 * ID generation, and slot structure without design props.
 *
 * @param props - Props passed to this field
 * @param ref - Ref to the root
 */
export const useFieldBase_unstable = (props: FieldBaseProps, ref: React.Ref<HTMLDivElement>): FieldBaseState => {
  const { children, required = false, validationState = props.validationMessage ? 'error' : 'none' } = props;

  const baseId = useId('field-');
  const generatedControlId = baseId + '__control';

  const root = slot.always(getIntrinsicElementProps('div', { ...props, ref }, /*excludedPropNames:*/ ['children']), {
    elementType: 'div',
  });
  const label = slot.optional(props.label, {
    defaultProps: { htmlFor: generatedControlId, id: baseId + '__label', required },
    elementType: 'label',
  });
  const validationMessage = slot.optional(props.validationMessage, {
    defaultProps: {
      id: baseId + '__validationMessage',
      role: validationState === 'error' || validationState === 'warning' ? 'alert' : undefined,
    },
    elementType: 'div',
  });
  const hint = slot.optional(props.hint, { defaultProps: { id: baseId + '__hint' }, elementType: 'div' });
  const validationMessageIcon = slot.optional(props.validationMessageIcon, {
    renderByDefault: false,
    elementType: 'span',
  });

  return {
    children,
    generatedControlId,
    required,
    validationState,
    components: { root: 'div', label: 'label', validationMessage: 'div', validationMessageIcon: 'span', hint: 'div' },
    root,
    label,
    validationMessageIcon,
    validationMessage,
    hint,
  };
};
