import { IStyle } from '../../../Styling';
import { DefaultPalette } from '../../../Styling';

export interface IBeakStylesProps { }

export interface IBeakStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
  beak?: IStyle;
}

export function getStyles(props: IBeakStylesProps): IBeakStyles {
  return {
    root: {
      position: 'absolute',
      boxShadow: 'inherit',
      border: 'inherit',
      boxSizing: 'border-box',
      transform: 'translate(-50%, -50%)',
      left: '50%'
    },
    beak: {
      fill: DefaultPalette.themePrimary
    }
  };
}