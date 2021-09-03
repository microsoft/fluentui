import * as React from 'react';
import { getSlots } from './getSlots';
import { nullRender } from './nullRender';
import { ObjectShorthandProps, ElementShorthandProps } from './types';

describe('getSlots', () => {
  type FooProps = { id?: string; children?: React.ReactNode };
  const Foo = (props: FooProps) => <div />;

  it('returns div for root if the as prop is not provided', () => {
    type Slots = { root: ElementShorthandProps<'div'> };
    expect(
      getSlots<Slots>({ root: {} }),
    ).toEqual({
      slots: { root: 'div' },
      slotProps: { root: {} },
    });
  });

  it('returns root slot as a span with no props', () => {
    type Slots = { root: ElementShorthandProps<'span'> };
    expect(
      getSlots<Slots>({ root: { as: 'span' } }),
    ).toEqual({
      slots: { root: 'span' },
      slotProps: { root: {} },
    });
  });

  it('does not omit invalid props for the rendered element', () => {
    type Slots = { root: ElementShorthandProps<'button'> };
    const invalidProp = { href: 'href' } as React.ButtonHTMLAttributes<HTMLButtonElement>;
    expect(
      getSlots<Slots>({ root: { as: 'button', id: 'id', ...invalidProp } }),
    ).toEqual({
      slots: { root: 'button' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('returns root slot as an anchor, leaving the href intact', () => {
    type Slots = { root: ElementShorthandProps<'a'> };
    expect(
      getSlots<Slots>({ root: { as: 'a', id: 'id', href: 'href' } }),
    ).toEqual({
      slots: { root: 'a' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('returns a component slot with no children', () => {
    type Slots = {
      root: ElementShorthandProps<'div'>;
      icon: ObjectShorthandProps<FooProps>;
    };
    expect(
      getSlots<Slots>(
        {
          icon: {},
          components: { root: 'div', icon: Foo },
          root: { as: 'div' },
        },
        ['icon', 'root'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: {} },
    });
  });

  it('returns slot as button', () => {
    type Slots = {
      root: ElementShorthandProps<'div', 'span'>;
      icon: ElementShorthandProps<'button'>;
    };
    expect(
      getSlots<Slots>(
        {
          components: { icon: 'button', root: 'div' },
          root: { as: 'span' },
          icon: { id: 'id', children: 'children' },
        },
        ['icon', 'root'],
      ),
    ).toEqual({
      slots: { root: 'span', icon: 'button' },
      slotProps: { root: {}, icon: { id: 'id', children: 'children' } },
    });
  });

  it('returns slot as anchor and includes supported props (href)', () => {
    type Slots = {
      root: ElementShorthandProps<'div'>;
      icon: ElementShorthandProps<'a'>;
    };
    expect(
      getSlots<Slots>(
        {
          root: { as: 'div' },
          components: { root: 'div', icon: 'a' },
          icon: { id: 'id', href: 'href', children: 'children' },
        },
        ['icon', 'root'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: 'a' },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', children: 'children' } },
    });
  });

  it('returns a component and includes all props', () => {
    type Slots = {
      root: ElementShorthandProps<'div'>;
      icon: ElementShorthandProps<'a'> | ObjectShorthandProps<FooProps>;
    };
    expect(
      getSlots<Slots>(
        {
          components: { root: 'div', icon: Foo },
          root: { as: 'div' },
          icon: { id: 'id', href: 'href', children: 'children' },
        },
        ['icon', 'root'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', children: 'children' } },
    });
  });

  it('can use slot children functions to replace default slot rendering', () => {
    type Slots = {
      root: ElementShorthandProps<'div'>;
      icon: ElementShorthandProps<'a'>;
    };
    expect(
      getSlots<Slots>(
        {
          components: { root: 'div', icon: Foo },
          root: { as: 'div' },
          icon: { id: 'bar', children: (C: React.ElementType, p: {}) => <C {...p} /> },
        },
        ['icon', 'root'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: React.Fragment },
      slotProps: { root: {}, icon: { children: <Foo id="bar" /> } },
    });
  });

  it('can render a primitive input with no children', () => {
    type Slots = {
      root: ElementShorthandProps<'div'>;
      input: ElementShorthandProps<'input'>;
      icon?: ElementShorthandProps<'a'>;
    };
    expect(
      getSlots<Slots>(
        {
          root: { as: 'div' },
          components: { root: 'div', input: 'input', icon: 'a' },
          input: {},
          icon: undefined,
        },
        ['input', 'root', 'icon'],
      ),
    ).toEqual({
      slots: { root: 'div', input: 'input', icon: nullRender },
      slotProps: { root: {}, input: {}, icon: undefined },
    });
  });

  it('should use `div` as default root element', () => {
    expect(getSlots({ icon: { children: 'foo' }, root: {} }, ['icon', 'root'])).toEqual({
      slots: { root: 'div', icon: 'div' },
      slotProps: { root: {}, icon: { children: 'foo' } },
    });
  });
});
