import { IPartialStackProps } from '../Stack.types';
import { IStyle } from 'office-ui-fabric-react';

export interface IVerticalStackProps extends IPartialStackProps {
  renderAs?: string | React.ReactType<IVerticalStackProps>;
  verticalAlign?: 'top' | 'bottom' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  horizontalAlign?: 'left' | 'right' | 'center' | 'baseline' | 'stretch';
}

export interface IVerticalStackStyles {
  root: IStyle;
}
