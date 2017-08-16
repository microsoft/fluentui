import { provideUnits } from './provideUnits';

import { expect } from 'chai';

describe('provideUnits', () => {
  it('can provide units', () => {
    let propertiesToTest = [
      'left',
      'right',
      'top',
      'bottom',
      'borderWidth'
    ].forEach((property: string) => {
      let testSet: (string | number)[] = [property, 1];

      provideUnits(testSet);

      expect(testSet).eql([property, '1px']);
    });
  });

  it('can provide units for directional props', () => {
    let propertiesToTest = [
      'padding',
      'margin',
      'border'
    ].forEach((property: string) => {
      let testSet: (string | number)[] = [
        property, 1,
        property + 'Left', 1,
        property + 'Right', 1,
        property + 'Top', 1,
        property + 'Bottom', 1
      ];

      provideUnits(testSet);

      expect(testSet).eql([
        property, '1px',
        property + 'Left', '1px',
        property + 'Right', '1px',
        property + 'Top', '1px',
        property + 'Bottom', '1px'
      ]);
    });

  });
});