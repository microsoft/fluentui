import { IStyle } from '../../../Styling';
import { IStyleableComponent } from '../../../Foundation';

export interface IStackItemProps extends IStyleableComponent<IStackItemProps, IStackItemStyles> {
  renderAs?: string | React.ReactType<IStackItemProps>;

  gap?: number;
  vertical?: boolean;
  index?: number;

  grow?: boolean | number | 'inherit' | 'initial' | 'unset';
  collapse?: boolean;

  align?: 'auto' | 'center' | 'start' | 'baseline' | 'stretch' | 'end';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

export interface IStackItemStyles {
  root: IStyle;
}
