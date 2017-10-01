const NON_PIXEL_NUMBER_PROPS = [
  'column-count',
  'font-weight',
  'flex-basis',
  'flex',
  'flex-grow',
  'flex-shrink',
  'opacity',
  'order',
  'z-index',
  'zoom'
];

export function provideUnits(rulePairs: (string | number)[], index: number): void {
  const name = rulePairs[index];
  const value = rulePairs[index + 1];

  if (typeof value === 'number' && NON_PIXEL_NUMBER_PROPS.indexOf(name as string) === -1) {
    rulePairs[index + 1] = `${value}px`;
  }
}
