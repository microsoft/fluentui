import { createClassResolver } from './createClassResolver';

describe('createClassResolver', () => {
  const classResolver = createClassResolver(
    { root: 'root', slot1: 'slot1', slot2: 'slot2', primary: 'primary', size_small: 'small', size_medium: 'medium' },
    { root: null, slot1: null, slot2: null },
  );

  it('can resolve slot classes', () => {
    expect(classResolver({})).toEqual({
      root: { className: 'root' },
      slot1: { className: 'slot1' },
      slot2: { className: 'slot2' },
    });
  });

  it('can resolve modifiers', () => {
    expect(classResolver({ primary: true })).toEqual({
      root: { className: 'root primary' },
      slot1: { className: 'slot1' },
      slot2: { className: 'slot2' },
    });
  });

  it('can resolve enums', () => {
    // Can resolve
    expect(classResolver({ size: 'small' })).toEqual({
      root: { className: 'root small' },
      slot1: { className: 'slot1' },
      slot2: { className: 'slot2' },
    });
  });

  it('can resolve mixed content', () => {
    // Can resolve
    expect(classResolver({ primary: true, size: 'medium' })).toEqual({
      root: { className: 'root primary medium' },
      slot1: { className: 'slot1' },
      slot2: { className: 'slot2' },
    });
  });
});
