import { renderHook } from '@testing-library/react-hooks';
import { useAccordionPanel_unstable } from './useAccordionPanel';
import { useAccordionPanelStyles_unstable as applyStyles } from './useAccordionPanelStyles.styles.css';

jest.mock('./AccordionPanel.module.css', () => ({
  root: 'css-root',
}));

describe('useAccordionPanelStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useAccordionPanel_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-AccordionPanel css-root');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() => useAccordionPanel_unstable({ className: 'caller-root' }, null));
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
  });
});
