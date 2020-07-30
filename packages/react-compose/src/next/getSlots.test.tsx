import { getSlots } from './getSlots';
import { nullRender } from './nullRender';

describe('getSlots', () => {
  it('can support getting the root slot', () => {
    expect(getSlots({})).toEqual({
      slots: { root: nullRender },
      slotProps: { root: {} },
    });

    expect(getSlots({ children: 'children' })).toEqual({
      slots: { root: nullRender },
      slotProps: { root: { children: 'children' } },
    });

    expect(getSlots({ as: 'span' })).toEqual({
      slots: { root: 'span' },
      slotProps: { root: {} },
    });

    expect(getSlots({ as: 'button', id: 'id', href: 'href' })).toEqual({
      slots: { root: 'button' },
      slotProps: { root: { id: 'id' } },
    });

    expect(getSlots({ as: 'a', id: 'id', href: 'href' })).toEqual({
      slots: { root: 'a' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('renders null for primitive slots with no children', () => {
    expect(getSlots({ as: 'div', icon: { as: 'span' } }, ['icon'])).toEqual({
      slots: { root: 'div', icon: nullRender },
      slotProps: { root: {} },
    });
  });

  it('renders component slots with no children', () => {
    const Foo = () => null;

    expect(getSlots({ as: 'div', icon: { as: Foo } }, ['icon'])).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: {} },
    });
  });

  it('renders a slot and omits unsupported props (href)', () => {
    expect(
      getSlots({ as: 'div', icon: { as: 'button', id: 'id', href: 'href', children: 'children' } }, ['icon']),
    ).toEqual({
      slots: { root: 'div', icon: 'button' },
      slotProps: { root: {}, icon: { id: 'id', children: 'children' } },
    });
  });

  it('renders a slot and includes supported props (href)', () => {
    expect(getSlots({ as: 'div', icon: { as: 'a', id: 'id', href: 'href', children: 'children' } }, ['icon'])).toEqual({
      slots: { root: 'div', icon: 'a' },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', children: 'children' } },
    });
  });
});
