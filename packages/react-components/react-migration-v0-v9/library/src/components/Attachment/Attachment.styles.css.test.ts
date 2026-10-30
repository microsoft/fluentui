import { useAttachmentBaseStyles, useAttachmentStyles } from './Attachment.styles.css';

jest.mock('./Attachment.module.css', () => ({
  base: 'base',
  actionable: 'actionable',
  progressContainer: 'progress-container',
  progressBar: 'progress-bar',
}));

describe('Attachment styles (CSS Modules)', () => {
  it('returns the base class name', () => {
    expect(useAttachmentBaseStyles()).toBe('base');
  });

  it('returns the state class names', () => {
    expect(useAttachmentStyles()).toMatchObject({
      actionable: 'actionable',
      progressContainer: 'progress-container',
      progressBar: 'progress-bar',
    });
  });
});
