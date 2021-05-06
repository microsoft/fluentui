import { unstable_calculateAnimationTimeout as calculateAnimationTimeout } from '@fluentui/react-bindings';

describe('convertCssTimeToNumber', () => {
  test('converts "ms" values to number', () => {
    expect(calculateAnimationTimeout('200ms', '300ms')).toEqual(500);
  });

  test('converts "s" values to number', () => {
    expect(calculateAnimationTimeout('20s', '2s')).toEqual(22000);
  });

  test('converts decimal values to number', () => {
    expect(calculateAnimationTimeout('2.5s', '2s')).toEqual(4500);
  });

  test('converts other valid css values to 0', () => {
    expect(calculateAnimationTimeout('initial', '200ms')).toEqual(0);
    expect(calculateAnimationTimeout('inherit', '400ms')).toEqual(0);
  });

  test('converts invalid css values to 0', () => {
    expect(calculateAnimationTimeout('intial', undefined)).toEqual(0);
  });

  test('returns the duration if delay is not set', () => {
    expect(calculateAnimationTimeout('400ms')).toEqual(400);
    expect(calculateAnimationTimeout('2s')).toEqual(2000);
  });
});
