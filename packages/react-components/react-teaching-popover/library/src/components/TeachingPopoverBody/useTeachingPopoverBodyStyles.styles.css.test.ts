import { useTeachingPopoverBodyStyles_unstable, useMediaStyles } from './useTeachingPopoverBodyStyles.styles.css';
import type { TeachingPopoverBodyState } from './TeachingPopoverBody.types';

jest.mock('./TeachingPopoverBody.module.css', () => ({
  root: 'root',
  media: 'media',
  short: 'short',
  medium: 'medium',
  tall: 'tall',
}));

describe('useTeachingPopoverBodyStyles_unstable (CSS Modules)', () => {
  it('applies root and media length classes, keeping caller classes last', () => {
    const state = {
      mediaLength: 'tall',
      root: { className: 'caller-root' },
      media: { className: 'caller-media' },
    } as unknown as TeachingPopoverBodyState;

    useTeachingPopoverBodyStyles_unstable(state);

    expect(state.root.className).toBe('fui-TeachingPopoverBody root caller-root');
    expect(state.media?.className).toBe('fui-TeachingPopoverBody__media media tall caller-media');
  });

  it('skips the media slot when absent', () => {
    const state = { mediaLength: 'short', root: {} } as unknown as TeachingPopoverBodyState;

    expect(useTeachingPopoverBodyStyles_unstable(state).media).toBeUndefined();
  });

  it('keeps the useMediaStyles compatibility export', () => {
    expect(useMediaStyles()).toEqual({ base: 'media', short: 'short', medium: 'medium', tall: 'tall' });
  });
});
