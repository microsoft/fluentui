import { IPartialStackProps } from '../Stack.types';
import { IStyle } from 'office-ui-fabric-react';

export interface IHorizontalStackProps extends IPartialStackProps {
  /**
   * How to render the HorizontalStack.
   */
  renderAs?: string | React.ReactType<IHorizontalStackProps>;

  /**
   * How to align child elements horizontally.
   */
  horizontalAlign?: 'left' | 'right' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

  /**
   * How to align child elements vertically.
   */
  verticalAlign?: 'top' | 'bottom' | 'center' | 'baseline' | 'stretch';
}

export interface IHorizontalStackStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
}
