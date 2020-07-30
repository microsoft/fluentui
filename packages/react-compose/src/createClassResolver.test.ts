import { createClassResolver } from './createClassResolver';

describe('createClassResolver', () => {
  const classResolver = createClassResolver({
    root: 'root',
    slot1: 'slot1',
    slot2: 'slot2',
    _primary: 'primary',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _size_small: 'small',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _size_medium: 'medium',
  });

  it('can resolve slot classes', () => {
    expect(classResolver({})).toEqual({
      root: 'root',
      slot1: 'slot1',
      slot2: 'slot2',
    });
  });

  it('can resolve modifiers', () => {
    expect(classResolver({ primary: true })).toEqual({
      root: 'root primary',
      slot1: 'slot1 primary',
      slot2: 'slot2 primary',
    });
  });

  it("can ignore props which don't resolve to slots or modifiers", () => {
    expect(classResolver({ primary: true, secondary: true })).toEqual({
      root: 'root primary',
      slot1: 'slot1 primary',
      slot2: 'slot2 primary',
    });
  });

  it('can resolve enums', () => {
    // Can resolve
    expect(classResolver({ size: 'small' })).toEqual({
      root: 'root small',
      slot1: 'slot1 small',
      slot2: 'slot2 small',
    });
  });

  it('can resolve mixed content', () => {
    // Can resolve
    expect(classResolver({ primary: true, size: 'medium' })).toEqual({
      root: 'root primary medium',
      slot1: 'slot1 primary medium',
      slot2: 'slot2 primary medium',
    });
  });
});
