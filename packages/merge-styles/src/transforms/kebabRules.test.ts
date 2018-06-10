import { kebabRules } from './kebabRules';

describe('kebabRules', () => {

  it('can kebab the names', () => {
    const rules = [
      'backgroundColor',
      '#cAcAcA'
    ];

    kebabRules(rules, 0);

    expect(rules).toEqual([
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

    expect(rules).toEqual([
      '-webkit-font-smoothing',
      'antialiased'
    ]);
  });

});
