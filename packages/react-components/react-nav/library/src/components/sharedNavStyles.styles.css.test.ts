import { renderHook } from '@testing-library/react-hooks';
import {
  navItemTokens,
  useRootDefaultClassName,
  useSmallStyles,
  useContentStyles,
  useIndicatorStyles,
  useIconStyles,
} from './sharedNavStyles.styles.css';

jest.mock('./sharedNavStyles.module.css', () => ({
  contentSelected: 'css-sharedNavStyles-contentSelected',
  icon: 'css-sharedNavStyles-icon',
  indicator: 'css-sharedNavStyles-indicator',
  root: 'css-sharedNavStyles-root',
  selected: 'css-sharedNavStyles-selected',
  small: 'css-sharedNavStyles-small',
}));

describe('shared nav CSS helpers', () => {
  it('preserves each helper return shape independently', () => {
    expect(renderHook(() => useRootDefaultClassName()).result.current).toBe('css-sharedNavStyles-root');
    expect(renderHook(() => useSmallStyles()).result.current).toEqual({ root: 'css-sharedNavStyles-small' });
    expect(renderHook(() => useContentStyles()).result.current).toEqual({
      selected: 'css-sharedNavStyles-contentSelected',
    });
    expect(renderHook(() => useIndicatorStyles()).result.current).toEqual({ base: 'css-sharedNavStyles-indicator' });
    expect(renderHook(() => useIconStyles()).result.current).toEqual({
      base: 'css-sharedNavStyles-icon',
      selected: 'css-sharedNavStyles-selected',
    });
  });
  it('preserves shared numeric token contracts', () => {
    expect(navItemTokens).toMatchObject({
      defaultDrawerWidth: 260,
      indicatorOffset: 16,
      indicatorWidth: 4,
      indicatorHeight: 20,
    });
  });
});
