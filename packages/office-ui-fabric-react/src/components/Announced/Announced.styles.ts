import { hiddenContentStyle } from '../../Styling';
import { IAnnouncedStyles } from './Announced.types';

export const getStyles = (): IAnnouncedStyles => {
  return {
    root: {},
    screenReaderText: hiddenContentStyle
  };
};
