import { getRTL, setRTL } from './rtl';
import { setSSR } from './dom';

let { expect } = chai;

describe('rtl', () => {
  it('can set and get the rtl setting on the server', () => {
    setSSR(true);

    setRTL(true);
    expect(getRTL()).is.true;

    setRTL(false);
    expect(getRTL()).is.false;

    setSSR(false);
  });

  it('can throw when setting a value on the server without setRTL called', () => {
    setSSR(true);

    setRTL(undefined);
    expect(getRTL).throws();

    setSSR(false);
  });
});
