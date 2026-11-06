import { useAttachmentBodyStyles } from './AttachmentBody.styles.css';

jest.mock('./AttachmentBody.module.css', () => ({ root: 'body-root' }));

describe('useAttachmentBodyStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useAttachmentBodyStyles().root).toBe('body-root');
  });
});
