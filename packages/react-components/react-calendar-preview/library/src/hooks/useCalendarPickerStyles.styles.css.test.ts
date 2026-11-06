import { useCalendarPickerStyles } from './useCalendarPickerStyles.styles.css';
jest.mock('./CalendarPicker.module.css', () => ({
  grid: 'css-grid',
  hasHeaderClickCallback: 'css-hasHeaderClickCallback',
  header: 'css-header',
  heading: 'css-heading',
  navigation: 'css-navigation',
  navigationButton: 'css-navigationButton',
  normalize: 'css-normalize',
  root: 'css-root',
}));

describe('useCalendarPickerStyles (CSS Modules)', () => {
  it('preserves every exported style-map entry', () => {
    const styles = useCalendarPickerStyles();
    expect(styles.grid).toBe('css-grid');
    expect(styles.hasHeaderClickCallback).toBe('css-hasHeaderClickCallback');
    expect(styles.header).toBe('css-header');
    expect(styles.heading).toBe('css-heading');
    expect(styles.navigation).toBe('css-navigation');
    expect(styles.navigationButton).toBe('css-navigationButton');
    expect(styles.normalize).toBe('css-normalize');
    expect(styles.root).toBe('css-root');
  });
});
