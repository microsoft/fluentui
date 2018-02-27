import { IPersonaStyleProps, IPersonaStyles } from './Persona.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: IPersonaStyleProps
): IPersonaStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-Persona',
      {
        // Insert css properties
      }
    ],

    // Insert className styles
  });
};