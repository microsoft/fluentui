/**
 * @public
 */
export interface RelativeLuminance {
  /**
   * A number between 0 and 1, calculated by {@link https://www.w3.org/WAI/GL/wiki/Relative_luminance}
   */
  readonly relativeLuminance: number;
}

/**
 * @internal
 */
export function contrast(a: RelativeLuminance, b: RelativeLuminance): number {
  const L1 = a.relativeLuminance > b.relativeLuminance ? a : b;
  const L2 = a.relativeLuminance > b.relativeLuminance ? b : a;

  return (L1.relativeLuminance + 0.05) / (L2.relativeLuminance + 0.05);
}
