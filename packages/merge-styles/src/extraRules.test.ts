import { extractRules } from './extractRules';

describe('extractRules', () => {
  it('handles an empty argument list', () => {
    const rules = extractRules([]);
    expect(rules).toEqual({ __order: ['&'], '&': {} });
  });
});
