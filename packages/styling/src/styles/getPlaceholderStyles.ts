import { IStyle } from '@uifabric/merge-styles';

/**
 * Generates a style for placeholder for each of the browsers supported by office-ui-fabric-react.
 * @param styles - The style to use.
 * @returns The style object with the placeholder directive as key and the style passed in as value,
 * for each browser depending on the placeholder directive it uses.
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
