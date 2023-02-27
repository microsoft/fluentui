import { getRTLSafeKey } from './getRTLSafeKey';

describe('getRTLSafeKey', () => {
  it('flips ArrowLeft when the page is rtl', () => {
    expect(getRTLSafeKey('ArrowLeft', 'rtl')).toEqual('ArrowRight');
  });

  it('does not flip ArrowLeft when the page is ltr', () => {
    expect(getRTLSafeKey('ArrowLeft', 'ltr')).toEqual('ArrowLeft');
  });

  it('flips ArrowRight when the page is rtl', () => {
    expect(getRTLSafeKey('ArrowRight', 'rtl')).toEqual('ArrowLeft');
  });

  it('does not flip ArrowRight when the page is ltr', () => {
    expect(getRTLSafeKey('ArrowRight', 'ltr')).toEqual('ArrowRight');
  });
});
