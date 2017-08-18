export function provideUnits(
  rulePairs: (string | number)[],
  index: number
): void {
  const name = rulePairs[index];
  const value = rulePairs[index + 1];

  if (
    name !== 'opacity' &&
    typeof value === 'number'
  ) {
    rulePairs[index + 1] = `${value}px`;
  }
}
