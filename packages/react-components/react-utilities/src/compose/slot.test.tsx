import * as React from 'react';
import * as slot from './slot';
import type { ComponentProps, Slot } from './types';
import { SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from './constants';

type TestSlots = {
  slotA?: Slot<'div'>;
  slotB?: Slot<'div'>;
  slotC?: Slot<'div'>;
};

type TestProps = ComponentProps<TestSlots> & {
  notASlot?: string;
  alsoNotASlot?: number;
};

describe('slot', () => {
  it('resolves a string', () => {
    const props: TestProps = { slotA: 'hello' };
    const resolvedProps = slot.optional(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({
      children: 'hello',
      [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
    });
  });

  it('resolves a JSX element', () => {
    const props: TestProps = { slotA: <div>hello</div> };
    const resolvedProps = slot.optional(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({
      children: <div>hello</div>,
      [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
    });
  });

  it('resolves a number', () => {
    const props: TestProps = { slotA: 42 };
    const resolvedProps = slot.optional(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({
      children: 42,
      [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
    });
  });

  it('resolves an object as its copy', () => {
    const slotA = {};
    const props: TestProps = { slotA };
    const resolvedProps = slot.optional(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({ [SLOT_ELEMENT_TYPE_SYMBOL]: 'div' });
    expect(resolvedProps).not.toBe(slotA);
  });

  it('resolves "null" without creating a child element', () => {
    const props: TestProps = { slotA: null, slotB: null };

    expect(slot.optional(props.slotA, { elementType: 'div' })).toEqual(undefined);
    expect(slot.optional(null, { renderByDefault: true, elementType: 'div' })).toEqual(undefined);
  });

  it('resolves undefined without creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    const resolvedProps = slot.optional(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual(undefined);
  });

  it('resolves to empty object creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    const resolvedProps = slot.optional(props.slotA, { renderByDefault: true, elementType: 'div' });

    expect(resolvedProps).toEqual({ [SLOT_ELEMENT_TYPE_SYMBOL]: 'div' });
  });

  it('handles render functions', () => {
    const props: TestProps = { slotA: { children: () => null } };
    const resolvedProps = slot.optional(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({
      [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
      [SLOT_RENDER_FUNCTION_SYMBOL]: expect.any(Function),
    });
  });
  describe('.resolveShorthand', () => {
    it('resolves a string', () => {
      expect(slot.resolveShorthand('hello')).toEqual({ children: 'hello' });
    });

    it('resolves a JSX element', () => {
      const jsx = <div>hello</div>;
      expect(slot.resolveShorthand(jsx)).toEqual({ children: jsx });
    });

    it('resolves a number', () => {
      expect(slot.resolveShorthand(42)).toEqual({ children: 42 });
    });
    it('resolves an array', () => {
      expect(slot.resolveShorthand([])).toEqual({ children: [] });
    });

    it('resolves an object as the same object', () => {
      const slotA = {};
      const resolvedProps = slot.resolveShorthand(slotA);
      expect(resolvedProps).toEqual({});
      expect(resolvedProps).toBe(slotA);
    });

    it('resolves "null" without creating a child element', () => {
      expect(slot.resolveShorthand(null)).toEqual(null);
    });

    it('resolves undefined without creating a child element', () => {
      expect(slot.resolveShorthand(undefined)).toEqual(undefined);
    });

    it('should console an error when a function is passed as value', () => {
      console.error = jest.fn();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fn: any = () => null;
      expect(slot.resolveShorthand(fn)).toBe(fn);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
