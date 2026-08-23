'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderField, useField, useFieldContextValues } from '@fluentui/react-headless-components-preview/field';
import { CheckmarkCircle12Filled } from '@fluentui/react-icons/headless/svg/checkmark-circle';
import { DiamondDismiss12Filled } from '@fluentui/react-icons/headless/svg/diamond-dismiss';
import { Warning12Filled } from '@fluentui/react-icons/headless/svg/warning';

import { Label } from '../Label';
import type { FieldProps, FieldState } from './Field.types';
import { useFieldStyles } from './useFieldStyles';

const validationMessageIcons = {
  error: <DiamondDismiss12Filled />,
  warning: <Warning12Filled />,
  success: <CheckmarkCircle12Filled />,
  none: undefined,
} as const;

/**
 * A Field labels a form control and reports its validation state. Windmod Field: the headless
 * field decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Field: ForwardRefComponent<FieldProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-field's styled useField.
  const { orientation = 'vertical', size = 'medium', ...rest } = props;

  const base = useField(rest, ref);
  const defaultIcon = validationMessageIcons[base.validationState];

  // The headless label slot is a bare <label> carrying `required`, which is not a valid attribute
  // there; the Fluent label — asterisk, typography, disabled colour — lives in the styled layer
  // windmod replaces, so the slot renders windmod's own Label and receives the Field's size.
  const state: FieldState = {
    ...base,
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
    components: { ...base.components, label: Label },
    label: slot.optional(props.label, { defaultProps: { size, ...base.label }, elementType: Label }),
    orientation,
    size,
  };

  // The headless slot exists only when the consumer supplies a value, so it must be materialised
  // here for the glyph default below to have anywhere to land. Materialising it unconditionally
  // would stamp the icon gutter on every validation state, including the ones with no glyph of
  // their own; gating on defaultIcon keeps a glyph-less state free of both the icon and its gutter.
  // `null` still removes the slot.
  const validationMessageIcon: FieldState['validationMessageIcon'] =
    state.validationMessageIcon ??
    (defaultIcon && props.validationMessageIcon === undefined
      ? slot.optional<React.ComponentProps<'span'>>({}, { elementType: 'span' })
      : undefined);

  // The headless surface ships no glyph of its own; windmod restores the Fluent default in a new
  // state object, never on the one the hook returned. Consumer children always win.
  const styled = useFieldStyles(
    validationMessageIcon
      ? {
          ...state,
          validationMessageIcon: {
            ...validationMessageIcon,
            children: validationMessageIcon.children ?? defaultIcon,
          },
        }
      : state,
  );

  // The context needs the two look props the headless state omits; it reads them off `state`,
  // which already carries the resolved orientation and size, so a control sees what the Griffel
  // Field publishes.
  return renderField(styled, useFieldContextValues(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<FieldProps>;

Field.displayName = 'Field';
