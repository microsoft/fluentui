import { Shade } from '../../utilities/color/shades';
import type { IColor } from '../../utilities/color/interfaces';

export interface IThemeSlotRule {
  /** The name of this theme slot. */
  name: string;
  /** The actual color this theme slot is if it is a color. */
  color?: IColor;
  /** The value of this slot if it is NOT a color. Must be falsey if not a color. */
  value?: string;
  /** The theme slot this slot is based on. */
  inherits?: IThemeSlotRule;
  /** If set, this slot is the specified shade of the slot it inherits from. */
  asShade?: Shade;
  /**
   * Whether this slot is a background shade, which uses different logic for generating its inheriting-as-shade value.
   */
  isBackgroundShade?: boolean;
  /** Whether this slot has been manually overridden (else, it was automatically generated based on inheritance). */
  isCustomized?: boolean;
  /**
   * A collection of rules that inherit from this one. It is the responsibility of the inheriting rule to add
   * itself to its parent's dependentRules collection.
   */
  dependentRules: IThemeSlotRule[];
}
