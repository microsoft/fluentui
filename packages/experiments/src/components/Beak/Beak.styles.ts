import { IStyle } from '../../Styling';

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
      width: "100px",
      height: "100px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 16px 10px -17px rgba(0, 0, 0, 0.5)"
    },
    canvas: {
      transform: "rotate(90deg)"
    }
  }
};
