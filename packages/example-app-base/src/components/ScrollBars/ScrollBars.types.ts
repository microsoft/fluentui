import { ScrollbarProps } from 'react-custom-scrollbars';

export interface IScrollBarsProps extends ScrollbarProps {
  /**
   * The size (width/height) in px of the scrollbar track and thumb.
   * @default 6
   */
  size?: number;

  className?: string;

  viewClassName?: string;
}
