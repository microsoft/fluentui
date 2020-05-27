import { resolveClasses } from './resolveClasses';

describe('resolveClasses', () => {
  it('resolves className', () => {
    expect(
      resolveClasses([], { state: { className: 'cn' }, slotProps: { root: { className: 'root' } }, slots: {} }),
    ).toEqual({
      state: { className: 'cn' },
      slotProps: { root: { className: 'root cn' } },
      slots: {},
    });
  });

  it('can distribute classes to slotProps', () => {
    expect(
      resolveClasses([{ root: 'root' }, { slot1: 'slot1' }, { unrecognized: 'ignored' }], {
        state: {},
        slotProps: { root: { className: 'original' } },
        slots: { root: 'div', slot1: 'div' },
      }),
    ).toEqual({
      state: {},
      slotProps: { root: { className: 'original root' }, slot1: { className: 'slot1' } },
      slots: { root: 'div', slot1: 'div' },
    });
  });
});
