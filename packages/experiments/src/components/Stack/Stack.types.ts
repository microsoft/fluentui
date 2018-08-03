import { IStyle } from '../../Styling';
import { IStyleableComponent } from '../../Foundation';

export interface IStackProps extends IStyleableComponent<IStackProps, IStackStyles> {
  renderAs?: string | React.ReactType<IStackProps>;
  className?: string;

  fill?: boolean;
  collapseItems?: boolean;

  inline?: boolean;
  vertical?: boolean;

  grow?: boolean | number | 'inherit' | 'initial' | 'unset';
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
