import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface IAddCardProps {
  id: string;
  /**
   * The title for card representation in add card panel
   */
  title: string;

  /**
   * The image url for card representation in add card panel
   */
  imageSrc?: string;

  /**
   * The description for card representation in add card panel
   */
  description?: string;

  /**
   * The description for card representation in add card panel
   */
  cardClicked?: (cardId: string) => void;
}

export interface IAddCardStyles {
  /**
   * The styles for the root
   */
  root: IStyle;

  /**
   * The styles for the image wrapper
   */
  imageWrapper: IStyle;

  /**
   * Styles for wrapper of header and body text combined
   */
  textContainer: IStyle;

  /**
   * Styles for header of add card representation
   */
  header: IStyle;

  /**
   * Styles for bodyText of add card representation
   */
  bodyText: IStyle;

  /**
   * Styles for the add icon for add card
   */
  icon: IStyle;

  /**
   * Styles for the wrapper for add icon of add card
   */
  iconWrapper: IStyle;
}
