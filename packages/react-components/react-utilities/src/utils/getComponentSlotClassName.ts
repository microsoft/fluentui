import type { SlotPropsRecord, ComponentState } from '../compose/types';

/**
 * Generates a complete CSS class name string for a component slot by combining:
 * - The base class name for the slot
 * - Generated modifier classes based on component state (if provided)
 * - Any user-provided class name on the slot
 *
 * This function is useful for slots that need to apply state-based styling modifiers
 * while also preserving user-provided classes for customization.
 *
 * @param baseClassName - The base CSS class name for the slot (e.g., 'fui-Button', 'fui-Button__icon')
 * @param slotProps - The slot props object, which may contain a user-provided className
 * @param componentState - Optional component state object for generating modifier classes.
 *                         Only primitive values (boolean, string, number) are mapped to classes.
 * @returns A space-separated string of CSS class names
 *
 * @example
 * ```ts
 * // Without state
 * getComponentSlotClassName('fui-Button', { className: 'custom-button' })
 * // Returns: 'fui-Button custom-button'
 *
 * // With state
 * getComponentSlotClassName(
 *   'fui-Button',
 *   { className: 'custom-button' },
 *   { appearance: 'primary', disabled: true, size: 'large' }
 * )
 * // Returns: 'fui-Button fui-Button--appearance-primary fui-Button--disabled fui-Button--size-large custom-button'
 * ```
 */
export function getComponentSlotClassName<Slots extends SlotPropsRecord, SlotProps extends { className?: string }>(
  baseClassName: string,
  slotProps: SlotProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentState?: ComponentState<Slots> & Record<string, any>,
): string {
  const classes = [baseClassName];

  // Add state-based modifier classes if state is provided
  if (componentState) {
    classes.push(...mapStateToSlotModifiers(baseClassName, componentState));
  }

  // Add user-provided class name from slot props
  if (slotProps.className) {
    classes.push(slotProps.className);
  }

  return classes.join(' ');
}

/**
 * Maps component state values to BEM-style modifier classes.
 * @internal
 */
function mapStateToSlotModifiers(
  baseClassName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: Record<string, any>,
): string[] {
  const modifiers: string[] = [];

  for (const [stateKey, stateValue] of Object.entries(state)) {
    // Skip non-primitive values (objects, functions)
    if (
      stateValue === null ||
      stateValue === undefined ||
      typeof stateValue === 'object' ||
      typeof stateValue === 'function'
    ) {
      continue;
    }

    // Skip falsy non-null values (false, '', 0)
    if (!stateValue && stateValue !== 0) {
      continue;
    }

    if (typeof stateValue === 'boolean') {
      // Boolean true: baseClassName--key (e.g., 'fui-Button--disabled')
      modifiers.push(`${baseClassName}--${stateKey}`);
    } else {
      // String/Number: baseClassName--key-value (e.g., 'fui-Button--size-large')
      const normalizedValue = stateValue.toString().trim();
      if (normalizedValue) {
        modifiers.push(`${baseClassName}--${stateKey}-${normalizedValue}`);
      }
    }
  }

  return modifiers;
}
