import { IStyle } from '../../Styling';
import { IStyleableComponent } from '../../Foundation';

export interface IStackProps extends IStyleableComponent<IStackProps, IStackStyles> {
  renderAs?: string | React.ReactType<IStackProps>;
  className?: string;

  horizontal?: boolean;

  verticalAlignment?: 'center' | 'start' | 'baseline' | 'stretch' | 'end';
  horizontalAlignment?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

  fillHorizontal?: boolean;
  fillVertical?: boolean;

  collapseItems?: boolean;

  grow?: boolean | number | 'inherit' | 'initial' | 'unset';
  gap?: number;

  maxWidth?: number | string;
  padding?: number | string;
  margin?: number | string;
}

export interface IStackStyles {
  root: IStyle;
}
