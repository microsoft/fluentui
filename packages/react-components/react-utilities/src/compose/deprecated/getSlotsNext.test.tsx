import * as React from 'react';
import { getSlotsNext } from './getSlotsNext';
import type { ExtractSlotProps, Slot, SlotComponentType, UnknownSlotProps } from '../types';
import { resolveShorthand } from './resolveShorthand';
import { SLOT_RENDER_FUNCTION_SYMBOL } from '../constants';

const resolveShorthandMock = <Props extends UnknownSlotProps>(props: Props): SlotComponentType<Props> => {
  // casting is required here as SlotComponent is a callable
  return { ...props } as SlotComponentType<Props>;
};

describe('getSlotsNext', () => {
  type FooProps = { id?: string; children?: React.ReactNode };
  const Foo = (props: FooProps) => <div />;

  it('returns provided component type for root if the as prop is not provided', () => {
    type Slots = { root: Slot<'div'> };
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({}),
        components: { root: 'div' },
      }),
    ).toEqual({
      slots: { root: 'div' },
      slotProps: { root: {} },
    });
  });

  it('returns root slot as a span with no props', () => {
    type Slots = { root: Slot<'div', 'span'> };
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'span' }),
        components: { root: 'div' },
      }),
    ).toEqual({
      slots: { root: 'span' },
      slotProps: { root: {} },
    });
  });

  it('does not omit invalid props for the rendered element', () => {
    type Slots = { root: Slot<'button'> };
    const invalidProp = { href: 'href' } as React.ButtonHTMLAttributes<HTMLButtonElement>;
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'button', id: 'id', ...invalidProp }),
        components: { root: 'button' },
      }),
    ).toEqual({
      slots: { root: 'button' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('returns root slot as an anchor, leaving the href intact', () => {
    type Slots = { root: Slot<'a'> };
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'a', id: 'id', href: 'href' }),
        components: { root: 'a' },
      }),
    ).toEqual({
      slots: { root: 'a' },
      slotProps: { root: { id: 'id', href: 'href' } },
    });
  });

  it('returns a component slot with no children', () => {
    type Slots = {
      root: Slot<'div'>;
      icon: Slot<typeof Foo>;
    };
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        icon: resolveShorthandMock<ExtractSlotProps<Slots['icon']>>({}),
        components: { root: 'div', icon: Foo },
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'div' }),
      }),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: {
        root: {},
        icon: {},
      },
    });
  });

  it('returns slot as button', () => {
    type Slots = {
      root: Slot<'div', 'span'>;
      icon: Slot<'button'>;
    };
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        components: { icon: 'button', root: 'div' },
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'span' }),
        icon: resolveShorthandMock<ExtractSlotProps<Slots['icon']>>({ id: 'id', children: 'children' }),
      }),
    ).toEqual({
      slots: { root: 'span', icon: 'button' },
      slotProps: {
        root: {},
        icon: { id: 'id', children: 'children' },
      },
    });
  });

  it('returns slot as anchor and includes supported props (href)', () => {
    type Slots = {
      root: Slot<'div'>;
      icon: Slot<'a'>;
    };
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'div' }),
        components: { root: 'div', icon: 'a' },
        icon: resolveShorthandMock<ExtractSlotProps<Slots['icon']>>({ id: 'id', href: 'href', children: 'children' }),
      }),
    ).toEqual({
      slots: { root: 'div', icon: 'a' },
      slotProps: {
        root: {},
        icon: {
          id: 'id',
          href: 'href',
          children: 'children',
        },
      },
    });
  });

  it('returns a component and includes all props', () => {
    type Slots = {
      root: Slot<'div'>;
      icon: Slot<'a'> | Slot<typeof Foo>;
    };
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        components: { root: 'div', icon: Foo },
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'div' }),
        icon: resolveShorthandMock<ExtractSlotProps<Slots['icon']>>({ id: 'id', href: 'href', children: 'children' }),
      }),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: {
        root: {},
        icon: {
          id: 'id',
          href: 'href',
          children: 'children',
        },
      },
    });
  });

  it('slot children functions should just pass functions forward', () => {
    type Slots = {
      root: Slot<'div'>;
      icon: Slot<'a'>;
    };
    const renderIcon = (C: React.ElementType, p: {}) => <C {...p} />;
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        components: { root: 'div', icon: Foo },
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'div' }),
        icon: resolveShorthandMock<ExtractSlotProps<Slots['icon']>>({ id: 'bar', children: renderIcon }),
      }),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: {
        root: {},
        icon: { id: 'bar', children: renderIcon },
      },
    });
  });

  it('can use slot children functions from resolveShorthand to replace default slot rendering', () => {
    type Slots = {
      root: Slot<'div'>;
      icon?: Slot<'a'>;
    };
    const renderFunction = (C: React.ElementType, p: {}) => <C {...p} />;
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        components: { root: 'div', icon: Foo },
        // eslint-disable-next-line deprecation/deprecation
        root: resolveShorthand<ExtractSlotProps<Slots['root']>>({ as: 'div' }, { required: true }),
        // eslint-disable-next-line deprecation/deprecation
        icon: resolveShorthand<ExtractSlotProps<Slots['icon']>>({ id: 'bar', children: renderFunction }),
      }),
    ).toEqual({
      slots: { root: 'div', icon: Foo },
      slotProps: {
        root: {},
        icon: {
          children: undefined,
          id: 'bar',
          [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction,
        },
      },
    });
  });

  it('can render a primitive input with no children', () => {
    type Slots = {
      root: Slot<'div'>;
      input: Slot<'input'>;
      icon?: Slot<'a'>;
    };
    expect(
      // eslint-disable-next-line deprecation/deprecation
      getSlotsNext<Slots>({
        root: resolveShorthandMock<ExtractSlotProps<Slots['root']>>({ as: 'div' }),
        components: { root: 'div', input: 'input', icon: 'a' },
        input: resolveShorthandMock<ExtractSlotProps<Slots['input']>>({}),
        icon: undefined,
      }),
    ).toEqual({
      slots: { root: 'div', input: 'input', icon: null },
      slotProps: {
        root: {},
        input: {},
        icon: undefined,
      },
    });
  });
});
