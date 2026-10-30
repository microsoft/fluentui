import { useAttachmentIconStyles } from './AttachmentIcon.styles.css';

jest.mock('./AttachmentIcon.module.css', () => ({ root: 'icon-root' }));

describe('useAttachmentIconStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useAttachmentIconStyles().root).toBe('icon-root');
  });
});
