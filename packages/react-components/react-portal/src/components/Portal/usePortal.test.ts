import { toMountNodeProps } from './usePortal';

describe('toMountNodeProps', () => {
  it('handles HTMLElement', () => {
    const element = document.createElement('div');

    expect(toMountNodeProps(element)).toMatchObject({
      element,
    });
  });

  it('handles "null"', () => {
    expect(toMountNodeProps(null)).toMatchObject({
      element: null,
    });
  });

  it('handles "undefined"', () => {
    expect(toMountNodeProps(null)).toMatchObject({});
  });

  it('handles objects', () => {
    const element = document.createElement('div');

    expect(toMountNodeProps({ element })).toMatchObject({
      element,
    });
    expect(toMountNodeProps({ element, className: 'foo' })).toMatchObject({
      element,
      className: 'foo',
    });
  });
});
