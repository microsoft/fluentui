import { IRawStyle } from '@uifabric/merge-styles';

/**
 * @internal
 * Experimental interface for decorative styling in a theme.
 */
export interface IEffects {
  elevation4: IRawStyle;
  elevation8: IRawStyle;
  elevation16: IRawStyle;
  elevation64: IRawStyle;

  roundedCorner2: number;
}

/** Todo list
 * 3) document each prop
 * 4) add equivalents to SASS exports
 */
