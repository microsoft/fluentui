import { mergeCss } from './mergeStyles';
import { Stylesheet, InjectionMode } from './Stylesheet';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('mergeStyles', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can register left when passed a standalone object', () => {
    mergeCss({ left: 10 });
    expect(_stylesheet.getRules()).toEqual('.css-0{left:10px;}');
  });

  it('can register left when passed an array of objects', () => {
    mergeCss([{ left: 10 }]);
    expect(_stylesheet.getRules()).toEqual('.css-0{left:10px;}');
  });

  it('can register left in rtl', () => {
    mergeCss({ left: 10 }, { rtl: true });
    expect(_stylesheet.getRules()).toEqual('.css-0{right:10px;}');
  });

  it('can re-register rules when rtl is flipped', () => {
    const result1 = mergeCss({ left: 10 }, {});
    expect(_stylesheet.getRules()).toEqual('.css-0{left:10px;}');
    expect(result1).toEqual('css-0');
    const result2 = mergeCss({ left: 10 }, { rtl: true });
    expect(_stylesheet.getRules()).toEqual('.css-0{left:10px;}.css-1{right:10px;}');
    expect(result2).toEqual('css-1');
  });
});
