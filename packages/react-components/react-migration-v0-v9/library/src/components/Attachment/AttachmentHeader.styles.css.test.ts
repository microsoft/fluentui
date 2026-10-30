import { useAttachmentHeaderStyles } from './AttachmentHeader.styles.css';

jest.mock('./AttachmentHeader.module.css', () => ({ root: 'header-root' }));

describe('useAttachmentHeaderStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useAttachmentHeaderStyles().root).toBe('header-root');
  });
});
