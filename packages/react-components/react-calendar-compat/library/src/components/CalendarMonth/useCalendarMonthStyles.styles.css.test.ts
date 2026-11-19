import { useCalendarMonthStyles_unstable } from './useCalendarMonthStyles.styles.css';
jest.mock('../CalendarPicker/CalendarPicker.module.css', () => ({
  buttonRow: 'css-buttonRow',
  currentHighlightCurrent: 'css-currentHighlightCurrent',
  currentItemButton: 'css-currentItemButton',
  currentItemButtonHasHeaderClickCallback: 'css-currentItemButtonHasHeaderClickCallback',
  disabled: 'css-disabled',
  gridContainer: 'css-gridContainer',
  headerContainer: 'css-headerContainer',
  itemButton: 'css-itemButton',
  navigationButton: 'css-navigationButton',
  navigationButtonsContainer: 'css-navigationButtonsContainer',
  normalize: 'css-normalize',
  root: 'css-root',
  selectedHighlightSelected: 'css-selectedHighlightSelected',
}));

describe('useCalendarMonthStyles_unstable (CSS Modules)', () => {
  it('returns the stable slot contracts and preserves caller classes', () => {
    const classes = useCalendarMonthStyles_unstable({
      className: 'caller-root',
      hasHeaderClickCallback: true,
      highlightCurrent: true,
      highlightSelected: true,
    });
    expect(Object.values(classes).every(value => typeof value === 'string')).toBe(true);
    expect(classes.root.endsWith('caller-root')).toBe(true);
    expect(classes.selected).toContain('css-selectedHighlightSelected');
    expect(classes.current).toContain('css-currentHighlightCurrent');
    expect(classes.disabled).toContain('css-disabled');
  });
  it('omits inactive state styles by default', () => {
    const classes = useCalendarMonthStyles_unstable({});
    expect(classes.root).not.toContain('ShowWeekNumbers');
    expect(classes.selected).not.toContain('css-selectedHighlightSelected');
    expect(classes.current).not.toContain('css-currentHighlightCurrent');
  });
});
