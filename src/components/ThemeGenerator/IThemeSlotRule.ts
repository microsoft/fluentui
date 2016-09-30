import { IColor } from '../../utilities/Color/IColor';
import { Shades } from '../../utilities/Color/Shades';

export interface IThemeSlotRule {
  /* The name of this theme slot. */
  name: string;
  /* The actual color this theme slot is. */
  value?: IColor;
  /* The theme slot this slot is based on. */
  inherits?: IThemeSlotRule;
  /* If set, this slot is the specified shade of the slot it inherits from. */
  asShade?: Shades;
  /* Whether this slot has been manually overridden (else, it was automatically generated based on inheritance). */
  isCustomized?: boolean;
}