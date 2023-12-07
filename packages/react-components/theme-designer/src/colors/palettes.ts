/* eslint-disable @typescript-eslint/naming-convention */
import { LAB_to_sRGB, LCH_to_Lab, Lab_to_LCH, sRGB_to_LCH, snap_into_gamut } from './csswg';
import { getPointsOnCurvePath } from './geometry';
import { CurvedHelixPath, Palette, Vec3 } from './types';

// This file contains functions that combine geometry and color math to create
// and work with palette curves.

/**
 * When distributing output shades along the curve, for each shade’s lightness a
 * logarithmically distributed value is averaged with a linearly distributed
 * value to this degree between zero and one, zero meaning use the logarithmic
 * value, one meaning use the linear value.
 */
const defaultLinearity = 0.75;

function getLinearSpace(min: number, max: number, n: number) {
  const result = [];
  const delta = (max - min) / n;
  for (let i = 0; i < n; i++) {
    result[i] = min + delta * i;
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
  range = [0, 100],
  linearity = defaultLinearity,
): Vec3[] {
  if (curvePoints.length <= 2) {
    return [];
  }

  const paletteShades = [];

  const logLightness = getLogSpace(Math.log10(range[0]), Math.log10(range[1]), nShades);

  const linearLightness = getLinearSpace(range[0], range[1], nShades);

  let c = 0;

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
  curve: CurvedHelixPath,
  nShades = 16,
  range = [0, 100],
  linearity = defaultLinearity,
  curveDepth = 24,
): Vec3[] {
  return paletteShadesFromCurvePoints(
    getPointsOnCurvePath(
      curve,
      Math.ceil((curveDepth * (1 + Math.abs(curve.torsion || 1))) / 2),
    ).map((curvePoint: Vec3) => getPointOnHelix(curvePoint, curve.torsion, curve.torsionT0)),
    nShades,
    range,
    linearity,
  );
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

export function cssGradientFromCurve(
  curve: CurvedHelixPath,
  nShades = 16,
  range = [0, 100],
  linearity = defaultLinearity,
  curveDepth = 24,
) {
  const hexes = paletteShadesToHex(paletteShadesFromCurve(curve, nShades, range, linearity, curveDepth));
  return `linear-gradient(to right, ${hexes.join(', ')})`;
}

export function hexColorsFromPalette(
  palette: Palette,
  nShades = 16,
  range = [0, 100],
  linearity = defaultLinearity,
  curveDepth = 24,
): string[] {
  return paletteShadesToHex(
    paletteShadesFromCurve(curvePathFromPalette(palette), nShades, range, linearity, curveDepth),
  );
}
