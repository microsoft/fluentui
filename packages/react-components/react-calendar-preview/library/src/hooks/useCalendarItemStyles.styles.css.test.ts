import { useCalendarItemStyles } from './useCalendarItemStyles.styles.css';
jest.mock('./CalendarItem.module.css', () => ({
  buttonRow: 'css-buttonRow',
  disabled: 'css-disabled',
  highlightCurrent: 'css-highlightCurrent',
  highlightSelected: 'css-highlightSelected',
  itemButton: 'css-itemButton',
}));

describe('useCalendarItemStyles (CSS Modules)', () => {
  it('preserves every exported style-map entry', () => {
    const styles = useCalendarItemStyles();
    expect(styles.buttonRow).toBe('css-buttonRow');
    expect(styles.disabled).toBe('css-disabled');
    expect(styles.highlightCurrent).toBe('css-highlightCurrent');
    expect(styles.highlightSelected).toBe('css-highlightSelected');
    expect(styles.itemButton).toBe('css-itemButton');
  });
});
