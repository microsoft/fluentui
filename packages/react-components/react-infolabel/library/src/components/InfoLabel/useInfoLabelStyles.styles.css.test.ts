import { renderHook } from '@testing-library/react-hooks';
import { useInfoLabel_unstable } from './useInfoLabel';
import { useInfoLabelStyles_unstable as applyStyles } from './useInfoLabelStyles.styles.css';

jest.mock('./InfoLabel.module.css', () => ({
  infoButton: 'css-infoButton',
  label: 'css-label',
  large: 'css-large',
}));

describe('useInfoLabelStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useInfoLabel_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-InfoLabel');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() =>
      useInfoLabel_unstable(
        {
          className: 'caller-root',
          label: { className: 'caller-label' },
          infoButton: { className: 'caller-infoButton' },
        },
        null,
      ),
    );
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
    expect(state.label?.className?.endsWith(' caller-label')).toBe(true);
    expect(state.infoButton?.className?.endsWith(' caller-infoButton')).toBe(true);
  });

  it('does not create absent optional slots', () => {
    const { result } = renderHook(() => useInfoLabel_unstable({ infoButton: null }, null));
    const state = applyStyles(result.current);
    expect(state.infoButton).toBeUndefined();
  });

  it.each(['small', 'medium', 'large'] as const)(
    'owns the %s size on the root instead of the composed InfoButton',
    size => {
      const { result } = renderHook(() => useInfoLabel_unstable({ size, info: 'Details' }, null));
      const state = applyStyles(result.current);
      expect(state.root.className).toBe(`fui-InfoLabel${size === 'large' ? ' css-large' : ''}`);
      expect(state.label.className).toBe('fui-InfoLabel__label css-label');
      expect(state.infoButton?.className).toBe('fui-InfoLabel__infoButton css-infoButton');
    },
  );
});
