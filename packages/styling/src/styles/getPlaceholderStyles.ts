import { IStyle } from '@uifabric/merge-styles';

/**
 * Generates placeholder style for each of the browsers supported by office-ui-fabric-react.
 * @param styles - The style to use.
 * @returns The placeholder style object for each browser depending on the placeholder directive it uses.
 */
export function getPlaceholderStyles(styles: IStyle): IStyle {
  return {
    selectors: {
      '::placeholder': styles, // Chrome, Safari, Opera, Firefox
      ':-ms-input-placeholder': styles, // IE 10+
      '::-ms-input-placeholder': styles // Edge
    }
  };
}
