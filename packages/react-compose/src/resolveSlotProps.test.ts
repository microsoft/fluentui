import { resolveSlotProps } from './resolveSlotProps';

describe('resolveSlotProps', () => {
  const defaultResult = {
    state: {},
    slots: { root: 'div', slot1: 'slot1', slot2: 'slot2', slot3: 'slot3' },
    slotProps: {},
  };

  it('can expand strings, booleans, and numbers as children', () => {
    const state = { slot1: 'text', slot2: 0, slot3: false };
    expect(
      resolveSlotProps({
        ...defaultResult,
        state,
      }),
    ).toEqual({
      ...defaultResult,
      state,
      slotProps: {
        slot1: { children: 'text' },
        slot2: { children: 0 },
        slot3: { children: false },
      },
    });
  });
});
