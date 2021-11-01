import { HighContrastSelector } from '../../../Styling';
import type { IStyle } from '../../../Styling';
import type { IBeakStylesProps } from './Beak.types';

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
        transform: props.transform,
        width: props.width,
        height: props.height,
        left: props.left,
        top: props.top,
        right: props.right,
        bottom: props.bottom,
      },
    ],
    beak: {
      fill: props.color,
      display: 'block',
      selectors: {
        [HighContrastSelector]: {
          fill: 'windowtext',
        },
      },
    },
  };
}
