import { getRTL, setRTL } from './rtl';
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
