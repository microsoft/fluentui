import { renderHook } from '@testing-library/react-hooks';
import { useAccordionItem_unstable } from './useAccordionItem';
import { useAccordionItemStyles_unstable as applyStyles } from './useAccordionItemStyles.styles.css';

describe('useAccordionItemStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useAccordionItem_unstable({ value: 'item' }, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-AccordionItem');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() => useAccordionItem_unstable({ className: 'caller-root', value: 'item' }, null));
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
  });
});
