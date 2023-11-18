/* eslint-disable @typescript-eslint/naming-convention */
// The following is a combination of several files retrieved from CSSWG’s
// CSS Color 4 module. It was modified to support TypeScript types adapted for
// the Fluent Blocks `colors` package and formatted to meet its style criteria.
import { Vec2, Vec3, Vec4 } from './types';

// [willshown]: Adjusted to export a TypeScript module. Retrieved on 24 May 2021
// from https://drafts.csswg.org/css-color-4/multiply-matrices.js

/**
 * Simple matrix (and vector) multiplication
 * Warning: No error handling for incompatible dimensions!
 * @author Lea Verou 2020 MIT License
 */

type MatrixIO = number[][] | number[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFlat(A: any): A is number[] {
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
  const B_cols = B[0].map((_, i) => B.map(x => x[i])); // transpose B
  let product: MatrixIO = A.map(row =>
    B_cols.map(col => {
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

export function lin_sRGB(RGB: Vec3) {
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

export function gam_sRGB(RGB: Vec3) {
  // convert an array of linear-light sRGB values in the range 0.0-1.0
  // to gamma corrected form
  // https://en.wikipedia.org/wiki/SRGB
  // Extended transfer function:
  // For negative values, linear portion extends on reflection
  // of axis, then uses reflected pow below that
  return RGB.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    if (abs > 0.0031308) {
      return sign * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
    }

    return 12.92 * val;
  }) as Vec3;
}

export function lin_sRGB_to_XYZ(rgb: Vec3) {
  // convert an array of linear-light sRGB values to CIE XYZ
  // using sRGB's own white, D65 (no chromatic adaptation)

  const M = [
    [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
    [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
    [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
  ];
  return multiplyMatrices(M, rgb) as Vec3;
}

export function XYZ_to_lin_sRGB(XYZ: Vec3) {
  // convert XYZ to linear-light sRGB

  const M = [
    [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
    [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
    [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
  ];

  return multiplyMatrices(M, XYZ) as Vec3;
}

//  display-p3-related functions

export function lin_P3(RGB: Vec3) {
  // convert an array of display-p3 RGB values in the range 0.0 - 1.0
  // to linear light (un-companded) form.

  return lin_sRGB(RGB) as Vec3; // same as sRGB
}

export function gam_P3(RGB: Vec3) {
  // convert an array of linear-light display-p3 RGB  in the range 0.0-1.0
  // to gamma corrected form

  return gam_sRGB(RGB) as Vec3; // same as sRGB
}

export function lin_P3_to_XYZ(rgb: Vec3) {
  // convert an array of linear-light display-p3 values to CIE XYZ
  // using  D65 (no chromatic adaptation)
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  const M = [
    [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
    [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
    [0.0, 0.04511338185890264, 1.043944368900976],
  ];
  // 0 was computed as -3.972075516933488e-17

  return multiplyMatrices(M, rgb) as Vec3;
}

export function XYZ_to_lin_P3(XYZ: Vec3) {
  // convert XYZ to linear-light P3
  const M = [
    [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
    [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
    [0.03584583024378447, -0.07617238926804182, 0.9568845240076872],
  ];

  return multiplyMatrices(M, XYZ) as Vec3;
}

// prophoto-rgb functions

export function lin_ProPhoto(RGB: Vec3) {
  // convert an array of prophoto-rgb values
  // where in-gamut colors are in the range [0.0 - 1.0]
  // to linear light (un-companded) form.
  // Transfer curve is gamma 1.8 with a small linear portion
  // Extended transfer function
  const Et2 = 16 / 512;
  return RGB.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    if (abs <= Et2) {
      return val / 16;
    }

    return sign * Math.pow(val, 1.8);
  }) as Vec3;
}

export function gam_ProPhoto(RGB: Vec3) {
  // convert an array of linear-light prophoto-rgb  in the range 0.0-1.0
  // to gamma corrected form
  // Transfer curve is gamma 1.8 with a small linear portion
  // TODO for negative values, extend linear portion on reflection of axis, then add pow below that
  const Et = 1 / 512;
  return RGB.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    if (abs >= Et) {
      return sign * Math.pow(abs, 1 / 1.8);
    }

    return 16 * val;
  }) as Vec3;
}

export function lin_ProPhoto_to_XYZ(rgb: Vec3) {
  // convert an array of linear-light prophoto-rgb values to CIE XYZ
  // using  D50 (so no chromatic adaptation needed afterwards)
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  const M = [
    [0.7977604896723027, 0.13518583717574031, 0.0313493495815248],
    [0.2880711282292934, 0.7118432178101014, 0.00008565396060525902],
    [0.0, 0.0, 0.8251046025104601],
  ];

  return multiplyMatrices(M, rgb) as Vec3;
}

export function XYZ_to_lin_ProPhoto(XYZ: Vec3) {
  // convert XYZ to linear-light prophoto-rgb
  const M = [
    [1.3457989731028281, -0.25558010007997534, -0.05110628506753401],
    [-0.5446224939028347, 1.5082327413132781, 0.02053603239147973],
    [0.0, 0.0, 1.2119675456389454],
  ];

  return multiplyMatrices(M, XYZ) as Vec3;
}

// a98-rgb functions

export function lin_a98rgb(RGB: Vec3) {
  // convert an array of a98-rgb values in the range 0.0 - 1.0
  // to linear light (un-companded) form.
  // negative values are also now accepted
  return RGB.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    return sign * Math.pow(abs, 563 / 256);
  }) as Vec3;
}

export function gam_a98rgb(RGB: Vec3) {
  // convert an array of linear-light a98-rgb  in the range 0.0-1.0
  // to gamma corrected form
  // negative values are also now accepted
  return RGB.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    return sign * Math.pow(abs, 256 / 563);
  }) as Vec3;
}

export function lin_a98rgb_to_XYZ(rgb: Vec3) {
  // convert an array of linear-light a98-rgb values to CIE XYZ
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  // has greater numerical precision than section 4.3.5.3 of
  // https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
  // but the values below were calculated from first principles
  // from the chromaticity coordinates of R G B W
  // see matrixmaker.html
  const M = [
    [0.5766690429101305, 0.1855582379065463, 0.1882286462349947],
    [0.29734497525053605, 0.6273635662554661, 0.07529145849399788],
    [0.02703136138641234, 0.07068885253582723, 0.9913375368376388],
  ];

  return multiplyMatrices(M, rgb) as Vec3;
}

export function XYZ_to_lin_a98rgb(XYZ: Vec3) {
  // convert XYZ to linear-light a98-rgb
  const M = [
    [2.0415879038107465, -0.5650069742788596, -0.34473135077832956],
    [-0.9692436362808795, 1.8759675015077202, 0.04155505740717557],
    [0.013444280632031142, -0.11836239223101838, 1.0151749943912054],
  ];

  return multiplyMatrices(M, XYZ) as Vec3;
}

// Rec. 2020-related functions

export function lin_2020(RGB: Vec3) {
  // convert an array of rec2020 RGB values in the range 0.0 - 1.0
  // to linear light (un-companded) form.
  // ITU-R BT.2020-2 p.4

  const α = 1.09929682680944;
  const β = 0.018053968510807;

  return RGB.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    if (abs < β * 4.5) {
      return val / 4.5;
    }

    return sign * Math.pow((abs + α - 1) / α, 1 / 0.45);
  }) as Vec3;
}

export function gam_2020(RGB: Vec3) {
  // convert an array of linear-light rec2020 RGB  in the range 0.0-1.0
  // to gamma corrected form
  // ITU-R BT.2020-2 p.4

  const α = 1.09929682680944;
  const β = 0.018053968510807;

  return RGB.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    if (abs > β) {
      return sign * (α * Math.pow(abs, 0.45) - (α - 1));
    }

    return 4.5 * val;
  }) as Vec3;
}

export function lin_2020_to_XYZ(rgb: Vec3) {
  // convert an array of linear-light rec2020 values to CIE XYZ
  // using  D65 (no chromatic adaptation)
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  const M = [
    [0.6369580483012914, 0.14461690358620832, 0.1688809751641721],
    [0.2627002120112671, 0.6779980715188708, 0.05930171646986196],
    [0.0, 0.028072693049087428, 1.060985057710791],
  ];
  // 0 is actually calculated as  4.994106574466076e-17

  return multiplyMatrices(M, rgb) as Vec3;
}

export function XYZ_to_lin_2020(XYZ: Vec3) {
  // convert XYZ to linear-light rec2020
  const M = [
    [1.7166511879712674, -0.35567078377639233, -0.25336628137365974],
    [-0.6666843518324892, 1.6164812366349395, 0.01576854581391113],
    [0.017639857445310783, -0.042770613257808524, 0.9421031212354738],
  ];

  return multiplyMatrices(M, XYZ) as Vec3;
}

// Chromatic adaptation

export function D65_to_D50(XYZ: Vec3) {
  // Bradford chromatic adaptation from D65 to D50
  // The matrix below is the result of three operations:
  // - convert from XYZ to retinal cone domain
  // - scale components from one reference white to another
  // - convert back to XYZ
  // http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
  const M = [
    [1.0479298208405488, 0.022946793341019088, -0.05019222954313557],
    [0.029627815688159344, 0.990434484573249, -0.01707382502938514],
    [-0.009243058152591178, 0.015055144896577895, 0.7518742899580008],
  ];

  return multiplyMatrices(M, XYZ) as Vec3;
}

export function D50_to_D65(XYZ: Vec3) {
  // Bradford chromatic adaptation from D50 to D65
  const M = [
    [0.9554734527042182, -0.023098536874261423, 0.0632593086610217],
    [-0.028369706963208136, 1.0099954580058226, 0.021041398966943008],
    [0.012314001688319899, -0.020507696433477912, 1.3303659366080753],
  ];

  return multiplyMatrices(M, XYZ) as Vec3;
}

// Lab and LCH

export function XYZ_to_Lab(XYZ: Vec3) {
  // Assuming XYZ is relative to D50, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  const ε = 216 / 24389; // 6^3/29^3
  const κ = 24389 / 27; // 29^3/3^3
  const white = [0.96422, 1.0, 0.82521]; // D50 reference white

  // compute xyz, which is XYZ scaled relative to reference white
  const xyz = XYZ.map((value, i) => value / white[i]);

  // now compute f
  const f = xyz.map(value => (value > ε ? Math.cbrt(value) : (κ * value + 16) / 116));

  return [
    116 * f[1] - 16, // L
    500 * (f[0] - f[1]), // a
    200 * (f[1] - f[2]), // b
  ] as Vec3;
}

export function Lab_to_XYZ(Lab: Vec3) {
  // Convert Lab to D50-adapted XYZ
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  const κ = 24389 / 27; // 29^3/3^3
  const ε = 216 / 24389; // 6^3/29^3
  const white = [0.96422, 1.0, 0.82521]; // D50 reference white
  const f = [];

  // compute f, starting with the luminance-related term
  f[1] = (Lab[0] + 16) / 116;
  f[0] = Lab[1] / 500 + f[1];
  f[2] = f[1] - Lab[2] / 200;

  // compute xyz
  const xyz = [
    Math.pow(f[0], 3) > ε ? Math.pow(f[0], 3) : (116 * f[0] - 16) / κ,
    Lab[0] > κ * ε ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / κ,
    Math.pow(f[2], 3) > ε ? Math.pow(f[2], 3) : (116 * f[2] - 16) / κ,
  ];

  // Compute XYZ by scaling xyz by reference white
  return xyz.map((value, i) => value * white[i]) as Vec3;
}

export function Lab_to_LCH(Lab: Vec3) {
  // Convert to polar form
  const hue = (Math.atan2(Lab[2], Lab[1]) * 180) / Math.PI;
  return [
    Lab[0], // L is still L
    Math.sqrt(Math.pow(Lab[1], 2) + Math.pow(Lab[2], 2)), // Chroma
    hue >= 0 ? hue : hue + 360, // Hue, in degrees [0 to 360)
  ] as Vec3;
}

export function LCH_to_Lab(LCH: Vec3) {
  // Convert from polar form
  return [
    LCH[0], // L is still L
    LCH[1] * Math.cos((LCH[2] * Math.PI) / 180), // a
    LCH[1] * Math.sin((LCH[2] * Math.PI) / 180), // b
  ] as Vec3;
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   rgb      The red, green, and blue color values
 * @return  Array    The HSV representation
 */
export function rgbToHsv(rgb: Vec3) {
  const [r, g, b] = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number;
  const v = max;

  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h = h! / 6;
  }

  return [h, s, v] as Vec3;
}

// utility functions for color conversions

// [willshown]: Adjusted to export a TypeScript module.
// Retrieved on 24 May 2021 from https://drafts.csswg.org/css-color-4/utilities.js

export function sRGB_to_luminance(RGB: Vec3) {
  // convert an array of gamma-corrected sRGB values
  // in the 0.0 to 1.0 range
  // to linear-light sRGB, then to CIE XYZ
  // and return luminance (the Y value)

  const XYZ = lin_sRGB_to_XYZ(lin_sRGB(RGB));
  return XYZ[1];
}

export function contrast(RGB1: Vec3, RGB2: Vec3) {
  // return WCAG 2.1 contrast ratio
  // https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
  // for two sRGB values
  // given as arrays of 0.0 to 1.0

  const L1 = sRGB_to_luminance(RGB1);
  const L2 = sRGB_to_luminance(RGB2);

  if (L1 > L2) {
    return (L1 + 0.05) / (L2 + 0.05);
  }

  return (L2 + 0.05) / (L1 + 0.05);
}

export function sRGB_to_LCH(RGB: Vec3) {
  // convert an array of gamma-corrected sRGB values
  // in the 0.0 to 1.0 range
  // to linear-light sRGB, then to CIE XYZ,
  // then adapt from D65 to D50,
  // then convert XYZ to CIE Lab
  // and finally, convert to CIE LCH

  return Lab_to_LCH(XYZ_to_Lab(D65_to_D50(lin_sRGB_to_XYZ(lin_sRGB(RGB)))));
}

export function sRGB_to_LAB(RGB: Vec3) {
  // convert an array of gamma-corrected sRGB values
  // in the 0.0 to 1.0 range
  // to linear-light sRGB, then to CIE XYZ,
  // then adapt from D65 to D50,
  // then convert XYZ to CIE Lab

  return XYZ_to_Lab(D65_to_D50(lin_sRGB_to_XYZ(lin_sRGB(RGB))));
}

export function P3_to_LCH(RGB: Vec3) {
  // convert an array of gamma-corrected display-p3 values
  // in the 0.0 to 1.0 range
  // to linear-light display-p3, then to CIE XYZ,
  // then adapt from D65 to D50,
  // then convert XYZ to CIE Lab
  // and finally, convert to CIE LCH

  return Lab_to_LCH(XYZ_to_Lab(D65_to_D50(lin_P3_to_XYZ(lin_P3(RGB)))));
}

export function r2020_to_LCH(RGB: Vec3) {
  // convert an array of gamma-corrected rec.2020 values
  // in the 0.0 to 1.0 range
  // to linear-light sRGB, then to CIE XYZ,
  // then adapt from D65 to D50,
  // then convert XYZ to CIE Lab
  // and finally, convert to CIE LCH

  return Lab_to_LCH(XYZ_to_Lab(D65_to_D50(lin_2020_to_XYZ(lin_2020(RGB)))));
}

export function LCH_to_sRGB(LCH: Vec3) {
  // convert an array of CIE LCH values
  // to CIE Lab, and then to XYZ,
  // adapt from D50 to D65,
  // then convert XYZ to linear-light sRGB
  // and finally to gamma corrected sRGB
  // for in-gamut colors, components are in the 0.0 to 1.0 range
  // out of gamut colors may have negative components
  // or components greater than 1.0
  // so check for that :)

  return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}

export function LAB_to_sRGB(LAB: Vec3) {
  // convert an array of CIE Lab values to XYZ,
  // adapt from D50 to D65,
  // then convert XYZ to linear-light sRGB
  // and finally to gamma corrected sRGB
  // for in-gamut colors, components are in the 0.0 to 1.0 range
  // out of gamut colors may have negative components
  // or components greater than 1.0
  // so check for that :)

  return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LAB))));
}

export function LCH_to_P3(LCH: Vec3) {
  // convert an array of CIE LCH values
  // to CIE Lab, and then to XYZ,
  // adapt from D50 to D65,
  // then convert XYZ to linear-light display-p3
  // and finally to gamma corrected display-p3
  // for in-gamut colors, components are in the 0.0 to 1.0 range
  // out of gamut colors may have negative components
  // or components greater than 1.0
  // so check for that :)

  return gam_P3(XYZ_to_lin_P3(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}

export function LCH_to_r2020(LCH: Vec3) {
  // convert an array of CIE LCH values
  // to CIE Lab, and then to XYZ,
  // adapt from D50 to D65,
  // then convert XYZ to linear-light rec.2020
  // and finally to gamma corrected rec.2020
  // for in-gamut colors, components are in the 0.0 to 1.0 range
  // out of gamut colors may have negative components
  // or components greater than 1.0
  // so check for that :)

  return gam_2020(XYZ_to_lin_2020(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}

// this is straight from the CSS Color 4 spec

export function hslToRgb(hue: number, sat: number, light: number) {
  // 	For simplicity, this algorithm assumes that the hue has been normalized
  //  to a number in the half-open range [0, 6), and the saturation and lightness
  //  have been normalized to the range [0, 1]. It returns an array of three numbers
  //  representing the red, green, and blue channels of the colors,
  //  normalized to the range [0, 1]
  const t2 = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat;
  const t1 = light * 2 - t2;
  const r = hueToChannel(t1, t2, hue + 2);
  const g = hueToChannel(t1, t2, hue);
  const b = hueToChannel(t1, t2, hue - 2);
  return [r, g, b] as Vec3;
}

export function hueToChannel(t1: number, t2: number, hue: number): number {
  if (hue < 0) {
    hue += 6;
  }
  if (hue >= 6) {
    hue -= 6;
  }

  if (hue < 1) {
    return (t2 - t1) * hue + t1;
  } else if (hue < 3) {
    return t2;
  } else if (hue < 4) {
    return (t2 - t1) * (4 - hue) + t1;
  } else {
    return t1;
  }
}

// These are the naive algorithms from CS Color 4

export function naive_CMYK_to_sRGB(CMYK: Vec4) {
  // CMYK is an array of four values
  // in the range [0.0, 1.0]
  // the optput is an array of [RGB]
  // also in the [0.0, 1.0] range
  // because the naive algorithm does not generate out of gamut colors
  // neither does it generate accurate simulations of practical CMYK colors

  const cyan = CMYK[0];
  const magenta = CMYK[1];
  const yellow = CMYK[2];
  const black = CMYK[3];

  const red = 1 - Math.min(1, cyan * (1 - black) + black);
  const green = 1 - Math.min(1, magenta * (1 - black) + black);
  const blue = 1 - Math.min(1, yellow * (1 - black) + black);

  return [red, green, blue] as Vec3;
}

export function naive_sRGB_to_CMYK(RGB: Vec3) {
  // RGB is an arravy of three values
  // in the range [0.0, 1.0]
  // the output is an array of [CMYK]
  // also in the [0.0, 1.0] range
  // with maximum GCR and (I think) 200% TAC
  // the naive algorithm does not generate out of gamut colors
  // neither does it generate accurate simulations of practical CMYK colors

  const red = RGB[0];
  const green = RGB[1];
  const blue = RGB[2];

  const black = 1 - Math.max(red, green, blue);
  const cyan = black === 1.0 ? 0 : (1 - red - black) / (1 - black);
  const magenta = black === 1.0 ? 0 : (1 - green - black) / (1 - black);
  const yellow = black === 1.0 ? 0 : (1 - blue - black) / (1 - black);

  return [cyan, magenta, yellow, black] as Vec4;
}

// Chromaticity utilities

export function XYZ_to_xy(XYZ: Vec3) {
  // Convert an array of three XYZ values
  // to x,y chromaticity coordinates

  const X = XYZ[0];
  const Y = XYZ[1];
  const Z = XYZ[2];
  const sum = X + Y + Z;
  return [X / sum, Y / sum] as Vec2;
}

export function xy_to_uv(xy: Vec2) {
  // convert an x,y chromaticity pair
  // to u*,v* chromaticities

  const x = xy[0];
  const y = xy[1];
  const denom = -2 * x + 12 * y + 3;
  return [(4 * x) / denom, (9 * y) / denom] as Vec2;
}

export function XYZ_to_uv(XYZ: Vec3) {
  // Convert an array of three XYZ values
  // to u*,v* chromaticity coordinates

  const X = XYZ[0];
  const Y = XYZ[1];
  const Z = XYZ[2];
  const denom = X + 15 * Y + 3 * Z;
  return [(4 * X) / denom, (9 * Y) / denom] as Vec2;
}

// [willshown]: Truncated to export only relevant functions and adjusted to export a TypeScript
// module, some additional adjustments to remove alpha support. Retrieved on 24 May 2021
// from https://raw.githubusercontent.com/LeaVerou/css.land/master/lch/lch.js

function is_LCH_inside_sRGB(l: number, c: number, h: number): boolean {
  const ε = 0.000005;
  const rgb = LCH_to_sRGB([+l, +c, +h]);
  return rgb.reduce((a: boolean, b: number) => a && b >= 0 - ε && b <= 1 + ε, true);
}

export function snap_into_gamut(Lab: Vec3): Vec3 {
  // Moves an LCH color into the sRGB gamut
  // by holding the l and h steady,
  // and adjusting the c via binary-search
  // until the color is on the sRGB boundary.

  // .0001 chosen fairly arbitrarily as "close enough"
  const ε = 0.0001;

  const LCH = Lab_to_LCH(Lab);
  const l = LCH[0];
  let c = LCH[1];
  const h = LCH[2];

  if (is_LCH_inside_sRGB(l, c, h)) {
    return Lab;
  }

  let hiC = c;
  let loC = 0;
  c /= 2;

  while (hiC - loC > ε) {
    if (is_LCH_inside_sRGB(l, c, h)) {
      loC = c;
    } else {
      hiC = c;
    }
    c = (hiC + loC) / 2;
  }

  return LCH_to_Lab([l, c, h]);
}
