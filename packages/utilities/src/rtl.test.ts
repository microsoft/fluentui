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
  afterEach(() => {
    document.head.removeAttribute('dir');
    document.body.removeAttribute('dir');
  });

  it('defaults to false with no dir attributes', () => {
    expect(getDocumentRTL()).toBeFalsy();
  });

  it('reads dir attribute from head', () => {
    document.body.setAttribute('dir', 'ltr');
    expect(getDocumentRTL()).toBeFalsy();

    document.body.setAttribute('dir', 'rtl');
    expect(getDocumentRTL()).toBeTruthy();
  });

  it('reads dir attribute from head with higher priority than body', () => {
    document.head.setAttribute('dir', 'ltr');
    document.body.setAttribute('dir', 'rtl');
    expect(getDocumentRTL()).toBeFalsy();

    document.head.setAttribute('dir', 'rtl');
    document.body.setAttribute('dir', 'ltr');
    expect(getDocumentRTL()).toBeTruthy();
  });

  it('falls back to dir attribute on body', () => {
    document.body.setAttribute('dir', 'ltr');
    expect(getDocumentRTL()).toBeFalsy();

    document.body.setAttribute('dir', 'rtl');
    expect(getDocumentRTL()).toBeTruthy();
  });
});
