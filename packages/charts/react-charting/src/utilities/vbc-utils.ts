import { IMargins } from './utilities';

export const getClosestPairDiffAndRange = (data: number[] | Date[]): [number, number] | undefined => {
  if (data.length < 2) {
    return;
  }
  data = data.sort((a, b) =>
    a instanceof Date ? (a as Date).getTime() - (b as Date).getTime() : (a as number) - (b as number),
  );
  let minDiff = Number.MAX_VALUE;
  for (let i = 1; i < data.length; i++) {
    const diff =
      data[i] instanceof Date
        ? (data[i] as Date).getTime() - (data[i - 1] as Date).getTime()
        : (data[i] as number) - (data[i - 1] as number);
    minDiff = Math.min(minDiff, diff);
  }
  const range =
    data[0] instanceof Date
      ? (data[data.length - 1] as Date).getTime() - (data[0] as Date).getTime()
      : (data[data.length - 1] as number) - (data[0] as number);
  return [minDiff, range];
};

export const calculateAppropriateBarWidth = (data: number[] | Date[], totalWidth: number, innerPadding: number) => {
  const result = getClosestPairDiffAndRange(data);
  if (!result || result[1] === 0) {
    return 16;
  }
  const [closestPairDiff, range] = result;
  // Refer to https://microsoft.github.io/fluentui-charting-contrib/docs/rfcs/fix-overlapping-bars-on-continuous-axes
  // for the derivation of the following formula.
  const barWidth = Math.floor(
    (totalWidth * closestPairDiff * (1 - innerPadding)) / (range + closestPairDiff * (1 - innerPadding)),
  );
  return barWidth;
};

/**
 * Calculates the total width available for rendering bars.
 */
export const calcTotalWidth = (containerWidth: number, margins: IMargins, extraMargin = 0): number => {
  return containerWidth - (margins.left || 0) - (margins.right || 0) - extraMargin * 2;
};

/**
 * Calculates the combined size of all bands and the gaps between them, in units relative to the bandwidth.
 */
export const calcTotalBandUnits = (numBands: number, innerPadding: number) => {
  // inner_padding = space_between_bands / (space_between_bands + bandwidth)
  // => space_between_bands = (inner_padding / (1 - inner_padding)) * bandwidth
  const gapToBandRatio = innerPadding / (1 - innerPadding);
  return numBands + (numBands - 1) * gapToBandRatio;
};

/**
 * Calculates the total width required to render all bands including the gaps between them.
 */
export const calcRequiredWidth = (bandwidth: number, numBands: number, innerPadding: number) => {
  return bandwidth * calcTotalBandUnits(numBands, innerPadding);
};

/**
 * Calculates the maximum possible bandwidth such that the combined widths of all bands
 * and the gaps between them exactly fill the total available width.
 */
export const calcBandwidth = (totalWidth: number, numBands: number, innerPadding: number) => {
  return totalWidth / calcTotalBandUnits(numBands, innerPadding);
};
