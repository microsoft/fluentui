import { provideUnits } from './provideUnits';

describe('provideUnits', () => {
  it('can provide units', () => {
    ['left', 'right', 'top', 'bottom', 'borderWidth'].forEach((property: string) => {
      const testSet: (string | number)[] = [property, 1];

      provideUnits(testSet, 0);

      expect(testSet).toEqual([property, '1px']);
    });
  });

  it('ignores css variables', () => {
    const testSet: (string | number)[] = ['--button-fontWeight', 600];

    provideUnits(testSet, 0);

    expect(testSet).toEqual(['--button-fontWeight', '600']);
  });

  it('can provide units for directional props', () => {
    ['padding', 'margin', 'border'].forEach((property: string) => {
      const testSet: (string | number)[] = [
        property,
        1,
        property + 'Left',
        1,
        property + 'Right',
        1,
        property + 'Top',
        1,
        property + 'Bottom',
        1,
      ];

      provideUnits(testSet, 0);
      provideUnits(testSet, 2);
      provideUnits(testSet, 4);
      provideUnits(testSet, 6);
      provideUnits(testSet, 8);

      expect(testSet).toEqual([
        property,
        '1px',
        property + 'Left',
        '1px',
        property + 'Right',
        '1px',
        property + 'Top',
        '1px',
        property + 'Bottom',
        '1px',
      ]);
    });
  });

  it('ignores opacity', () => {
    const testSet = ['opacity', 0];

    provideUnits(testSet, 0);

    expect(testSet).toEqual(['opacity', '0']);
  });
});
