import { IPartialStackProps } from '../Stack.types';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface IVerticalStackProps extends IPartialStackProps {
  /**
   * How to render the VerticalStack.
   */
  as?: string | React.ReactType<IVerticalStackProps>;

  /**
   * How to align child elements vertically.
   */
  verticalAlign?: 'top' | 'bottom' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

  /**
   * How to align child elements horizontally.
   */
  horizontalAlign?: 'left' | 'right' | 'center' | 'baseline' | 'stretch';

  /**
   * Custom styles to apply to the VerticalStack.
   */
  styles?: IStyleFunctionOrObject<IVerticalStackProps, IVerticalStackStyles>;
}

export interface IVerticalStackStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
}
