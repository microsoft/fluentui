import { useItemLayoutStyles } from './ItemLayout.styles.css';

jest.mock('./ItemLayout.module.css', () => ({ root: 'root', header: 'header', endMedia: 'end-media' }));

describe('useItemLayoutStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useItemLayoutStyles()).toMatchObject({ root: 'root', header: 'header', endMedia: 'end-media' });
  });
});
