import * as React from 'react';
import { getSlots } from './getSlots';
import { nullRender } from './nullRender';
import type { ComponentState } from './types';

describe('getSlots', () => {
  const Foo = (props: { id?: string }) => <div />;
  const FooForward = React.forwardRef((props: { id?: string }, ref) => <div />);

  it('returns div for root if the as prop is not provided', () => {
    expect(getSlots({})).toEqual({
      slots: { root: 'div' },
      slotProps: { root: {} },
    });
  });

  it('returns root slot as a span with no props', () => {
    expect(getSlots({ as: 'span' } as ComponentState)).toEqual({
      slots: { root: 'span' },
      slotProps: { root: {} },
    });
  });

  it('omits invalid props for the rendered element', () => {
    expect(
      getSlots<{}>({ as: 'button', id: 'id', href: 'href' } as ComponentState),
    ).toEqual({
      slots: { root: 'button' },
      slotProps: { root: { id: 'id' } },
    });
  });

  it('returns root slot as an anchor, leaving the href intact', () => {
    expect(getSlots({ as: 'a', id: 'id', href: 'href' } as ComponentState)).toEqual({
      slots: { root: 'a' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('retains all props but components, when root is a component,', () => {
    expect(
      getSlots({ as: 'div', id: 'id', href: 'href', blah: 1, components: { root: FooForward } } as ComponentState),
    ).toEqual({
      slots: { root: FooForward },
      slotProps: { root: { as: 'div', id: 'id', href: 'href', blah: 1 } },
    });
  });

  it('returns null for undefined slots', () => {
    expect(
      getSlots(
        {
          as: 'div',
          icon: undefined,
        },
        ['icon'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: nullRender },
      slotProps: { root: {} },
    });
  });

  it('returns a component slot with no children', () => {
    type ShorthandProps = {
      icon: React.HTMLAttributes<HTMLElement>;
    };
    expect(
      getSlots<ShorthandProps>({ as: 'div', icon: {}, components: { icon: Foo } }, ['icon']),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: {} },
    });
  });

  it('returns slot as button', () => {
    type Slots = {
      icon: React.ButtonHTMLAttributes<HTMLElement>;
    };
    expect(
      getSlots<Slots>(
        {
          components: { icon: 'button', root: 'div' },
          as: 'span',
          icon: { id: 'id', children: 'children' },
        },
        ['icon'],
      ),
    ).toEqual({
      slots: { root: 'span', icon: 'button' },
      slotProps: { root: {}, icon: { id: 'id', children: 'children' } },
    });
  });

  it('returns slot as anchor and includes supported props (href)', () => {
    type Slots = {
      icon: React.AnchorHTMLAttributes<HTMLElement>;
    };
    expect(
      getSlots<Slots>(
        {
          as: 'div',
          components: { root: 'div', icon: 'a' },
          icon: { id: 'id', href: 'href', children: 'children' },
        },
        ['icon'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: 'a' },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', children: 'children' } },
    });
  });

  it('returns a component and includes all props', () => {
    type ShorthandProps = {
      icon: React.AnchorHTMLAttributes<HTMLElement>;
    };
    expect(
      getSlots<ShorthandProps>(
        { components: { icon: Foo }, as: 'div', icon: { id: 'id', href: 'href', children: 'children' } },
        ['icon'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', children: 'children' } },
    });
  });

  it('can use slot children functions to replace default slot rendering', () => {
    expect(
      getSlots(
        {
          components: { icon: Foo },
          as: 'div',
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
    type Slots = {
      input: React.AnchorHTMLAttributes<HTMLElement>;
    };
    expect(
      getSlots<Slots>({ as: 'div', components: { input: 'input' }, input: { children: null } }, ['input']),
    ).toEqual({
      slots: { root: 'div', input: 'input' },
      slotProps: { root: {}, input: { children: null } },
    });
  });

  it('should use `div` as default root element', () => {
    expect(getSlots({ icon: { children: 'foo' }, customProp: 'bar' }, ['icon'])).toEqual({
      slots: { root: 'div', icon: 'div' },
      slotProps: { root: {}, icon: { children: 'foo' } },
    });
  });
});
