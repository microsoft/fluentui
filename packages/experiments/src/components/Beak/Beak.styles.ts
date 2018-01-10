import { IStyle } from '../../Styling';


export interface IBeakStylesProps {
  /**
   *  Background color for the baea
   */
  backgroundColor?: string;
}

export interface IBeakStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;

  /**
   * Used to cover a portion of the beak for presentation.
   */
  curtain?: IStyle;
}

export function getStyles(props: IBeakStylesProps): IBeakStyles {
  return {
    root: {
      position: 'absolute',
      backgroundColor: '#ffffff',
      boxShadow: 'inherit',
      border: 'inherit',
      boxSizing: 'border-box',
      transform: 'rotate(45deg)'
    },
    curtain: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#ffffff'
    }
  }
};
