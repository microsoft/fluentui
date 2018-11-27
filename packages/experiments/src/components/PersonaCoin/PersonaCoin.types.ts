import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { ImageLoadState } from 'office-ui-fabric-react';

export type IPersonaCoinComponent = IStatelessComponent<IPersonaCoinProps, IPersonaCoinStyles>;

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
//    If you don't want these props to be included in your component, just remove this extension.
export interface IPersonaCoinProps extends IStyleableComponentProps<IPersonaCoinProps, IPersonaCoinStyles> {
  initials?: string;
  /**
   * Size of the coin
   */
  size: 56 | 72 | 100;

  imageUrl?: string;

  color: string;

  onPhotoLoadingStateChange?: (loadState: ImageLoadState) => void;
}

export interface IPersonaCoinStyles {
  /**
   * Styling for the root element.
   */
  root: IStyle;
  /**
   * Styling for the image element
   */
  image: IStyle;
}
