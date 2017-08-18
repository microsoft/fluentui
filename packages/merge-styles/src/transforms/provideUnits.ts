export function provideUnits(rulePairs: (string | number)[]): void {
  for (let i = 0; i < rulePairs.length; i += 2) {
    const name = rulePairs[i];
    const value = rulePairs[i + 1];
    if (
      name !== 'opacity' &&
      typeof value === 'number'
    ) {
      rulePairs[i + 1] = `${value}px`;
    }
  }
}
