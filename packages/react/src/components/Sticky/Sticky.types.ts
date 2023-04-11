import { Sticky } from './Sticky';
import type { IReactProps, IRefObject } from '../../Utilities';

export interface IStickyProps extends IReactProps<Sticky> {
  /**
   * Gets ref to component interface.
   */
  componentRef?: IRefObject<IStickyProps>;

  /**
   * Class name to apply to the sticky element if component is sticky.
   */
  stickyClassName?: string;

  /**
   * color to apply as 'background-color' style for sticky element.
   */
  stickyBackgroundColor?: string;

  /**
   * Region to render sticky component in.
   * @defaultvalue Both
   */
  stickyPosition?: StickyPositionType;

  /**
   * If true, then match scrolling position of placeholder element in Sticky.
   * @defaultvalue true
   */
  isScrollSynced?: boolean;
}

export enum StickyPositionType {
  Both = 0,
  Header = 1,
  Footer = 2,
}
