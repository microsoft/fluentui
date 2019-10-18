import { hiddenContentStyle } from '../../Styling';
import { IStyleFunction } from '../../Utilities';
import { IAnnouncedStyles, IAnnouncedStyleProps } from './Announced.types';

export const getStyles: IStyleFunction<IAnnouncedStyleProps, IAnnouncedStyles> = props => {
  return {
    root: props.className,
    screenReaderText: hiddenContentStyle
  };
};
