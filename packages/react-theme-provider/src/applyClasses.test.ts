import { applyClasses } from './applyClasses';

describe('applyClasses', () => {
  const testClassMap = {
    root: 'root',
    slot1: 'slot1',
    _primary: 'primary',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _size_small: 'small',
  };

  it('applies classes correctly', () => {
    const state = {};

    applyClasses(state, testClassMap);

    expect(state).toEqual({
      className: 'root',
      slot1: { className: 'slot1' },
    });
  });

  it('appends classes as appropriate', () => {
    const state = {
      className: 'existing1',
      slot1: { className: 'existing2' },
    };

    applyClasses(state, testClassMap);

    expect(state).toEqual({
      className: 'existing1 root',
      slot1: { className: 'existing2 slot1' },
    });
  });

  it('can apply a modifier', () => {
    const state = {
      primary: true,
      className: 'existing1',
      slot1: { className: 'existing2' },
    };

    applyClasses(state, testClassMap);

    expect(state).toEqual({
      primary: true,
      className: 'existing1 root primary',
      slot1: { className: 'existing2 slot1' },
    });
  });

  it('can apply an enum', () => {
    const state = {
      size: 'small',
      className: 'existing1',
      slot1: { className: 'existing2' },
    };

    applyClasses(state, testClassMap);

    expect(state).toEqual({
      className: 'existing1 root small',
      size: 'small',
      slot1: { className: 'existing2 slot1' },
    });
  });
});
