import { useAttachmentActionStyles } from './AttachmentAction.styles.css';

jest.mock('./AttachmentAction.module.css', () => ({ root: 'action-root', disabled: 'action-disabled' }));

describe('useAttachmentActionStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useAttachmentActionStyles()).toMatchObject({ root: 'action-root', disabled: 'action-disabled' });
  });
});
