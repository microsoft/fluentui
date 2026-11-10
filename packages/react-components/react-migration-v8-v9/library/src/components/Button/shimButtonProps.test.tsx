import { shimButtonProps } from './shimButtonProps';

describe('shimButtonProps', () => {
  it.each([
    { props: {}, expected: 'ms-Button--default' },
    { props: { primary: false }, expected: 'ms-Button--default' },
    { props: { primary: true }, expected: 'ms-Button--primary' },
    { props: { variantClassName: 'custom-variant' }, expected: 'custom-variant' },
    { props: { variantClassName: 'custom-variant', primary: false }, expected: 'custom-variant' },
    { props: { variantClassName: 'custom-variant', primary: true }, expected: 'custom-variant' },
    { props: { variantClassName: '' }, expected: '' },
    { props: { variantClassName: '', primary: true }, expected: '' },
  ])('maps $props to className "$expected"', ({ props, expected }) => {
    expect(shimButtonProps(props).className).toBe(expected);
  });

  it('preserves base, variant, and user class names in order', () => {
    const props = shimButtonProps({
      baseClassName: 'custom-base',
      variantClassName: 'ms-Button--action ms-Button--command',
      className: 'custom-user',
    });

    expect(props.className).toBe('custom-base ms-Button--action ms-Button--command custom-user');
  });

  it.each([undefined, false, true])('preserves appearance mapping for primary=%s', primary => {
    const props = shimButtonProps({ primary, variantClassName: 'custom-variant' });

    expect(props.appearance).toBe(primary ? 'primary' : undefined);
  });
});
