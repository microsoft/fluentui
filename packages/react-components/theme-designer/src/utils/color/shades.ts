import { Vec3 } from '@fluent-blocks/colors';

/* Calculates the contrast ratio between two colors. Used for verifying
 * color pairs meet minimum accessibility requirements.
 * See: https://www.w3.org/TR/WCAG20/ section 1.4.3
 */
export function getContrastRatio(color1: Vec3, color2: Vec3): number {
  // Formula defined by: http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#contrast-ratiodef
  // relative luminance: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef

  /* calculate the intermediate value needed to calculating relative luminance */
  function getIntermediateValue(x: number): number {
    if (x <= 0.03928) {
      return x / 12.92;
    } else {
      return Math.pow((x + 0.055) / 1.055, 2.4);
    }
  }

  const r1 = getIntermediateValue(color1[0]);
  const g1 = getIntermediateValue(color1[1]);
  const b1 = getIntermediateValue(color1[2]);
  let L1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1; // relative luminance of first color
  L1 += 0.05;

  const r2 = getIntermediateValue(color2[0]);
  const g2 = getIntermediateValue(color2[1]);
  const b2 = getIntermediateValue(color2[2]);
  let L2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2; // relative luminance of second color
  L2 += 0.05;

  // return the lighter color divided by darker
  return L1 / L2 > 1 ? L1 / L2 : L2 / L1;
}
