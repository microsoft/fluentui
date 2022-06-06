import { ColorPicker } from './color-picker';
import { colorPickerTemplate as template } from './color-picker.template';
import { colorPickerStyles as styles } from './color-picker.styles';

/**
 * A web component used for updating color values.
 *
 * @alpha
 * @remarks
 * HTML Element: \<color-picker\>
 */
export const fastToolingColorPicker = ColorPicker.compose({
  baseName: 'color-picker',
  template,
  styles,
});
