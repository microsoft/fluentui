import { useCounterBadge_unstable } from './useCounterBadge';
import { counterBadgeClassNames, useCounterBadgeStyles_unstable } from './useCounterBadgeStyles.styles.css';

jest.mock('../Badge/Badge.module.css', () => ({
  root: 'badge-root',
  small: 'badge-small',
  icon: 'badge-icon',
  'ghost-danger': 'badge-ghost-danger',
}));

jest.mock('./CounterBadge.module.css', () => ({
  dot: 'counter-dot',
  hide: 'counter-hide',
}));

describe('useCounterBadgeStyles_unstable (CSS Modules)', () => {
  it('applies dot and inherited Badge state classes to the root', () => {
    const state = useCounterBadge_unstable(
      { dot: true, size: 'small', appearance: 'ghost', color: 'danger', className: 'caller-root' },
      null,
    );

    expect(useCounterBadgeStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain(`${counterBadgeClassNames.root} counter-dot caller-root`);
    expect(state.root.className).toContain('badge-root badge-small badge-ghost-danger');
    expect(state.root.className).not.toContain('counter-hide');
  });

  it('hides a CounterBadge with no content and preserves a caller root class', () => {
    const state = useCounterBadge_unstable({ className: 'caller-root' }, null);

    useCounterBadgeStyles_unstable(state);

    expect(state.root.className).toContain(`${counterBadgeClassNames.root} counter-hide caller-root`);
  });

  it('preserves caller icon classes and keeps icon classes on the icon slot', () => {
    const state = useCounterBadge_unstable(
      {
        count: 5,
        icon: { className: 'caller-icon', children: 'icon' },
        iconPosition: 'after',
        className: 'caller-root',
      },
      null,
    );

    useCounterBadgeStyles_unstable(state);

    expect(state.root.className).toContain(counterBadgeClassNames.root);
    expect(state.root.className).not.toContain('badge-icon');
    expect(state.icon?.className).toContain('fui-CounterBadge__icon caller-icon');
    expect(state.icon?.className).toContain('fui-Badge__icon badge-icon');
  });
});
