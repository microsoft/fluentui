import { getRTL, setRTL } from './rtl';

let { expect } = chai;

describe('rtl', () => {
  it('can set and get the rtl setting on the server', () => {
    setRTL(true);
    expect(getRTL()).is.true;
    setRTL(false);
    expect(getRTL()).is.false;
  });

  it('can throw when setting a value on the server without setRTL called', () => {
    setRTL(undefined);
    expect(getRTL).to.throw;
  });
});
