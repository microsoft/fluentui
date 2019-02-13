import { getRTL, setRTL, __testHooks } from './rtl';
import { setSSR } from './dom';

describe('rtl', () => {
  it('can set and get the rtl setting on the server', () => {
    setSSR(true);

    setRTL(true);
    expect(getRTL()).toEqual(true);

    setRTL(false);
    expect(getRTL()).toEqual(false);

    setSSR(false);
  });
});

describe('getRTL', () => {
  beforeEach(() => {
    __testHooks._clearRTL();
    document.documentElement.removeAttribute('dir');
    document.body.removeAttribute('dir');
  });

  it('defaults to false with no dir attributes', () => {
    expect(getRTL()).toBe(false);
  });

  it('reads ltr dir attribute from documentElement', () => {
    document.documentElement.setAttribute('dir', 'ltr');
    expect(getRTL()).toBe(false);
  });

  it('reads rtl dir attribute from documentElement', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    expect(getRTL()).toBe(true);
  });

  it('reads rtl dir attribute from body with higher priority than documentElement', () => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.setAttribute('dir', 'rtl');
    expect(getRTL()).toBe(true);
  });

  it('reads ltr dir attribute from body with higher priority than documentElement', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.setAttribute('dir', 'ltr');
    expect(getRTL()).toBe(false);
  });

  it('falls back to ltr dir attribute on documentElement', () => {
    document.documentElement.setAttribute('dir', 'ltr');
    expect(getRTL()).toBe(false);
  });

  it('falls back to rtl dir attribute on documentElement', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    expect(getRTL()).toBe(true);
  });
});
