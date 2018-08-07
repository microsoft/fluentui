import { IPartialStackProps } from '../Stack.types';
import { IStyle } from 'office-ui-fabric-react';

export interface IHorizontalStackProps extends IPartialStackProps {
  renderAs?: string | React.ReactType<IHorizontalStackProps>;
  horizontalAlign?: 'left' | 'right' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  verticalAlign?: 'top' | 'bottom' | 'center' | 'baseline' | 'stretch';
}

export interface IHorizontalStackStyles {
  root: IStyle;
}
