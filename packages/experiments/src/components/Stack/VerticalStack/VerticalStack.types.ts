import { IPartialStackProps } from '../Stack.types';
import { IStatelessComponent, IStylesProp } from '../../../Foundation';
import { IStyle } from '../../../Styling';

export type IVerticalStackComponent = IStatelessComponent<IVerticalStackProps, IVerticalStackStyles>;

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
  styles?: IStylesProp<IVerticalStackProps, IVerticalStackStyles>;
}

export interface IVerticalStackStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
}
