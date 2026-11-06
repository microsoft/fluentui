import { useAttachmentDescriptionStyles } from './AttachmentDescription.styles.css';

jest.mock('./AttachmentDescription.module.css', () => ({ root: 'description-root' }));

describe('useAttachmentDescriptionStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useAttachmentDescriptionStyles().root).toBe('description-root');
  });
});
