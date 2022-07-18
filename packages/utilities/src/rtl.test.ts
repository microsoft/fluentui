export {};

describe('rtl', () => {
  const { getRTL, setRTL } = require('./rtl');

  it('can set and get the rtl setting on the server', () => {
    setRTL(true);
    expect(getRTL()).toEqual(true);

    setRTL(false);
    expect(getRTL()).toEqual(false);
  });
});

describe('getRTL', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let RTL: any;

  beforeEach(() => {
    // Make use of resetModules and require to reset the internal state of rtl module.
    // At time of writing we need to do this to force private _isRTL to be undefined so that module
    // reads dir attributes from the document object.
    jest.resetModules();
    RTL = require('./rtl');
    document.documentElement.removeAttribute('dir');
    document.body.removeAttribute('dir');
  });

  it('defaults to false with no dir attributes', () => {
    expect(RTL.getRTL()).toBe(false);
  });

  it('reads ltr dir attribute from documentElement', () => {
    document.documentElement.setAttribute('dir', 'ltr');
    expect(RTL.getRTL()).toBe(false);
  });

  it('reads rtl dir attribute from documentElement', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    expect(RTL.getRTL()).toBe(true);
  });

  it('reads rtl dir attribute from body with higher priority than documentElement', () => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.setAttribute('dir', 'rtl');
    expect(RTL.getRTL()).toBe(true);
  });

  it('reads ltr dir attribute from body with higher priority than documentElement', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.setAttribute('dir', 'ltr');
    expect(RTL.getRTL()).toBe(false);
  });

  it('falls back to ltr dir attribute on documentElement', () => {
    document.documentElement.setAttribute('dir', 'ltr');
    expect(RTL.getRTL()).toBe(false);
  });

  it('falls back to rtl dir attribute on documentElement', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    expect(RTL.getRTL()).toBe(true);
  });

  it('does not cause exception with null body element', () => {
    const DOM = require('./dom/getDocument');
    jest.spyOn(DOM, 'getDocument').mockImplementation(() => {
      return {
        documentElement: document.documentElement,
        body: null,
      };
    });

    document.documentElement.setAttribute('dir', 'rtl');
    expect(RTL.getRTL()).toBe(true);

    jest.restoreAllMocks();
  });

  describe('theme support', () => {
    it('returns document default (ltr) when called with no theme', () => {
      expect(RTL.getRTL()).toBeFalsy();
    });

    it('returns document default (ltr) when called theme not specifying direction', () => {
      const theme = {};
      expect(RTL.getRTL(theme)).toBeFalsy();
    });

    it('returns ltr when called theme specifying ltr', () => {
      const theme = { rtl: false };
      expect(RTL.getRTL(theme)).toBeFalsy();
    });

    it('returns rtl when called theme specifying rtl', () => {
      const theme = { rtl: true };
      expect(RTL.getRTL(theme)).toBeTruthy();
    });
  });
});
