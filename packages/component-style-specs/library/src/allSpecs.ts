import type { ComponentStyleSpec } from '@fluentui/style-spec';
import { BadgeSpec } from './specs/Badge';
import { ButtonSpec } from './specs/Button';
import { DividerSpec } from './specs/Divider';

/**
 * All specs shipped by this package, keyed by component name.
 *
 * @public
 */
export const allSpecs: Record<string, ComponentStyleSpec> = {
  Badge: BadgeSpec,
  Button: ButtonSpec,
  Divider: DividerSpec,
};
