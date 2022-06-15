// The following is a combination of several files retrieved from CSSWG’s
// CSS Color 4 module. It was modified to support TypeScript types adapted for
// the Fluent Blocks `colors` package and formatted to meet its style criteria.
import { Vec3 } from '@fluent-blocks/colors';

// utility functions for color conversions

// [willshown]: Adjusted to export a TypeScript module.
// Retrieved on 24 May 2021 from https://drafts.csswg.org/css-color-4/utilities.js

/**
 * Simple matrix (and vector) multiplication
 * Warning: No error handling for incompatible dimensions!
 * @author Lea Verou 2020 MIT License
 */

type MatrixIO = number[][] | number[];

function isFlat(A: MatrixIO): A is number[] {
  return !Array.isArray(A[0]);
}

// A is m x n. B is n x p. product is m x p.
export default function multiplyMatrices(AMatrixOrVector: MatrixIO, BMatrixOrVector: MatrixIO): MatrixIO {
  const m = AMatrixOrVector.length;

  const A: number[][] = isFlat(AMatrixOrVector)
    ? // A is vector, convert to [[a, b, c, ...]]
      [AMatrixOrVector]
    : AMatrixOrVector;

  const B: number[][] = isFlat(BMatrixOrVector)
    ? // B is vector, convert to [[a], [b], [c], ...]]
      BMatrixOrVector.map(x => [x])
    : BMatrixOrVector;

  const p = B[0].length;
  const bCols = B[0].map((_, i) => B.map(x => x[i])); // transpose B
  let product: MatrixIO = A.map(row =>
    bCols.map(col => {
      if (!Array.isArray(row)) {
        return col.reduce((a, c) => a + c * row, 0);
      }

      return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
    }),
  );

  if (m === 1) {
    product = product[0]; // Avoid [[a, b, c, ...]]
  }

  if (p === 1) {
    return (product as number[][]).map(x => x[0]); // Avoid [[a], [b], [c], ...]]
  }

  return product;
}

// Sample code for color conversions
// Conversion can also be done using ICC profiles and a Color Management System
// For clarity, a library is used for matrix multiplication (multiply-matrices.js)

// [willshown]: Adjusted to export a TypeScript module. Retrieved on 24 May 2021
// from https://drafts.csswg.org/css-color-4/conversions.js

// sRGB-related functions

export function linSRGB(RGB: Vec3) {
  // convert an array of sRGB values
  // where in-gamut values are in the range [0 - 1]
  // to linear light (un-companded) form.
  // https://en.wikipedia.org/wiki/SRGB
  // Extended transfer function:
  // for negative values,  linear portion is extended on reflection of axis,
  // then reflected power function is used.
  return RGB.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    if (abs < 0.04045) {
      return val / 12.92;
    }

    return sign * Math.pow((abs + 0.055) / 1.055, 2.4);
  }) as Vec3;
}

export function linsRGBToXYZ(rgb: Vec3) {
  // convert an array of linear-light sRGB values to CIE XYZ
  // using sRGB's own white, D65 (no chromatic adaptation)

  const M = [
    [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
    [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
    [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
  ];
  return multiplyMatrices(M, rgb) as Vec3;
}

export function sRGBToLuminance(RGB: Vec3) {
  // convert an array of gamma-corrected sRGB values
  // in the 0.0 to 1.0 range
  // to linear-light sRGB, then to CIE XYZ
  // and return luminance (the Y value)

  const XYZ = linsRGBToXYZ(linSRGB(RGB));
  return XYZ[1];
}

export function contrast(RGB1: Vec3, RGB2: Vec3) {
  // return WCAG 2.1 contrast ratio
  // https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
  // for two sRGB values
  // given as arrays of 0.0 to 1.0

  const L1 = sRGBToLuminance(RGB1);
  const L2 = sRGBToLuminance(RGB2);

  if (L1 > L2) {
    return (L1 + 0.05) / (L2 + 0.05);
  }

  return (L2 + 0.05) / (L1 + 0.05);
}
