import { useBaseAnimationStyles } from './useTimerStyles.styles.css';

jest.mock('./Timer.module.css', () => ({
  baseAnimation: 'css-base-animation',
}));

describe('useBaseAnimationStyles (CSS Modules)', () => {
  it('returns the scoped animation class', () => {
    expect(useBaseAnimationStyles()).toBe('css-base-animation');
  });
});
