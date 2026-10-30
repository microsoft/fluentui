import { renderHook } from '@testing-library/react-hooks';
import { useAccordion_unstable } from './useAccordion';
import { useAccordionStyles_unstable as applyStyles } from './useAccordionStyles.styles.css';

jest.mock('./Accordion.module.css', () => ({}));

describe('useAccordionStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useAccordion_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-Accordion');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() => useAccordion_unstable({ className: 'caller-root' }, null));
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
  });
});
