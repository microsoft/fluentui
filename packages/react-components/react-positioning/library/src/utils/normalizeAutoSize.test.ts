import { normalizeAutoSize } from './normalizeAutoSize';

describe('normalizeAutoSize', () => {
  const cases = [
    [
      'always',
      {
        applyMaxWidth: true,
        applyMaxHeight: true,
      },
    ],
    [
      true,
      {
        applyMaxWidth: true,
        applyMaxHeight: true,
      },
    ],
    [
      'width-always',
      {
        applyMaxWidth: true,
        applyMaxHeight: false,
      },
    ],
    [
      'width',
      {
        applyMaxWidth: true,
        applyMaxHeight: false,
      },
    ],
    [
      'height-always',
      {
        applyMaxWidth: false,
        applyMaxHeight: true,
      },
    ],
    [
      'height',
      {
        applyMaxWidth: false,
        applyMaxHeight: true,
      },
    ],
    [false, false],
  ] as const;

  it.each(cases)('should normalize autoSize', (rawAutoSize, normalizedAutoSize) => {
    expect(normalizeAutoSize(rawAutoSize)).toEqual(normalizedAutoSize);
  });
});
