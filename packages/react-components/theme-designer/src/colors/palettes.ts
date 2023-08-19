/* eslint-disable @typescript-eslint/naming-convention */
import { LAB_to_sRGB, LCH_to_Lab, Lab_to_LCH, sRGB_to_LCH, snap_into_gamut } from './csswg';
import { getPointsOnCurvePath } from './geometry';
import { CurvedHelixPath, Palette, Vec3 } from './types';
import { hueToSnappingPointsMap, hexToHue } from './hueMap';
// This file contains functions that combine geometry and color math to create
// and work with palette curves.

/**
 * When distributing output shades along the curve, for each shade’s lightness a
 * logarithmically distributed value is averaged with a linearly distributed
 * value to this degree between zero and one, zero meaning use the logarithmic
 * value, one meaning use the linear value.
 */
const defaultLinearity = 0.75;

const snappingPointsForKeyColor = (keyColor: string): number[] => {
  const hue = hexToHue(keyColor);
  const range = [
    hueToSnappingPointsMap[hue][0] * 100,
    hueToSnappingPointsMap[hue][1] * 100,
    hueToSnappingPointsMap[hue][2] * 100,
  ];
  return range;
};

const pointsForKeyColor = (keyColor: string, range: number[], centerPoint: number): number[] => {
  const hue = hexToHue(keyColor);
  const center = hueToSnappingPointsMap[hue][1] * 100;
  const linear = linearInterpolationThroughPoint(range[0], range[1], center, 16);
  return linear;
};

function linearInterpolationThroughPoint(start: number, end: number, inBetween: number, numSamples: number) {
  if (numSamples < 3) {
    throw new Error('Number of samples must be at least 3.');
  }

  // Find the ratio of the inBetween point
  const inBetweenRatio = (inBetween - start) / (end - start);

  // Calculate the index of the inBetween point in the resulting array
  const inBetweenIndex = Math.floor((numSamples - 1) * inBetweenRatio);

  // Initialize the output array
  const result = new Array(numSamples);

  // Set start, inBetween and end points in the result array
  result[0] = start;
  result[inBetweenIndex] = inBetween;
  result[numSamples - 1] = end;

  // Calculate the step size for each segment
  const stepBefore = (inBetween - start) / inBetweenIndex;
  const stepAfter = (end - inBetween) / (numSamples - 1 - inBetweenIndex);

  // Fill the array with interpolated values before the inBetween point
  for (let i = 1; i < inBetweenIndex; i++) {
    result[i] = start + i * stepBefore;
  }

  // Fill the array with interpolated values after the inBetween point
  for (let i = inBetweenIndex + 1; i < numSamples - 1; i++) {
    result[i] = inBetween + (i - inBetweenIndex) * stepAfter;
  }

  return result;
}

const getLogSpace = (min: number, max: number, n: number) => {
  const a = min <= 0 ? 0 : Math.log(min);
  const b = Math.log(max);
  const delta = (b - a) / n;

  const result = [Math.pow(Math.E, a)];
  for (let i = 1; i < n; i += 1) {
    result.push(Math.pow(Math.E, a + delta * i));
  }
  result.push(Math.pow(Math.E, b));
  return result;
};

function paletteShadesFromCurvePoints(
  curvePoints: Vec3[],
  nShades: number,
  linearity = defaultLinearity,
  keyColor: string,
): Vec3[] {
  if (curvePoints.length <= 2) {
    return [];
  }

  const snappingPoints = snappingPointsForKeyColor(keyColor);
  const paletteShades = [];
  const range = [snappingPoints[0], snappingPoints[2]];
  const logLightness = getLogSpace(Math.log10(0), Math.log10(100), nShades);
  const linearLightness = pointsForKeyColor(keyColor, range, snappingPoints[1]);
  let c = 0;

  // obtain 2d path thru color space to grab points from
  for (let i = 0; i < nShades; i++) {
    const l = Math.min(
      range[1],
      Math.max(range[0], logLightness[i] * (1 - linearity) + linearLightness[i] * linearity),
    );

    while (l > curvePoints[c + 1][0]) {
      c++;
    }

    const [l1, a1, b1] = curvePoints[c];
    const [l2, a2, b2] = curvePoints[c + 1];

    const u = (l - l1) / (l2 - l1);

    paletteShades[i] = [l1 + (l2 - l1) * u, a1 + (a2 - a1) * u, b1 + (b2 - b1) * u] as Vec3;
  }

  return paletteShades.map(snap_into_gamut);
}

export function paletteShadesFromCurve(
  keyColor: string,
  curve: CurvedHelixPath,
  nShades = 16,
  linearity = defaultLinearity,
  curveDepth = 24,
): Vec3[] {
  const points = getPointsOnCurvePath(curve, Math.ceil((curveDepth * (1 + Math.abs(curve.torsion || 1))) / 2)).map(
    (curvePoint: Vec3) => getPointOnHelix(curvePoint, curve.torsion, curve.torsionT0),
  );
  return paletteShadesFromCurvePoints(points, nShades, linearity, keyColor);
}

export function sRGB_to_hex(rgb: Vec3): string {
  return `#${rgb
    .map(x => {
      const channel = x < 0 ? 0 : Math.floor(x >= 1.0 ? 255 : x * 256);
      return channel.toString(16).padStart(2, '0');
    })
    .join('')}`;
}

export function Lab_to_hex(lab: Vec3): string {
  return sRGB_to_hex(LAB_to_sRGB(lab));
}

export function hex_to_sRGB(hex: string): Vec3 {
  const aRgbHex = hex.match(/#?(..)(..)(..)/);
  return aRgbHex
    ? [parseInt(aRgbHex[1], 16) / 255, parseInt(aRgbHex[2], 16) / 255, parseInt(aRgbHex[3], 16) / 255]
    : [0, 0, 0];
}

export function hex_to_LCH(hex: string): Vec3 {
  return sRGB_to_LCH(hex_to_sRGB(hex));
}

function paletteShadesToHex(paletteShades: Vec3[]): string[] {
  return paletteShades.map(Lab_to_hex);
}

function getPointOnHelix(pointOnCurve: Vec3, torsion = 0, torsionT0 = 50): Vec3 {
  const t = pointOnCurve[0];
  const [l, c, h] = Lab_to_LCH(pointOnCurve);
  const hueOffset = torsion * (t - torsionT0);
  return LCH_to_Lab([l, c, h + hueOffset]);
}

// function getPointOnCurvedHelixPathWithinGamut(curvedHelixPath: CurvedHelixPath, t: number): Vec3 {
//   return snap_into_gamut(
//     getPointOnHelix(getPointOnCurvePath(curvedHelixPath, t)!, curvedHelixPath.torsion, curvedHelixPath.torsionT0),
//   );
// }

export function curvePathFromPalette({ keyColor, darkCp, lightCp, hueTorsion }: Palette): CurvedHelixPath {
  const blackPosition = [0, 0, 0];
  const whitePosition = [100, 0, 0];
  const keyColorPosition = LCH_to_Lab(keyColor);
  const [l, a, b] = keyColorPosition;

  const darkControlPosition = [l * (1 - darkCp), a, b];
  const lightControlPosition = [l + (100 - l) * lightCp, a, b];

  return {
    curves: [
      { points: [blackPosition, darkControlPosition, keyColorPosition] },
      { points: [keyColorPosition, lightControlPosition, whitePosition] },
    ],
    torsion: hueTorsion,
    torsionT0: l,
  } as CurvedHelixPath;
}

export function hexColorsFromPalette(
  keyColor: string,
  palette: Palette,
  nShades = 16,
  linearity = defaultLinearity,
  curveDepth = 24,
): string[] {
  const curve = curvePathFromPalette(palette);
  const shades = paletteShadesFromCurve(keyColor, curve, nShades, linearity, curveDepth);
  return paletteShadesToHex(shades);
}
