import * as React from 'react';
import { getSlots } from './getSlots';
import { nullRender } from './nullRender';
import { ComponentState, ObjectShorthandProps } from './types';

describe('getSlots', () => {
  const Foo = (props: { id?: string }) => <div />;

  it('returns div for root if the as prop is not provided', () => {
    expect(getSlots({ root: {} })).toEqual({
      slots: { root: 'div' },
      slotProps: { root: {} },
    });
  });

  it('returns root slot as a span with no props', () => {
    expect(getSlots({ root: { as: 'span' } } as ComponentState<{}>)).toEqual({
      slots: { root: 'span' },
      slotProps: { root: {} },
    });
  });

  it('does not omit invalid props for the rendered element', () => {
    expect(
      getSlots<{}>({ root: { as: 'button', id: 'id', href: 'href' } } as ComponentState<{}>),
    ).toEqual({
      slots: { root: 'button' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('returns root slot as an anchor, leaving the href intact', () => {
    expect(getSlots({ root: { as: 'a', id: 'id', href: 'href' } } as ComponentState<{}>)).toEqual({
      slots: { root: 'a' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('returns a component slot with no children', () => {
    type Slots = {
      root: ObjectShorthandProps<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
        HTMLElement,
        'div'
      >;
      icon: React.HTMLAttributes<HTMLElement>;
    };
    expect(
      getSlots<Slots>(
        {
          icon: {},
          components: { icon: Foo },
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
      root: ObjectShorthandProps<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
        HTMLElement,
        'span'
      >;
      icon: React.HTMLAttributes<HTMLElement>;
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
      root: ObjectShorthandProps<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
        HTMLElement,
        'div'
      >;
      icon: ObjectShorthandProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
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
      root: ObjectShorthandProps<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
        HTMLElement,
        'div'
      >;
      icon: ObjectShorthandProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    };
    expect(
      getSlots<Slots>(
        { components: { icon: Foo }, root: { as: 'div' }, icon: { id: 'id', href: 'href', children: 'children' } },
        ['icon', 'root'],
      ),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: { root: {}, icon: { id: 'id', href: 'href', children: 'children' } },
    });
  });

  it('can use slot children functions to replace default slot rendering', () => {
    type Slots = {
      root: ObjectShorthandProps<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
        HTMLElement,
        'div'
      >;
      icon: ObjectShorthandProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    };
    expect(
      getSlots<Slots>(
        {
          components: { icon: Foo },
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
      root: ObjectShorthandProps<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
        HTMLElement,
        'div'
      >;
      input: ObjectShorthandProps<React.InputHTMLAttributes<HTMLInputElement>>;
      icon?: ObjectShorthandProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    };
    expect(
      getSlots<Slots>(
        {
          root: { as: 'div' },
          components: { input: 'input' },
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
