import styles from './CalendarPicker.module.css';

export const useCalendarPickerStyles = (): Record<
  'root' | 'normalize' | 'header' | 'heading' | 'hasHeaderClickCallback' | 'navigation' | 'navigationButton' | 'grid',
  string
> => ({
  root: styles.root,
  normalize: styles.normalize,
  header: styles.header,
  heading: styles.heading,
  hasHeaderClickCallback: styles.hasHeaderClickCallback,
  navigation: styles.navigation,
  navigationButton: styles.navigationButton,
  grid: styles.grid,
});
