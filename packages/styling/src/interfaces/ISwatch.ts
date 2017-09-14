/**
 * Experimental interface:
 *
 * A swatch is a single color code, which pulls from the colors in the theme. A swatch
 * set (ISwatchSet) is a collection of semantic swatches which work in harmony together.
 *
 * @export
 * @interface ISwatch
 */
export interface ISwatch {
  palleteKey: string;

  /* If defined, can validate that the resulting color is contrasting enough. */
  backgroundSwatch: string;
}
