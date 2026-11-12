import { useGridStyles } from './Grid.styles.css';

jest.mock('./Grid.module.css', () => ({ grid: 'grid', rows2: 'rows2', columnsDefault: 'columns-default' }));

describe('useGridStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useGridStyles()).toMatchObject({ grid: 'grid', rows2: 'rows2', columnsDefault: 'columns-default' });
  });
});
