import { isRefObject } from '@fluentui/react-component-ref';

describe('isRefObject', () => {
  it('checks for a valid param', () => {
    expect(isRefObject(document.createElement('div'))).toBe(false);
    expect(isRefObject(null)).toBe(false);

    expect(isRefObject({ current: document.createElement('div') })).toBe(true);
    expect(isRefObject({ current: null })).toBe(true);
  });
});
