import { ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface ISideRailProps {
  /**
   * List of hash links to places within the current page.
   */
  jumpLinks?: ISideRailLink[];

  /**
   * List of links to related pages, as link objects or pre-rendered.
   */
  relatedLinks?: ISideRailLink[] | JSX.Element;

  /**
   * Mailto links for people related to the page, as link objects or pre-rendered.
   */
  contactLinks?: ISideRailLink[] | JSX.Element;

  /**
   * If the page has elements to observe.
   */
  observe?: boolean;

  /**
   * Theme provided by higher-order component.
   */
  theme?: ITheme;
}

export interface ISideRailLink {
  text: string;
  url: string;
}
