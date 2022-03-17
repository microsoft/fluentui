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
});
