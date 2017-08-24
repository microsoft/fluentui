const NON_PIXEL_NUMBER_PROPS = [
  'font-weight',
  'flex-grow',
  'flex-shrink',
  'opacity'
];

export function provideUnits(
  rulePairs: (string | number)[],
  index: number
): void {
  const name = rulePairs[index];
  const value = rulePairs[index + 1];

  if (
    typeof value === 'number' &&
    NON_PIXEL_NUMBER_PROPS.indexOf(name as string) === -1
  ) {
    rulePairs[index + 1] = `${value}px`;
  }
}
