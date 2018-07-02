import { IStyle } from '../../../Styling';

export interface IStackItemProps {
  renderAs?: string | React.ReactType<IStackItemProps>;
  children?: React.ReactNode;

  gap?: number;
  vertical?: boolean;
  index?: number;

  grow?: boolean;
  collapse?: boolean;

  align?: 'auto' | 'center' | 'start' | 'baseline' | 'stretch' | 'end';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

export interface IStackItemStyles {
  root: IStyle;
}
