import { ARIAButtonComponent } from './types';

/**
 * @internal
 * Checks if an unknown value is a ARIAButtonComponent
 * @param value - an unknown value
 */
export function isARIAButtonComponent(value: unknown): value is ARIAButtonComponent {
  return Boolean(value && (value as ARIAButtonComponent).isARIAButtonComponent);
}
