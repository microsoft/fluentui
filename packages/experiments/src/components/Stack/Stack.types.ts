import { IStyle } from '../../Styling';

export interface IStackProps {
  renderAs?: string | React.ReactType<IStackProps>;
  children?: React.ReactNode;
  className?: string;

  fill?: boolean;
  collapseItems?: boolean;

  inline?: boolean;
  vertical?: boolean;

  grow?: boolean;
  wrap?: boolean;

  gap?: number;
  align?: 'center' | 'start' | 'baseline' | 'stretch' | 'end';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

  maxWidth?: number | string;
  padding?: number | string;
  margin?: number | string;
}

export interface IStackStyles {
  root: IStyle;
}
