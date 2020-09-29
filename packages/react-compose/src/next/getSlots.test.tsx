import * as React from 'react';
import { getSlots } from './getSlots';

describe('getSlots', () => {
  const Foo = (props: { id?: string }) => <div />;

  it('defaults the root slot to a div', () => {
    expect(getSlots({})).toEqual({
      slots: { root: 'div' },
      slotProps: { root: {} },
    });
  });

  it('can override the default root slot', () => {
    expect(getSlots({ as: 'span' })).toEqual({
      slots: { root: 'span' },
      slotProps: { root: {} },
    });
  });

  it('opts out of a slot if the component is null', () => {
    expect(getSlots({ components: { icon: null }, icon: { as: 'span' } }, ['icon'])).toEqual({
      slots: { root: 'div' },
      slotProps: { root: {} },
    });
  });

  it('opts out of a slot if the props[name] is null', () => {
    expect(getSlots({ components: { icon: 'span' }, icon: null }, ['icon'])).toEqual({
      slots: { root: 'div' },
      slotProps: { root: {} },
    });
  });

  it('omits props which are not valid for the element rendered', () => {
    expect(getSlots({ as: 'button', id: 'id', href: 'href' })).toEqual({
      slots: { root: 'button' },
      slotProps: { root: { id: 'id' } },
    });
  });

  it('returns `props.as` in `slots.root` and removes it from `slotProps.root`', () => {
    const defaultAs = getSlots({});
    expect(defaultAs.slots).toEqual({ root: 'div' });
    expect(defaultAs.slotProps).not.toHaveProperty('root.as');

    const literalAs = getSlots({ as: 'button' });
    expect(literalAs.slots).toEqual({ root: 'button' });
    expect(literalAs.slotProps).not.toHaveProperty('root.as');

    const FC = () => <div />;
    const componentAs = getSlots({ as: FC });
    expect(componentAs.slots).toEqual({ root: FC });
    expect(componentAs.slotProps).not.toHaveProperty('root.as');
  });

  it('does not omit props that are valid for the element rendered', () => {
    expect(getSlots({ as: 'a', id: 'id', href: 'href' })).toEqual({
      slots: { root: 'a' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('does not omit data-* props', () => {
    expect(getSlots({ as: 'button', id: 'id', 'data-href': 'href' })).toEqual({
      slots: { root: 'button' },
      slotProps: { root: { id: 'id', 'data-href': 'href' } },
    });
  });

  it('does not omit props when `as` is a component', () => {
    expect(getSlots({ as: Foo, id: 'id', href: 'href', blah: 1 })).toEqual({
      slots: { root: Foo },
      slotProps: { root: { id: 'id', href: 'href', blah: 1 } },
    });
  });

  it('includes slots when there are no children', () => {
    const { slots, slotProps } = getSlots({ as: 'div', components: { icon: 'span' } }, ['icon']);
    expect(slots).toEqual({ root: 'div', icon: 'span' });
    expect(slotProps).toEqual({ root: {}, icon: {} });
  });

  it('returns a component slot with no children', () => {
    expect(getSlots({ as: 'div', components: { icon: Foo } }, ['icon'])).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: {} },
    });
  });

  it('returns slot as button and omits unsupported props (href)', () => {
    expect(
      getSlots({ as: 'div', components: { icon: 'button' }, icon: { id: 'id', href: 'href', children: 'children' } }, [
        'icon',
      ]),
    ).toEqual({
      slots: { root: 'div', icon: 'button' },
      slotProps: { root: {}, icon: { id: 'id', children: 'children' } },
    });
  });

  it('returns slot as anchor and includes supported props (href)', () => {
    expect(
      getSlots({ as: 'div', components: { icon: 'a' }, icon: { id: 'id', href: 'href', children: 'children' } }, [
        'icon',
      ]),
    ).toEqual({
      slots: { root: 'div', icon: 'a' },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', children: 'children' } },
    });
  });

  it('returns a component and includes all props minus as prop', () => {
    expect(
      getSlots(
        { as: 'div', components: { icon: Foo }, icon: { id: 'id', href: 'href', blah: 1, children: 'children' } },
        ['icon'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', blah: 1, children: 'children' } },
    });
  });

  it('can use slot children functions to replace default slot rendering', () => {
    expect(
      getSlots(
        {
          as: 'div',
          components: { icon: Foo },
          icon: { id: 'bar', children: (C: React.ElementType, p: {}) => <C {...p} /> },
        },
        ['icon'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: React.Fragment },
      slotProps: { root: {}, icon: { children: <Foo id="bar" /> } },
    });
  });

  it('can render a primitive input with no children', () => {
    expect(
      getSlots(
        {
          components: { input: 'input' },
          input: { children: null },
        },
        ['input'],
      ),
    ).toEqual({
      slots: { root: 'div', input: 'input' },
      slotProps: { root: {}, input: { children: null } },
    });
  });
});
