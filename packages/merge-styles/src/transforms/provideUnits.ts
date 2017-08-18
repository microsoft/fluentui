export function provideUnits(rulePairs: (string | number)[]): void {
  for (let i = 0; i < rulePairs.length; i += 2) {
    const value = rulePairs[i + 1];
    if (typeof value === 'number') {
      rulePairs[i + 1] = `${value}px`;
    }
  }
}
