import { IRawStyle } from '@uifabric/merge-styles';

/**
 * @internal
 * Experimental interface for decorative styling in a theme.
 */
export interface ISerifs {
  depth4: IRawStyle;
  depth8: IRawStyle;
  depth16: IRawStyle;
  depth64: IRawStyle;

  roundedCorner2: number;
  roundedCorner4: number;
}

/** Todo list
 * 1) finalize names
 * 2) finalize steps
 * 3) document each prop
 * 4) add equivalents to SASS exports
 */
