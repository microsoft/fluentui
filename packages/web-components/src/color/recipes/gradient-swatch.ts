import { ColorRGBA64, rgbToRelativeLuminance } from '@microsoft/fast-colors';
import { SwatchRGB } from '../swatch';
import { contrast } from '../utilities/relative-luminance';

/**
 * An implementation of {@link Swatch} that produces a gradient.
 * This assumes a subtle gradient such that `relativeLuminance` is still meaningful,
 * either with consistent luminance across the steps or a small edge of larger change.
 * @internal
 */
export class GradientSwatchRGB implements SwatchRGB {
  private color: ColorRGBA64;
  private cssGradient: string;

  readonly relativeLuminance: number;
  readonly r: number;
  readonly g: number;
  readonly b: number;

  /**
   *
   * @param red Red channel expressed as a number between 0 and 1
   * @param green Green channel expressed as a number between 0 and 1
   * @param blue Blue channel expressed as a number between 0 and 1
   */
  constructor(red: number, green: number, blue: number, cssGradient: string) {
    this.color = new ColorRGBA64(red, green, blue);
    this.cssGradient = cssGradient;
    this.relativeLuminance = rgbToRelativeLuminance(this.color);
    this.r = red;
    this.g = green;
    this.b = blue;
  }

  public toColorString = () => this.cssGradient;
  public contrast = contrast.bind(null, this);
  public createCSS = this.toColorString;

  /**
   * Creates a GradientSwatch from a base color and gradient definition
   * @param obj The base color object, used for relative luminance
   * @param cssGradient The actual gradient to be rendered
   * @returns New GradientSwatch object
   */
  static fromObject(obj: { r: number; g: number; b: number }, cssGradient: string) {
    return new GradientSwatchRGB(obj.r, obj.g, obj.b, cssGradient);
  }
}
