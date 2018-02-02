import { IStyle } from '../../../Styling';

export interface IBeakStylesProps { }

export interface IBeakStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
  canvas?: IStyle;
}

export function getStyles(props: IBeakStylesProps): IBeakStyles {
  return {
    root: {
      position: 'absolute',
      // backgroundColor: DefaultPalette.themePrimary,
      boxShadow: 'inherit',
      border: 'inherit',
      boxSizing: 'border-box',
      transform: 'translate(-50%, -75%)',
      left: '50%'
    },
    canvas: {
      display: 'block'
    }
  };
}