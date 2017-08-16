import { setRTL } from '@uifabric/utilities/lib/rtl';
import { rtlifyRules } from './rtlifyRules';

let { expect } = chai;

describe('rtlifyRules', () => {

  before(() => {
    setRTL(true);
  });

  after(() => {
    setRTL(false);
  });

  it('can auto flip or avoid autoflipping with noflip', () => {
    [
      [['left', '42'], ['right', '42']],
      [['right', '42'], ['left', '42']],
      [['float', 'left'], ['float', 'right']],
      [['float', 'right'], ['float', 'left']],
      [['clear', 'left'], ['clear', 'right']],
      [['margin', '42'], ['margin', '42']],
      [['margin', '1 2'], ['margin', '1 2']],
      [['margin', '1 2 3'], ['margin', '1 2 3']],
      [['margin', '1 2 3 4'], ['margin', '1 4 3 2']],
      [['marginLeft', '42'], ['marginRight', '42']],
      [['marginRight', '42'], ['marginLeft', '42']],
      [['padding', '42'], ['padding', '42']],
      [['padding', '1 2'], ['padding', '1 2']],
      [['padding', '1 2 3'], ['padding', '1 2 3']],
      [['padding', '1 2 3 4'], ['padding', '1 4 3 2']],
      [['paddingLeft', '42'], ['paddingRight', '42']],
      [['paddingRight', '42'], ['paddingLeft', '42']],
      [['cursor', 'w-resize'], ['cursor', 'e-resize']],
      [['cursor', 'sw-resize'], ['cursor', 'se-resize']],
      [['cursor', 'nw-resize'], ['cursor', 'ne-resize']],
      [['left', '42px /*noflip*/'], ['left', '42px /*noflip*/']],
      [['boxShadow', '42px 0 red'], ['boxShadow', '-42px 0 red']],
      [['boxShadow', '-42px 0 red'], ['boxShadow', '42px 0 red']]
    ].forEach((test: string[][]) => expect(rtlifyRules(test[0])).eqls(test[1]));
  });

  it('does not flip an unflippable cursor', () => {
    let rules = ['cursor', 'hand'];

    expect(rtlifyRules(rules)).eqls(['cursor', 'hand']);
  });

});
