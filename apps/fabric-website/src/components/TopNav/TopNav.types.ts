import { INavPage } from '../Nav/Nav.types';

export interface ITopNavProps {
  pages: INavPage[];

  /**
   * Function callback invoked when a link in the navigation is clicked
   */
  onLinkClick?: (ev?: React.MouseEvent<{}>) => void;

  platform?: string;
}
