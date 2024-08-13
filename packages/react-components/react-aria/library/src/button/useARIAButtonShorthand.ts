import { resolveShorthand } from '@fluentui/react-utilities';
import { useARIAButtonProps } from './useARIAButtonProps';
import type { ResolveShorthandFunction } from '@fluentui/react-utilities';
import type { ARIAButtonProps, ARIAButtonSlotProps, ARIAButtonType } from './types';

/**
 * @internal
 *
 * @deprecated use useARIAButtonProps instead
 *
 * This function expects to receive a slot, if `as` property is not desired use `useARIAButtonProps` instead
 *
 * Button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required.
 */
// eslint-disable-next-line deprecation/deprecation
export const useARIAButtonShorthand: ResolveShorthandFunction<ARIAButtonSlotProps> = (value, options) => {
  // eslint-disable-next-line deprecation/deprecation
  const shorthand = resolveShorthand(value, options);
  const shorthandARIAButton = useARIAButtonProps<ARIAButtonType, ARIAButtonProps>(shorthand?.as ?? 'button', shorthand);
  return shorthand && shorthandARIAButton;
};
