import type { CalendarDayGridProps } from './CalendarDayGrid.types';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useWeekCornerStyles, weekCornersClassNames } from './useWeekCornerStyles.styles.css';

jest.mock('@fluentui/react-shared-contexts', () => ({
  ['useFluent_unstable']: jest.fn(() => ({ dir: 'ltr' })),
}));

describe('useWeekCornerStyles (CSS Modules)', () => {
  it('preserves both helper contracts and emits ordinary stable classes', () => {
    const [getCorners, calculate] = useWeekCornerStyles({} as CalendarDayGridProps);
    expect(getCorners([])).toEqual({});
    expect(calculate(false, false, false, false).split(' ').sort()).toEqual(
      Object.values(weekCornersClassNames).sort(),
    );
    expect(calculate(true, true, true, true)).toBe('');
  });

  it('swaps physical corner names in RTL', () => {
    jest.mocked(useFluent_unstable).mockReturnValue({ dir: 'rtl' } as ReturnType<typeof useFluent_unstable>);
    const [, calculate] = useWeekCornerStyles({} as CalendarDayGridProps);
    expect(calculate(false, true, false, true)).toBe(weekCornersClassNames.topRightCornerDate);
  });
});
