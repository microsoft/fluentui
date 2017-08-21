import { kebabRules } from './kebabRules';
import { expect } from 'chai';

describe('kebabRules', () => {

  it('can kebab the names', () => {
    const rules = [
      'backgroundColor',
      '#cAcAcA'
    ];

    kebabRules(rules, 0);

    expect(rules).eqls([
      'background-color',
      '#cAcAcA'
    ]);
  });

  it('can kebab webkit prefix', () => {
    const rules = [
      'WebkitFontSmoothing',
      'antialiased'
    ];

    kebabRules(rules, 0);

    expect(rules).eqls([
      '-webkit-font-smoothing',
      'antialiased'
    ]);
  });

});
