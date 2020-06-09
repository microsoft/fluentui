import { InjectionMode, Stylesheet } from './Stylesheet';

import { styleToClassName } from './styleToClassName';

const _stylesheet: Stylesheet = Stylesheet.getInstance();
_stylesheet.setConfig({ injectionMode: InjectionMode.none, defaultPrefix: 'myCss' });

describe('Stylesheet', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('supports overriding the default prefix', () => {
    const className = styleToClassName({}, { background: 'red' });

    expect(className).toEqual('myCss-0');
    expect(_stylesheet.getRules()).toEqual('.myCss-0{background:red;}');
  });

  it('recreates a new instance when global mismatches', () => {
    const originalStylesheet = Stylesheet.getInstance();

    expect(Stylesheet.getInstance()).toBe(originalStylesheet);

    // tslint:disable-next-line:no-any
    (originalStylesheet as any)._lastStyleElement = { ownerDocument: {} };

    expect(Stylesheet.getInstance()).not.toBe(originalStylesheet);
  });
});
