const NON_PIXEL_NUMBER_PROPS = [
  'column-count',
  'font-weight',
  'flex',
  'flex-grow',
  'flex-shrink',
  'fill-opacity',
  'opacity',
  'order',
  'z-index',
  'zoom',
];

export function provideUnits(rulePairs: (string | number)[], index: number): void {
  const name = rulePairs[index] as string;
  const value = rulePairs[index + 1];

  if (typeof value === 'number') {
    const convertToPixel = NON_PIXEL_NUMBER_PROPS.indexOf(name as string) === -1 && name.indexOf('--') === -1;
    const unit = convertToPixel ? 'px' : '';

    rulePairs[index + 1] = `${value}${unit}`;
  }
}
