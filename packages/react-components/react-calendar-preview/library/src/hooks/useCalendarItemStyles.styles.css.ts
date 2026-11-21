import styles from './CalendarItem.module.css';

export const useCalendarItemStyles = (): Record<
  'buttonRow' | 'itemButton' | 'highlightCurrent' | 'highlightSelected' | 'disabled',
  string
> => ({
  buttonRow: styles.buttonRow,
  itemButton: styles.itemButton,
  highlightCurrent: styles.highlightCurrent,
  highlightSelected: styles.highlightSelected,
  disabled: styles.disabled,
});
