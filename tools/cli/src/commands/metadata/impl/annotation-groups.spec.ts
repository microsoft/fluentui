import { groupByAnnotation } from './annotation-groups';
import type { BaseSymbolDoc } from './types';

function sym(name: string, tags: Record<string, string> = {}): BaseSymbolDoc {
  return { name, description: '', typeSignature: '', tags };
}

describe('groupByAnnotation', () => {
  it('should place symbols without special tags into stable', () => {
    const result = groupByAnnotation([sym('Foo'), sym('Bar')]);
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('stable');
    expect(result[0].items.map(i => i.name)).toEqual(['Bar', 'Foo']);
  });

  it('should group @deprecated symbols separately', () => {
    const result = groupByAnnotation([sym('A'), sym('B', { deprecated: 'use C' }), sym('C')]);
    expect(result).toHaveLength(2);
    expect(result[0].key).toBe('stable');
    expect(result[0].items.map(i => i.name)).toEqual(['A', 'C']);
    expect(result[1].key).toBe('deprecated');
    expect(result[1].items.map(i => i.name)).toEqual(['B']);
  });

  it('should group @internal symbols separately', () => {
    const result = groupByAnnotation([sym('Public'), sym('Secret', { internal: '' })]);
    expect(result).toHaveLength(2);
    expect(result[0].key).toBe('stable');
    expect(result[1].key).toBe('internal');
    expect(result[1].items[0].name).toBe('Secret');
  });

  it('should group @alpha and @beta into preview', () => {
    const result = groupByAnnotation([sym('A', { alpha: '' }), sym('B', { beta: '' }), sym('C')]);
    expect(result.find(g => g.key === 'preview')!.items).toHaveLength(2);
    expect(result.find(g => g.key === 'stable')!.items).toHaveLength(1);
  });

  it('should use first matching group for symbols with multiple tags', () => {
    const result = groupByAnnotation([sym('X', { deprecated: '', internal: '' })]);
    expect(result).toHaveLength(1);
    // deprecated comes before internal in ANNOTATION_GROUPS
    expect(result[0].key).toBe('deprecated');
  });

  it('should omit empty groups', () => {
    const result = groupByAnnotation([sym('A', { internal: '' })]);
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('internal');
  });
});
