import {
  clamp,
  ColorHSL,
  ColorLAB,
  ColorRGBA64,
  hslToRGB,
  interpolateRGB,
  labToRGB,
  rgbToHSL,
  rgbToLAB,
  roundToPrecisionSmall,
} from '@microsoft/fast-colors';
import { isSwatchRGB, Swatch, SwatchRGB } from './swatch';
import { binarySearch } from './utilities/binary-search';
import { directionByIsDark } from './utilities/direction-by-is-dark';
import { contrast, RelativeLuminance } from './utilities/relative-luminance';

/**
 * A collection of {@link Swatch} instances
 * @public
 */
export interface Palette<T extends Swatch = Swatch> {
  readonly source: T;
  readonly swatches: ReadonlyArray<T>;

  /**
   * Returns a swatch from the palette that most closely matches
   * the contrast ratio provided to a provided reference.
   */
  colorContrast(reference: Swatch, contrast: number, initialIndex?: number, direction?: 1 | -1): T;

  /**
   * Returns the index of the palette that most closely matches
   * the relativeLuminance of the provided swatch
   */
  closestIndexOf(reference: RelativeLuminance): number;

  /**
   * Gets a swatch by index. Index is clamped to the limits
   * of the palette so a Swatch will always be returned.
   */
  get(index: number): T;
}

/**
 * Options to tailor the generation of the color palette.
 * @public
 */
export interface PaletteRGBOptions {
  /**
   * The minimum amount of contrast between steps in the palette. Default 1.03.
   * Recommended increments by hundredths.
   */
  stepContrast: number;

  /**
   * Multiplier for increasing step contrast as the swatches darken. Default 0.03.
   * Recommended increments by hundredths.
   */
  stepContrastRamp: number;

  /**
   * Whether to keep the exact source color in the target palette. Default false.
   * Only recommended when the exact color is required and used in stateful interaction recipes like hover.
   * Note that custom recipes can still access the source color even if it's not in the ramp,
   * but turning this on will potentially increase the contrast between steps toward the ends of the palette.
   */
  preserveSource: boolean;
}

const defaultPaletteRGBOptions: PaletteRGBOptions = {
  stepContrast: 1.03,
  stepContrastRamp: 0.03,
  preserveSource: false,
};

/** @public */
export type PaletteRGB = Palette<SwatchRGB>;

/**
 * Creates a PaletteRGB from input R, G, B color values.
 * @param r - Red value represented as a number between 0 and 1.
 * @param g - Green value represented as a number between 0 and 1.
 * @param b - Blue value represented as a number between 0 and 1.
 */
function create(r: number, g: number, b: number): PaletteRGB;
/**
 * Creates a PaletteRGB from a source SwatchRGB object.
 * @deprecated - Use PaletteRGB.from()
 */
function create(source: SwatchRGB): PaletteRGB;
function create(rOrSource: SwatchRGB | number, g?: number, b?: number): PaletteRGB {
  if (typeof rOrSource === 'number') {
    return PaletteRGB.from(SwatchRGB.create(rOrSource, g!, b!));
  } else {
    return PaletteRGB.from(rOrSource);
  }
}

/**
 * Creates a PaletteRGB from a source color object.
 * @param source - The source color
 */
function from(source: SwatchRGB, options?: Partial<PaletteRGBOptions>): PaletteRGB;
function from(source: Pick<SwatchRGB, 'r' | 'g' | 'b'>, options?: Partial<PaletteRGBOptions>): PaletteRGB {
  return isSwatchRGB(source)
    ? PaletteRGBImpl.from(source, options)
    : PaletteRGBImpl.from(SwatchRGB.create(source.r, source.g, source.b), options);
}
/** @public */
export const PaletteRGB = Object.freeze({
  create,
  from,
});

/**
 * A {@link Palette} representing RGB swatch values.
 * @public
 */
class PaletteRGBImpl implements Palette<SwatchRGB> {
  /**
   * {@inheritdoc Palette.source}
   */
  public readonly source: SwatchRGB;
  public readonly swatches: ReadonlyArray<SwatchRGB>;
  private lastIndex: number;
  private reversedSwatches: ReadonlyArray<SwatchRGB>;
  private closestIndexCache = new Map<number, number>();

  /**
   *
   * @param source - The source color for the palette
   * @param swatches - All swatches in the palette
   */
  constructor(source: SwatchRGB, swatches: ReadonlyArray<SwatchRGB>) {
    this.source = source;
    this.swatches = swatches;

    this.reversedSwatches = Object.freeze([...this.swatches].reverse());
    this.lastIndex = this.swatches.length - 1;
  }

  /**
   * {@inheritdoc Palette.colorContrast}
   */
  public colorContrast(
    reference: Swatch,
    contrastTarget: number,
    initialSearchIndex?: number,
    direction?: 1 | -1,
  ): SwatchRGB {
    if (initialSearchIndex === undefined) {
      initialSearchIndex = this.closestIndexOf(reference);
    }

    let source: ReadonlyArray<SwatchRGB> = this.swatches;
    const endSearchIndex = this.lastIndex;
    let startSearchIndex = initialSearchIndex;

    if (direction === undefined) {
      direction = directionByIsDark(reference);
    }

    const condition = (value: SwatchRGB) => contrast(reference, value) >= contrastTarget;

    if (direction === -1) {
      source = this.reversedSwatches;
      startSearchIndex = endSearchIndex - startSearchIndex;
    }

    return binarySearch(source, condition, startSearchIndex, endSearchIndex);
  }

  /**
   * {@inheritdoc Palette.get}
   */
  public get(index: number): SwatchRGB {
    return this.swatches[index] || this.swatches[clamp(index, 0, this.lastIndex)];
  }

  /**
   * {@inheritdoc Palette.closestIndexOf}
   */
  public closestIndexOf(reference: Swatch): number {
    if (this.closestIndexCache.has(reference.relativeLuminance)) {
      return this.closestIndexCache.get(reference.relativeLuminance)!;
    }

    let index = this.swatches.indexOf(reference as SwatchRGB);

    if (index !== -1) {
      this.closestIndexCache.set(reference.relativeLuminance, index);
      return index;
    }

    const closest = this.swatches.reduce((previous, next) =>
      Math.abs(next.relativeLuminance - reference.relativeLuminance) <
      Math.abs(previous.relativeLuminance - reference.relativeLuminance)
        ? next
        : previous,
    );

    index = this.swatches.indexOf(closest);
    this.closestIndexCache.set(reference.relativeLuminance, index);

    return index;
  }

  /**
   * Bump the saturation if it falls below the reference color saturation.
   * @param reference Color with target saturation
   * @param color Color to check and bump if below target saturation
   * @returns Original or adjusted color
   */
  private static saturationBump(reference: ColorRGBA64, color: ColorRGBA64): ColorRGBA64 {
    const hslReference = rgbToHSL(reference);
    const saturationTarget = hslReference.s;
    const hslColor = rgbToHSL(color);
    if (hslColor.s < saturationTarget) {
      const hslNew = new ColorHSL(hslColor.h, saturationTarget, hslColor.l);
      return hslToRGB(hslNew);
    }
    return color;
  }

  /**
   * Scales input from 0 to 100 to 0 to 0.5.
   * @param l Input number, 0 to 100
   * @returns Output number, 0 to 0.5
   */
  private static ramp(l: number) {
    const inputval = l / 100;
    if (inputval > 0.5) return (inputval - 0.5) / 0.5; //from 0.500001in = 0.00000001out to 1.0in = 1.0out
    return 2 * inputval; //from 0in = 0out to 0.5in = 1.0out
  }

  /**
   * Create a palette following the desired curve and many steps to build a smaller palette from.
   * @param source The source swatch to create a palette from
   * @returns The palette
   */
  private static createHighResolutionPalette(source: SwatchRGB): PaletteRGBImpl {
    const swatches: SwatchRGB[] = [];

    const labSource = rgbToLAB(ColorRGBA64.fromObject(source)!.roundToPrecision(4));
    const lab0 = labToRGB(new ColorLAB(0, labSource.a, labSource.b)).clamp().roundToPrecision(4);
    const lab50 = labToRGB(new ColorLAB(50, labSource.a, labSource.b)).clamp().roundToPrecision(4);
    const lab100 = labToRGB(new ColorLAB(100, labSource.a, labSource.b)).clamp().roundToPrecision(4);
    const rgbMin = new ColorRGBA64(0, 0, 0);
    const rgbMax = new ColorRGBA64(1, 1, 1);

    const lAbove = lab100.equalValue(rgbMax) ? 0 : 14;
    const lBelow = lab0.equalValue(rgbMin) ? 0 : 14;

    // 257 levels max, depending on whether lab0 or lab100 are black or white respectively.
    for (let l = 100 + lAbove; l >= 0 - lBelow; l -= 0.5) {
      let rgb: ColorRGBA64;

      if (l < 0) {
        // For L less than 0, scale from black to L=0
        const percentFromRgbMinToLab0 = l / lBelow + 1;
        rgb = interpolateRGB(percentFromRgbMinToLab0, rgbMin, lab0);
      } else if (l <= 50) {
        // For L less than 50, we scale from L=0 to the base color
        rgb = interpolateRGB(PaletteRGBImpl.ramp(l), lab0, lab50);
      } else if (l <= 100) {
        // For L less than 100, scale from the base color to L=100
        rgb = interpolateRGB(PaletteRGBImpl.ramp(l), lab50, lab100);
      } else {
        // For L greater than 100, scale from L=100 to white
        const percentFromLab100ToRgbMax = (l - 100.0) / lAbove;
        rgb = interpolateRGB(percentFromLab100ToRgbMax, lab100, rgbMax);
      }

      rgb = PaletteRGBImpl.saturationBump(lab50, rgb).roundToPrecision(4);

      swatches.push(SwatchRGB.from(rgb));
    }

    return new PaletteRGBImpl(source, swatches);
  }

  /**
   * Adjust one end of the contrast-based palette so it doesn't abruptly fall to black (or white).
   * @param swatchContrast Function to get the target contrast for the next swatch
   * @param referencePalette The high resolution palette
   * @param targetPalette The contrast-based palette to adjust
   * @param direction The end to adjust
   */
  private static adjustEnd(
    swatchContrast: (swatch: SwatchRGB) => number,
    referencePalette: PaletteRGBImpl,
    targetPalette: SwatchRGB[],
    direction: 1 | -1,
  ) {
    // Careful with the use of referencePalette as only the refSwatches is reversed.
    const refSwatches = direction === -1 ? referencePalette.swatches : referencePalette.reversedSwatches;
    const refIndex = (swatch: SwatchRGB) => {
      const index = referencePalette.closestIndexOf(swatch);
      return direction === 1 ? referencePalette.lastIndex - index : index;
    };

    // Only operates on the 'end' end of the array, so flip if we're adjusting the 'beginning'
    if (direction === 1) {
      targetPalette.reverse();
    }

    const targetContrast = swatchContrast(targetPalette[targetPalette.length - 2]);
    const actualContrast = roundToPrecisionSmall(
      contrast(targetPalette[targetPalette.length - 1], targetPalette[targetPalette.length - 2]),
      2,
    );
    if (actualContrast < targetContrast) {
      // Remove last swatch if not sufficient contrast
      targetPalette.pop();

      // Distribute to the last swatch
      const safeSecondSwatch = referencePalette.colorContrast(
        refSwatches[referencePalette.lastIndex],
        targetContrast,
        undefined,
        direction,
      );
      const safeSecondRefIndex = refIndex(safeSecondSwatch);
      const targetSwatchCurrentRefIndex = refIndex(targetPalette[targetPalette.length - 2]);
      const swatchesToSpace = safeSecondRefIndex - targetSwatchCurrentRefIndex;
      let space = 1;
      for (let i = targetPalette.length - swatchesToSpace - 1; i < targetPalette.length; i++) {
        const currentRefIndex = refIndex(targetPalette[i]);
        const nextRefIndex = i === targetPalette.length - 1 ? referencePalette.lastIndex : currentRefIndex + space;
        targetPalette[i] = refSwatches[nextRefIndex];
        space++;
      }
    }

    if (direction === 1) {
      targetPalette.reverse();
    }
  }

  /**
   * Generate a palette with consistent minimum contrast between swatches.
   * @param source The source color
   * @param options Palette generation options
   * @returns A palette meeting the requested contrast between swatches.
   */
  private static createColorPaletteByContrast(source: SwatchRGB, options: PaletteRGBOptions): SwatchRGB[] {
    const referencePalette = PaletteRGBImpl.createHighResolutionPalette(source);

    // Ramp function to increase contrast as the swatches get darker
    const nextContrast = (swatch: SwatchRGB) => {
      const c = options.stepContrast + options.stepContrast * (1 - swatch.relativeLuminance) * options.stepContrastRamp;
      return roundToPrecisionSmall(c, 2);
    };

    const swatches: SwatchRGB[] = [];

    // Start with the source color or the light end color
    let ref = options.preserveSource ? source : referencePalette.swatches[0];
    swatches.push(ref);

    // Add swatches with contrast toward dark
    do {
      const targetContrast = nextContrast(ref);
      ref = referencePalette.colorContrast(ref, targetContrast, undefined, 1);
      swatches.push(ref);
    } while (ref.relativeLuminance > 0);

    // Add swatches with contrast toward light
    if (options.preserveSource) {
      ref = source;
      do {
        // This is off from the dark direction because `ref` here is the darker swatch, probably subtle
        const targetContrast = nextContrast(ref);
        ref = referencePalette.colorContrast(ref, targetContrast, undefined, -1);
        swatches.unshift(ref);
      } while (ref.relativeLuminance < 1);
    }

    // Validate dark end
    this.adjustEnd(nextContrast, referencePalette, swatches, -1);

    // Validate light end
    if (options.preserveSource) {
      this.adjustEnd(nextContrast, referencePalette, swatches, 1);
    }

    return swatches;
  }

  /**
   * Create a color palette from a provided swatch
   * @param source - The source swatch to create a palette from
   * @returns
   */
  static from(source: SwatchRGB, options?: Partial<PaletteRGBOptions>): PaletteRGB {
    const opts = options === void 0 || null ? defaultPaletteRGBOptions : { ...defaultPaletteRGBOptions, ...options };

    return new PaletteRGBImpl(source, Object.freeze(PaletteRGBImpl.createColorPaletteByContrast(source, opts)));
  }
}
