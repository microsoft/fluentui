import { hiddenContentStyle } from '../../Styling';
import type { IStyleFunction } from '../../Utilities';
import type { IAnnouncedStyles, IAnnouncedStyleProps } from './Announced.types';

export const getStyles: IStyleFunction<IAnnouncedStyleProps, IAnnouncedStyles> = props => {
  return {
    root: props.className,
    screenReaderText: hiddenContentStyle,
  };
};
