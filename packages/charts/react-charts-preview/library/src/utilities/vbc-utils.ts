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

export const calculateAppropriateBarWidth = (data: number[] | Date[], totalWidth: number) => {
  const result = getClosestPairDiffAndRange(data);
  if (!result || result[1] === 0) {
    return 16;
  }
  const [closestPairDiff, range] = result;
  // Refer to https://microsoft.github.io/fluentui-charting-contrib/docs/rfcs/fix-overlapping-bars-on-continuous-axes
  // for the derivation of the following formula.
  const barWidth = Math.round((totalWidth * closestPairDiff) / (2 * range + closestPairDiff));
  return barWidth;
};
