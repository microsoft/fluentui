import * as React from 'react';
import { resolveSlotProps, NullRender } from './resolveSlotProps';

describe('resolveSlotProps', () => {
  const defaultSlots = { slots: { root: 'div', slot1: 'slot1', slot2: 'slot2', slot3: 'slot3' } };

  it('can expand strings, booleans, and numbers as children', () => {
    const state = { slot1: 'text', slot2: 0, slot3: false };
    expect(
      resolveSlotProps({
        ...defaultSlots,
        state,
        slotProps: {},
      }),
    ).toEqual({
      ...defaultSlots,
      state,
      slotProps: {
        slot1: { children: 'text' },
        slot2: { children: 0 },
        slot3: { children: false },
      },
    });
  });

  it('can expand JSX', () => {
    const slotContent = <button />;
    const state = { slot1: slotContent };

    expect(
      resolveSlotProps({
        ...defaultSlots,
        slotProps: {},
        state,
      }),
    ).toEqual({
      ...defaultSlots,
      state,
      slotProps: {
        slot1: { children: slotContent },
      },
    });
  });

  it('can expand children functions', () => {
    const renderFunction = () => <button />;
    const slotContent = <button />;
    const state = { slot1: { children: renderFunction } };

    expect(
      resolveSlotProps({
        ...defaultSlots,
        slotProps: {},
        state,
      }),
    ).toEqual({
      slots: {
        ...defaultSlots.slots,
        slot1: React.Fragment,
      },
      state,
      slotProps: {
        slot1: { children: slotContent },
      },
    });
  });

  it('can expand null slots from state', () => {
    const state = { slot1: null };

    expect(
      resolveSlotProps({
        ...defaultSlots,
        slotProps: {},
        state,
      }),
    ).toEqual({
      slots: {
        ...defaultSlots.slots,
        slot1: NullRender,
      },
      state,
      slotProps: {},
    });
  });

  it('can expand null slots from config', () => {
    const state = {};

    expect(
      resolveSlotProps({
        slots: {
          ...defaultSlots.slots,
          slot1: null,
        },
        slotProps: {},
        state,
      }),
    ).toEqual({
      slots: {
        ...defaultSlots.slots,
        slot1: NullRender,
      },
      state,
      slotProps: {},
    });
  });
});
