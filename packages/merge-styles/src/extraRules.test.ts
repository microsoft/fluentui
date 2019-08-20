import { extractRules } from './extractRules';
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
    console.log(rules);
    expect(rules).toEqual({ __order: ['&', '&:hover $b'], '&': { displayName: 'a' }, '&:hover $b': { background: 'green' } });
  });
});
