import { fontFace } from './fontFace';
import {
  Stylesheet,
  InjectionMode
} from './Stylesheet';

const { expect } = chai;
const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('fontFace', () => {
  it('can register a font face', () => {
    fontFace({
      fontFamily: 'Segoe UI',
      src: 'url("foo")'
    });
    expect(_stylesheet.getRules()).equals('@font-face{font-family:Segoe UI;src:url("foo");}');
  });
});