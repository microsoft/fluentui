import { renderHook } from '@testing-library/react-hooks';
import { useAccordionHeader_unstable } from './useAccordionHeader';
import { useAccordionHeaderStyles_unstable as applyStyles } from './useAccordionHeaderStyles.styles.css';

jest.mock('./AccordionHeader.module.css', () => ({
  button: 'css-button',
  disabled: 'css-disabled',
  end: 'css-end',
  expandIcon: 'css-expandIcon',
  'extra-large': 'css-extra-large',
  icon: 'css-icon',
  inline: 'css-inline',
  large: 'css-large',
  root: 'css-root',
  small: 'css-small',
  start: 'css-start',
  withIcon: 'css-withIcon',
}));

describe('useAccordionHeaderStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useAccordionHeader_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-AccordionHeader css-root css-start');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() =>
      useAccordionHeader_unstable(
        {
          className: 'caller-root',
          button: { className: 'caller-button' },
          icon: { className: 'caller-icon' },
          expandIcon: { className: 'caller-expandIcon' },
        },
        null,
      ),
    );
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
    expect(state.button?.className?.endsWith(' caller-button')).toBe(true);
    expect(state.icon?.className?.endsWith(' caller-icon')).toBe(true);
    expect(state.expandIcon?.className?.endsWith(' caller-expandIcon')).toBe(true);
  });

  it('does not create absent optional slots', () => {
    const { result } = renderHook(() => useAccordionHeader_unstable({ icon: null, expandIcon: null }, null));
    const state = applyStyles(result.current);
    expect(state.icon).toBeUndefined();
    expect(state.expandIcon).toBeUndefined();
  });

  it.each(['small', 'medium', 'large', 'extra-large'] as const)(
    'owns size %s and expand-icon state on the root',
    size => {
      const { result } = renderHook(() =>
        useAccordionHeader_unstable({ size, inline: true, expandIconPosition: 'end', icon: 'icon' }, null),
      );
      const state = result.current;
      state.disabled = true;
      applyStyles(state);
      expect(state.root.className).toContain('css-end css-inline css-disabled css-withIcon');
      if (size !== 'medium') {
        expect(state.root.className).toContain(`css-${size}`);
      }
      expect(state.button.className).toBe('fui-AccordionHeader__button css-button');
      expect(state.expandIcon?.className).toBe('fui-AccordionHeader__expandIcon css-expandIcon');
      expect(state.icon?.className).toBe('fui-AccordionHeader__icon css-icon');
    },
  );
});
