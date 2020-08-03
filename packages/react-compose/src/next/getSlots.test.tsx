import * as React from 'react';
import { getSlots } from './getSlots';
import { nullRender } from './nullRender';

describe('getSlots', () => {
  const Foo = () => <div />;

  it('renders nullRender for root if the as prop is not provided', () => {
    expect(getSlots({})).toEqual({
      slots: { root: nullRender },
      slotProps: { root: {} },
    });
  });

  it('renders root as a span with no props', () => {
    expect(getSlots({ as: 'span' })).toEqual({
      slots: { root: 'span' },
      slotProps: { root: {} },
    });
  });

  it('omits props which are not valid for the element rendered', () => {
    expect(getSlots({ as: 'button', id: 'id', href: 'href' })).toEqual({
      slots: { root: 'button' },
      slotProps: { root: { id: 'id' } },
    });
  });

  it('renders root as an anchor, leaving the href intact', () => {
    expect(getSlots({ as: 'a', id: 'id', href: 'href' })).toEqual({
      slots: { root: 'a' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('renders root as a component, leaving the props intact minus the as prop', () => {
    expect(getSlots({ as: Foo, id: 'id', href: 'href', blah: 1 })).toEqual({
      slots: { root: Foo },
      slotProps: { root: { id: 'id', href: 'href', blah: 1 } },
    });
  });

  it('renders null for primitive slots with no children', () => {
    expect(getSlots({ as: 'div', icon: { as: 'span' } }, ['icon'])).toEqual({
      slots: { root: 'div', icon: nullRender },
      slotProps: { root: {} },
    });
  });

  it('renders a component slot with no children', () => {
    expect(getSlots({ as: 'div', icon: { as: Foo } }, ['icon'])).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: {} },
    });
  });

  it('renders slot as button and omits unsupported props (href)', () => {
    expect(
      getSlots({ as: 'div', icon: { as: 'button', id: 'id', href: 'href', children: 'children' } }, ['icon']),
    ).toEqual({
      slots: { root: 'div', icon: 'button' },
      slotProps: { root: {}, icon: { id: 'id', children: 'children' } },
    });
  });

  it('renders slot as anchor and includes supported props (href)', () => {
    expect(getSlots({ as: 'div', icon: { as: 'a', id: 'id', href: 'href', children: 'children' } }, ['icon'])).toEqual({
      slots: { root: 'div', icon: 'a' },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', children: 'children' } },
    });
  });

  it('renders a component and includes all props minus as prop', () => {
    expect(
      getSlots({ as: 'div', icon: { as: Foo, id: 'id', href: 'href', blah: 1, children: 'children' } }, ['icon']),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', blah: 1, children: 'children' } },
    });
  });
});
