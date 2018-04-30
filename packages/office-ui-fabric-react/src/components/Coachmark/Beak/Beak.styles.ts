import { IStyle, DefaultPalette } from '../../../Styling';
import { IBeakStylesProps } from './Beak.types';

export interface IBeakStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
  beak?: IStyle;
}

export function getStyles(props: IBeakStylesProps): IBeakStyles {
  return {
    root: [
      {
        position: 'absolute',
        boxShadow: 'inherit',
        border: 'none',
        boxSizing: 'border-box',
        transform: 'translateY(-50%)',
        left: '50%',
        width: props.width,
        height: props.height
      },
      props.left &&
        props.top && {
          left: props.left,
          top: props.top
        }
    ],
    beak: {
      fill: DefaultPalette.themePrimary,
      display: 'block'
    }
  };
}
