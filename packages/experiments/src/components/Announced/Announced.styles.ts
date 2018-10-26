import { hiddenContentStyle } from '../../Styling';
import { IAnnouncedStyleProps, IAnnouncedStyles } from './Announced.types';

export const getStyles = (props: IAnnouncedStyleProps): IAnnouncedStyles => {
  return {
    screenReaderText: hiddenContentStyle
  };
};
