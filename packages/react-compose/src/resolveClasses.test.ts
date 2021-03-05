import { resolveClasses } from './resolveClasses';

describe('resolveClasses', () => {
  it('resolves className', () => {
    expect(
      resolveClasses({ state: { className: 'cn' }, slotProps: { root: { className: 'root' } }, slots: {} }, []),
    ).toEqual({
      state: { className: 'cn' },
      slotProps: { root: { className: 'root cn' } },
      slots: {},
    });
  });

  it('can distribute classes to slotProps', () => {
    expect(
      resolveClasses(
        {
          state: {},
          slotProps: { root: { className: 'original' } },
          slots: { root: 'div', slot1: 'div' },
        },
        [{ root: 'root' }, { slot1: 'slot1' }, { unrecognized: 'ignored' }],
      ),
    ).toEqual({
      state: {},
      slotProps: { root: { className: 'original root' }, slot1: { className: 'slot1' } },
      slots: { root: 'div', slot1: 'div' },
    });
  });

  it('can manage multiple overlapping slot classes', () => {
    expect(
      resolveClasses(
        {
          state: {},
          slotProps: { root: { className: 'original' } },
          slots: { root: 'div', slot1: 'div' },
        },
        [{ root: 'foo' }, { root: 'bar' }],
      ),
    ).toEqual({
      state: {},
      slotProps: { root: { className: 'original foo bar' } },
      slots: { root: 'div', slot1: 'div' },
    });
  });

  it('can resolve functional classes', () => {
    expect(
      resolveClasses(
        {
          state: { primary: true },
          slotProps: { root: { className: 'original' } },
          slots: { root: 'div', slot1: 'div' },
        },
        [state => ({ root: state.primary ? 'foo' : 'baz' }), { root: 'bar' }],
      ),
    ).toEqual({
      state: { primary: true },
      slotProps: { root: { className: 'original foo bar' } },
      slots: { root: 'div', slot1: 'div' },
    });
  });

  it('will add duplicates without filtering the classes', () => {
    expect(
      resolveClasses(
        {
          state: {},
          slotProps: { root: { className: 'root' } },
          slots: { root: 'div', slot1: 'div' },
        },
        [state => ({ root: 'root' }), { root: 'root' }],
      ),
    ).toEqual({
      state: {},
      slotProps: { root: { className: 'root root root' } },
      slots: { root: 'div', slot1: 'div' },
    });
  });
});
