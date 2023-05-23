import { SlotComponent, SlotShorthandValue, slotFromShorthand } from '@fluentui/react-utilities';
import { useARIAButtonProps } from './useARIAButtonProps';
import type { ARIAButtonProps, ARIAButtonSlotProps, ARIAButtonType } from './types';
import { SlotOptions } from '@fluentui/react-utilities/src/compose/slot';

/**
 * @internal
 *
 * This function expects to receive a slot, if `as` property is not desired use `useARIAButtonProps` instead
 *
 * Button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required.
 */
export function useARIAButtonShorthand<Props extends ARIAButtonSlotProps>(
  value: Props | SlotShorthandValue | SlotComponent<Props> | undefined,
  options: { required: true } & SlotOptions<Props>,
): SlotComponent<Props>;
export function useARIAButtonShorthand<Props extends ARIAButtonSlotProps>(
  value: Props | SlotShorthandValue | SlotComponent<Props> | undefined | null,
  options?: { required?: boolean } & SlotOptions<Props>,
): SlotComponent<Props> | undefined;
export function useARIAButtonShorthand<Props extends ARIAButtonSlotProps>(
  value: Props | SlotShorthandValue | SlotComponent<Props> | undefined | null,
  options: { required?: boolean } & SlotOptions<Props> = {},
): SlotComponent<Props> | undefined {
  const shorthand = slotFromShorthand(value, options);
  const shorthandARIAButton = useARIAButtonProps<ARIAButtonType, ARIAButtonProps>(shorthand?.as ?? 'button', shorthand);
  return shorthand && (shorthandARIAButton as SlotComponent<Props>);
}
