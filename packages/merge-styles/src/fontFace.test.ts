import { fontFace } from './fontFace';
import { Stylesheet, InjectionMode } from './Stylesheet';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('fontFace', () => {
  it('can register a font face', () => {
    fontFace({
      fontFamily: 'Segoe UI',
      src: 'url("foo")',
    });
    expect(_stylesheet.getRules()).toEqual('@font-face{font-family:Segoe UI;src:url("foo");}');
  });

  it('caches font face definitions', () => {
    const definition = {
      fontFamily: 'Segoe UI',
      src: 'url("foo")',
    };
    fontFace(definition);
    fontFace(definition);
    fontFace(definition);

    expect(_stylesheet.getRules()).toEqual('@font-face{font-family:Segoe UI;src:url("foo");}');
  });

  it('escapes values that would terminate the style element', () => {
    _stylesheet.reset();
    fontFace({
      fontFamily: 'x</style><script>alert(1)</script>',
      src: 'url("foo")',
    });

    const rules = _stylesheet.getRules(true);

    expect(rules).not.toContain('</style');
    expect(rules).toContain('font-family:x\\3C /style\\3E ');
  });
});
