import * as slot from './slot';
import { isSlot } from './isSlot';
import { getSlotClassNameProp } from './getSlotClassNameProp';
import { assertSlots } from './assertSlots';
import { SLOT_CLASS_NAME_PROP_SYMBOL, SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from './constants';
import type { ComponentProps, ComponentState, Slot } from './types';

/**
 * F6 of the D14 state-mutation removal.
 *
 * Styles hooks no longer write onto the slot objects they are handed; they return copies built by
 * object spread (`{ ...state.slotA, className: clsx(...) }`). The compose machinery keeps its
 * per-slot metadata in SYMBOL-keyed properties, and everything downstream of a styles hook —
 * `isSlot`, `assertSlots`, `getSlotClassNameProp`, and the render pipeline's element-type and
 * render-function lookups — reads those symbols off the slot object it is given.
 *
 * Object spread copies own ENUMERABLE properties including symbol-keyed ones, so the metadata is
 * expected to survive. That is a guarantee about how `slot.always` / `slot.optional` build their
 * result (a plain object literal), not about the spread operator alone: if those factories ever
 * switch to `Object.defineProperty` with `enumerable: false`, or to a Proxy or class instance, the
 * spread silently drops the metadata and slots stop rendering as the right element. These tests are
 * the guard on that.
 *
 * Two shapes of this file are deliberate:
 *
 * - Slots are named `slotA` / `slotB`, not `root`. `ComponentProps` flattens the `root` slot's props
 *   to the top level, leaving no prop key to build a slot from — the same reason the sibling
 *   `assertSlots` and `getSlotClassNameProp` suites use these names.
 * - The metadata is read through `slotMetadata`. `ComponentState` types a slot as an `Omit<…>` that
 *   does not carry the symbol keys, so a state field cannot be symbol-indexed directly; the cast is
 *   what these tests are checking the RUNTIME shape of.
 *
 * Actually RENDERING a slot needs `@fluentui/react-jsx-runtime`, which depends on this package and
 * so cannot be imported here; the converted packages' own snapshot suites cover the render path end
 * to end.
 */
type TestSlots = {
  slotA: NonNullable<Slot<'div'>>;
  slotB?: Slot<'span'>;
};
type TestProps = ComponentProps<TestSlots>;
type TestState = ComponentState<TestSlots>;

const slotMetadata = (value: object | undefined) => value as Record<symbol, unknown> | undefined;

describe('slot metadata survives object spread (D14 F6)', () => {
  it('preserves the element-type and original-className symbols through a spread', () => {
    const rendered = slot.always({ className: 'consumer' } as NonNullable<TestProps['slotA']>, { elementType: 'div' });

    const spread = { ...rendered, className: 'composed consumer' };

    expect(Object.getOwnPropertySymbols(spread)).toEqual(
      expect.arrayContaining(Object.getOwnPropertySymbols(rendered)),
    );
    expect(spread[SLOT_ELEMENT_TYPE_SYMBOL]).toBe(rendered[SLOT_ELEMENT_TYPE_SYMBOL]);
    expect(spread[SLOT_CLASS_NAME_PROP_SYMBOL]).toBe('consumer');
  });

  it('keeps the symbols enumerable, which is what makes the spread carry them', () => {
    const rendered = slot.always(undefined as NonNullable<TestProps['slotA']> | undefined, { elementType: 'div' });

    for (const sym of [SLOT_ELEMENT_TYPE_SYMBOL, SLOT_CLASS_NAME_PROP_SYMBOL] as const) {
      const descriptor = Object.getOwnPropertyDescriptor(rendered, sym);
      expect(descriptor).toBeDefined();
      expect(descriptor?.enumerable).toBe(true);
    }
  });

  it('preserves the render-function symbol through a spread', () => {
    const renderFunction = jest.fn();
    const rendered = slot.always({ children: renderFunction } as NonNullable<TestProps['slotA']>, {
      elementType: 'div',
      defaultProps: { children: 'default' },
    });

    const spread = { ...rendered, className: 'composed' };

    expect(spread[SLOT_RENDER_FUNCTION_SYMBOL]).toBe(renderFunction);
    expect(spread[SLOT_RENDER_FUNCTION_SYMBOL]).toBe(rendered[SLOT_RENDER_FUNCTION_SYMBOL]);
  });

  it('a spread slot is still recognized by isSlot and getSlotClassNameProp', () => {
    const rendered = slot.always({ className: 'consumer' } as NonNullable<TestProps['slotA']>, {
      elementType: 'div',
    });

    const spread = { ...rendered, className: 'composed consumer' };

    expect(isSlot(spread)).toBe(true);
    expect(getSlotClassNameProp(spread)).toBe('consumer');
  });

  it('assertSlots accepts a spread-composed state and the element types survive', () => {
    const props: TestProps = { slotA: { className: 'consumer-a' }, slotB: { className: 'consumer-b' } };
    const state: TestState = {
      components: { slotA: 'div', slotB: 'span' },
      slotA: slot.always(props.slotA, { elementType: 'div' }),
      slotB: slot.optional(props.slotB, { elementType: 'span' }),
    };

    // Exactly the shape a purified styles hook now returns.
    const composed: TestState = {
      ...state,
      slotA: { ...state.slotA, className: 'fui-a consumer-a' },
      ...(state.slotB && { slotB: { ...state.slotB, className: 'fui-b consumer-b' } }),
    };

    // `assertSlots` is what the render functions call before using slots as element types. It warns
    // and back-fills when a slot is missing its element-type symbol, so a warning-free pass means
    // the spread did not strip it.
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    expect(() => assertSlots<TestSlots>(composed)).not.toThrow();
    expect(consoleWarnMock).not.toHaveBeenCalled();
    consoleWarnMock.mockRestore();

    expect(slotMetadata(composed.slotA)?.[SLOT_ELEMENT_TYPE_SYMBOL]).toBe('div');
    expect(slotMetadata(composed.slotB)?.[SLOT_ELEMENT_TYPE_SYMBOL]).toBe('span');
    expect(composed.slotA.className).toBe('fui-a consumer-a');
    expect(composed.slotB?.className).toBe('fui-b consumer-b');
  });

  it('assertSlots can still overwrite the element type on a spread copy', () => {
    const CustomSlot = () => null;
    const state: TestState = {
      components: { slotA: 'div', slotB: CustomSlot },
      slotA: slot.always(undefined as NonNullable<TestProps['slotA']> | undefined, { elementType: 'div' }),
      slotB: slot.optional({} as TestProps['slotB'], { renderByDefault: true, elementType: 'span' }),
    };

    const composed: TestState = {
      ...state,
      slotA: { ...state.slotA, className: 'fui-a' },
      ...(state.slotB && { slotB: { ...state.slotB, className: 'fui-b' } }),
    };

    // `state.components.slotB` disagrees with the slot's own element type, so assertSlots writes the
    // components entry onto the slot — it has to both read and write the symbol on the spread copy.
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    assertSlots<TestSlots>(composed);
    consoleWarnMock.mockRestore();

    expect(slotMetadata(composed.slotB)?.[SLOT_ELEMENT_TYPE_SYMBOL]).toBe(CustomSlot);
  });
});
