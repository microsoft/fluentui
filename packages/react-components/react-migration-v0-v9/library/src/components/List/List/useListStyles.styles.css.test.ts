import { useListStyles_unstable } from './useListStyles.styles.css';
import type { ListState } from './List.types';

jest.mock('./List.module.css', () => ({ root: 'root', horizontal: 'horizontal', grid: 'grid' }));

const useRun = (layout: 'horizontal' | 'grid' | 'vertical') =>
  useListStyles_unstable({ layout, root: { className: 'caller' } } as unknown as ListState).root.className;

describe('useListStyles_unstable (CSS Modules)', () => {
  it('maps layout to a root class and keeps the caller class last', () => {
    expect(useRun('horizontal')).toBe('fui-List root horizontal caller');
    expect(useRun('grid')).toBe('fui-List root grid caller');
  });

  it('adds no layout class for vertical', () => {
    expect(useRun('vertical')).toBe('fui-List root caller');
  });
});
