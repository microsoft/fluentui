import { getDocumentRTL, getRTL, setRTL } from './rtl';
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

describe('getDocumentRTL', () => {
  beforeEach(() => {
    document.head.removeAttribute('dir');
    document.body.removeAttribute('dir');
  });

  it('defaults to false with no dir attributes', () => {
    expect(getDocumentRTL()).toBe(false);
  });

  it('reads dir attribute from head', () => {
    document.head.setAttribute('dir', 'ltr');
    expect(getDocumentRTL()).toBe(false);

    document.head.setAttribute('dir', 'rtl');
    expect(getDocumentRTL()).toBe(true);
  });

  it('reads dir attribute from head with higher priority than body', () => {
    document.head.setAttribute('dir', 'ltr');
    document.body.setAttribute('dir', 'rtl');
    expect(getDocumentRTL()).toBe(false);

    document.head.setAttribute('dir', 'rtl');
    document.body.setAttribute('dir', 'ltr');
    expect(getDocumentRTL()).toBe(true);
  });

  it('falls back to dir attribute on body', () => {
    document.body.setAttribute('dir', 'ltr');
    expect(getDocumentRTL()).toBe(false);

    document.body.setAttribute('dir', 'rtl');
    expect(getDocumentRTL()).toBe(true);
  });
});
