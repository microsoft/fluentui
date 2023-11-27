import { toMountNodeProps } from './toMountNodeProps';

describe('toMountNodeProps', () => {
  it('handles HTMLElement', () => {
    const element = document.createElement('div');

    expect(toMountNodeProps(element)).toEqual({ element });
  });

  it('handles "null"', () => {
    expect(toMountNodeProps(null)).toEqual({
      element: null,
    });
  });

  it('handles "undefined"', () => {
    expect(toMountNodeProps(undefined)).toEqual({});
  });

  it('handles objects', () => {
    const element = document.createElement('div');

    expect(toMountNodeProps({ element })).toEqual({
      element,
    });
    expect(toMountNodeProps({ element, className: 'foo' })).toEqual({
      element,
      className: 'foo',
    });
  });
});
