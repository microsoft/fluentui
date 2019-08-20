import { extractRules } from './extractRules';

describe('extractRules', () => {
  it('handles an empty argument list', () => {
    const rules = extractRules([]);
    expect(rules).toEqual({ __order: ['&'], '&': {} });
  });

  it('handles an empty argument list with a specified currentSelector', () => {
    const rules = extractRules([], { __order: [] }, '#');
    expect(rules).toEqual({ __order: ['#'], '#': {} });
  });

  it('handles a background style', () => {
    const rules = extractRules([{ background: '#fff' }]);
    expect(rules).toEqual({ __order: ['&'], '&': { background: '#fff' } });
  });

  it('handles a background style', () => {
    const rules = extractRules([{ background: '#fff', margin: '1' }]);
    expect(rules).toEqual({
      __order: ['&'],
      '&': { background: '#fff', marginBottom: '1', marginLeft: '1', marginRight: '1', marginTop: '1' }
    });
  });
});
