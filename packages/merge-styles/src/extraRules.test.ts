import { extractRules, handleSelectors, extractRulesFromObject } from './extractRules';
import { Stylesheet, InjectionMode } from './Stylesheet';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('extractRules', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

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
    const rules = extractRules([{ background: '#fff', margin: '2' }]);
    expect(rules).toEqual({
      __order: ['&'],
      '&': { background: '#fff', marginBottom: '2', marginLeft: '2', marginRight: '2', marginTop: '2' }
    });
  });

  it('handles a background style', () => {
    const rules = extractRules([{ displayName: 'a' }, [{ selectors: { ':hover $b': { background: 'green' } } }]]);
    expect(rules).toEqual({ __order: ['&', '&:hover $b'], '&': { displayName: 'a' }, '&:hover $b': { background: 'green' } });
  });

  describe('handleSelectors', () => {
    it('does not modify rules when no selectors are specified', () => {
      const rules = { __order: [] };
      handleSelectors({ background: 'green' }, '&', rules);
      expect(rules).toEqual({ __order: [] });
    });

    it('does modifies rules when a selectors are specified', () => {
      const rules = { __order: [] };
      handleSelectors({ selectors: { ':hover $b': { background: 'green' } } }, '&', rules);
      expect(rules).toEqual({ __order: ['&:hover $b'], '&:hover $b': { background: 'green' } });
    });
  });

  it('modifies rules when selector is a string', () => {
    _stylesheet.cacheClassName('foo', 'foo', [{ background: '#ddd' }], []);
    const rules = extractRules(['foo']);
    expect(rules).toEqual({ __order: ['&'], '&': { background: '#ddd' } });
  });

  it('modifies rules when selector is a string', () => {
    const rules = {};
    extractRulesFromObject({ background: 'green' }, { __order: [] }, rules, ':hover $b');
    expect(rules).toEqual({ background: 'green' });
  });

  it('modifies rules when a string and object are passed', () => {
    _stylesheet.cacheClassName('foo', 'foo', [{ background: '#eee' }], []);
    const rules = extractRules(['foo', { color: '#aaa' }]);
    expect(rules).toEqual({ __order: ['&'], '&': { background: '#eee', color: '#aaa' } });
  });

  it('modifies rules when several classes are specified', () => {
    _stylesheet.cacheClassName('foo', 'foo', [{ background: '#eee' }], []);
    _stylesheet.cacheClassName('bar', 'bar', [{ marginRight: '42' }], []);
    const rules = extractRules(['foo', 'bar']);
    expect(rules).toEqual({ __order: ['&'], '&': { background: '#eee', marginRight: '42' } });
  });
});
