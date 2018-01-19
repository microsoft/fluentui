import { IStyle } from '../../Styling';

export interface IBeakStylesProps { }

export interface IBeakStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
}

export function getStyles(props: IBeakStylesProps): IBeakStyles {
  return {
    root: {}
  }
};
