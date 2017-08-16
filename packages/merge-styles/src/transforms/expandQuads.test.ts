import { expandQuads } from './expandQuads';

import { expect } from 'chai';

describe('expandQuads', () => {
  it('can expand margins and paddings', () => {
    let rules = ['margin', '0px 1px 2px 3px'];

    expandQuads(rules);

    expect(rules).eqls([
      'marginTop',
      '0px',
      'marginRight',
      '1px',
      'marginBottom',
      '2px',
      'marginLeft',
      '3px'
    ]);

    rules = ['padding', '0px 1px 2px 3px'];

    expandQuads(rules);

    expect(rules).eqls([
      'paddingTop',
      '0px',
      'paddingRight',
      '1px',
      'paddingBottom',
      '2px',
      'paddingLeft',
      '3px'
    ]);
  });
});
