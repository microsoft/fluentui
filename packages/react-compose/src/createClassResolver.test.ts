import { createClassResolver } from './createClassResolver';

describe('createClassResolver', () => {
  const classResolver = createClassResolver(
    { root: 'root', slot1: 'slot1', slot2: 'slot2', primary: 'primary', size_small: 'small', size_medium: 'medium' },
    { root: null, slot1: null, slot2: null },
  );

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
      slot1: 'slot1',
      slot2: 'slot2',
    });
  });

  it('can resolve enums', () => {
    // Can resolve
    expect(classResolver({ size: 'small' })).toEqual({
      root: 'root small',
      slot1: 'slot1',
      slot2: 'slot2',
    });
  });

  it('can resolve mixed content, including a className in props', () => {
    // Can resolve
    expect(classResolver({ className: 'foo', primary: true, size: 'medium' })).toEqual({
      root: 'foo root primary medium',
      slot1: 'slot1',
      slot2: 'slot2',
    });
  });
});
