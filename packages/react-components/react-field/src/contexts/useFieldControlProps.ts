import type { FieldContextValue, FieldControlProps } from '../Field';
import { useFieldContext_unstable } from './FieldContext';

/**
 * Options for `useFieldControlProps_unstable`.
 */
export type FieldControlPropsOptions = {
  /**
   * Skips setting `aria-labelledby` on the control if the `label.htmlFor` refers to the control.
   *
   * This should be used with controls that can be the target of a label's `for` prop:
   * `<button>`, `<input>`, `<progress>`, `<select>`, `<textarea>`.
   */
  supportsLabelFor?: boolean;

  /**
   * Sets `required` instead of `aria-required` when the Field is marked required.
   *
   * This should be used with controls that support the `required` prop:
   * `<input>` (except `range` or `color`), `<select>`, `<textarea>`.
   */
  supportsRequired?: boolean;

  /**
   * Sets the size prop on the control to match the Field's size: `'small' | 'medium' | 'large'`.
   *
   * This should be used with controls that have a custom size prop that matches the Field's size prop.
   */
  supportsSize?: boolean;
};

/**
 * Gets the control props from the field context, if this inside a `<Field>`.
 *
 * When called with no arguments, returns the FieldControlProps that should be applied to the control.
 *
 * @returns A FieldControlProps object if inside a `<Field>`, otherwise undefined.
 */
export function useFieldControlProps_unstable(): FieldControlProps | undefined;

/**
 * Copies and merges the FieldControlProps with the given props, if this inside a `<Field>`.
 *
 * @param props - The existing props for the control. These will be merged with the control props from the field context.
 * @param options - Option to include the size prop.
 * @returns Merged props if inside a `<Field>`, otherwise the original props, or undefined if no props given.
 */
export function useFieldControlProps_unstable<Props extends FieldControlProps>(
  props: Props,
  options?: FieldControlPropsOptions,
): Props;
export function useFieldControlProps_unstable<Props extends FieldControlProps>(
  props?: Props,
  options?: FieldControlPropsOptions,
): Props | undefined {
  return getFieldControlProps(useFieldContext_unstable(), props, options);
}

/**
 * @internal
 * Implementation of useFieldControlProps_unstable.
 * Split out so it can be used directly in renderField_unstable.
 */
export function getFieldControlProps<Props extends FieldControlProps>(
  context: FieldContextValue | undefined,
  props?: Props,
  options?: FieldControlPropsOptions,
): Props | undefined {
  if (!context) {
    return props;
  }

  // Create a copy of props so we don't modify the original
  props = { ...props } as Props;

  const { generatedControlId, hintId, labelFor, labelId, required, validationMessageId, validationState } = context;

  if (generatedControlId) {
    props.id ??= generatedControlId;
  }

  // Set aria-labelledby if the control doesn't support label.htmlFor, or if the label's htmlFor doesn't refer
  // to this control (i.e. the user set this control's id prop without also setting the Field's label.htmlFor).
  if (labelId && (!options?.supportsLabelFor || labelFor !== props.id)) {
    props['aria-labelledby'] ??= labelId;
  }

  // The control is described by the validation message, or hint, or both.
  // We also preserve and append any aria-describedby from props.
  // For reference: https://github.com/microsoft/fluentui/pull/25580#discussion_r1017259933
  if (validationMessageId || hintId) {
    // NOTE: Not using ??= since we're merging and overriding the user-provided value.
    props['aria-describedby'] = [validationMessageId, hintId, props?.['aria-describedby']].filter(Boolean).join(' ');
  }

  if (validationState === 'error') {
    props['aria-invalid'] ??= true;
  }

  if (required) {
    if (options?.supportsRequired) {
      (props as { required?: boolean }).required ??= true;
    } else {
      props['aria-required'] ??= true;
    }
  }

  // Include the size prop if this control supports it
  if (options?.supportsSize) {
    (props as { size?: FieldContextValue['size'] }).size ??= context.size;
  }

  return props;
}
