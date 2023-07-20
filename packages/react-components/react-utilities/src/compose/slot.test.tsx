import * as React from 'react';
import { slot } from './slot';
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
    const resolvedProps = slot(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({
      children: 'hello',
      [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
    });
  });

  it('resolves a JSX element', () => {
    const props: TestProps = { slotA: <div>hello</div> };
    const resolvedProps = slot(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({
      children: <div>hello</div>,
      [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
    });
  });

  it('resolves a number', () => {
    const props: TestProps = { slotA: 42 };
    const resolvedProps = slot(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({
      children: 42,
      [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
    });
  });

  it('resolves an object as its copy', () => {
    const slotA = {};
    const props: TestProps = { slotA };
    const resolvedProps = slot(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({ [SLOT_ELEMENT_TYPE_SYMBOL]: 'div' });
    expect(resolvedProps).not.toBe(slotA);
  });

  it('resolves "null" without creating a child element', () => {
    const props: TestProps = { slotA: null, slotB: null };

    expect(slot(props.slotA, { elementType: 'div' })).toEqual(undefined);
    expect(slot(null, { renderByDefault: true, elementType: 'div' })).toEqual(undefined);
  });

  it('resolves undefined without creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    const resolvedProps = slot(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual(undefined);
  });

  it('resolves to empty object creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    const resolvedProps = slot(props.slotA, { renderByDefault: true, elementType: 'div' });

    expect(resolvedProps).toEqual({ [SLOT_ELEMENT_TYPE_SYMBOL]: 'div' });
  });

  it('handles render functions', () => {
    const props: TestProps = { slotA: { children: () => null } };
    const resolvedProps = slot(props.slotA, { elementType: 'div' });

    expect(resolvedProps).toEqual({
      [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
      [SLOT_RENDER_FUNCTION_SYMBOL]: expect.any(Function),
    });
  });
});
