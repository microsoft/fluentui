import { IPartialStackProps } from '../Stack.types';
import { IStyle } from 'office-ui-fabric-react';

export interface IVerticalStackProps extends IPartialStackProps {
  /**
   * How to render the VerticalStack.
   */
  renderAs?: string | React.ReactType<IVerticalStackProps>;

  /**
   * How to align child elements vertically.
   */
  verticalAlign?: 'top' | 'bottom' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

  /**
   * How to align child elements horizontally.
   */
  horizontalAlign?: 'left' | 'right' | 'center' | 'baseline' | 'stretch';
}

export interface IVerticalStackStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
}
