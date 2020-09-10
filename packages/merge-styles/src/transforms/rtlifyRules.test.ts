import { rtlifyRules } from './rtlifyRules';

describe('rtlifyRules', () => {
  it('can auto flip or avoid autoflipping with noflip', () => {
    [
      [
        ['left', '42'],
        ['right', '42'],
      ],
      [
        ['right', '42'],
        ['left', '42'],
      ],
      [
        ['float', 'left'],
        ['float', 'right'],
      ],
      [
        ['float', 'right'],
        ['float', 'left'],
      ],
      [
        ['clear', 'left'],
        ['clear', 'right'],
      ],
      [
        ['margin', '42'],
        ['margin', '42'],
      ],
      [
        ['margin', '1 2'],
        ['margin', '1 2'],
      ],
      [
        ['margin', '1 2 3'],
        ['margin', '1 2 3'],
      ],
      [
        ['margin', '1 2 3 4'],
        ['margin', '1 4 3 2'],
      ],
      [
        ['margin-left', '42'],
        ['margin-right', '42'],
      ],
      [
        ['margin-right', '42'],
        ['margin-left', '42'],
      ],
      [
        ['padding', '42'],
        ['padding', '42'],
      ],
      [
        ['padding', '1 2'],
        ['padding', '1 2'],
      ],
      [
        ['padding', '1 2 3'],
        ['padding', '1 2 3'],
      ],
      [
        ['padding', '1 2 3 4'],
        ['padding', '1 4 3 2'],
      ],
      [
        ['padding-left', '42'],
        ['padding-right', '42'],
      ],
      [
        ['padding-right', '42'],
        ['padding-left', '42'],
      ],
      [
        ['cursor', 'w-resize'],
        ['cursor', 'e-resize'],
      ],
      [
        ['cursor', 'sw-resize'],
        ['cursor', 'se-resize'],
      ],
      [
        ['cursor', 'nw-resize'],
        ['cursor', 'ne-resize'],
      ],
      [
        ['left', '42px /* @noflip */'],
        ['left', '42px'],
      ],
      [
        ['left', '42px @noflip'],
        ['left', '42px'],
      ],
      [
        ['left', '42px /*@noflip*/'],
        ['left', '42px'],
      ],
      [
        ['box-shadow', '42px 0 red'],
        ['box-shadow', '-42px 0 red'],
      ],
      [
        ['box-shadow', '-42px 0 red'],
        ['box-shadow', '42px 0 red'],
      ],
    ].forEach((test: string[][]) => {
      rtlifyRules({ rtl: true }, test[0], 0);
      expect(test[0]).toEqual(test[1]);
    });
  });

  it('does not flip an unflippable cursor', () => {
    const rules = ['cursor', 'hand'];

    rtlifyRules({ rtl: true }, rules, 0);

    expect(rules).toEqual(['cursor', 'hand']);
  });

  it('does not crash when name or value are not strings', () => {
    rtlifyRules({ rtl: true }, ['left', null] as any, 0);
    rtlifyRules({ rtl: true }, ['left', {}] as any, 0);
    rtlifyRules({ rtl: true }, [null, 'abc'] as any, 0);
  });
});
