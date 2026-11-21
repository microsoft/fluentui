import { useVideoStyles } from './Video.styles.css';

jest.mock('./Video.module.css', () => ({ root: 'video-root' }));

describe('useVideoStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useVideoStyles().root).toBe('video-root');
  });
});
