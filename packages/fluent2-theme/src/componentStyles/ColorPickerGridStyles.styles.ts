import type {
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles,
  IStyleFunctionOrObject,
} from '@fluentui/react';
import { IExtendedEffects } from '../types';

export function getColorPickerGridCellStyles(
  props: IColorPickerGridCellStyleProps,
): IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles> {
  const { theme, circle, height, width } = props;
  const { effects } = theme;

  let borderRadiusStyle = { borderRadius: effects.roundedCorner2 };

  if ((height && height > 32 && height <= 64) || (width && width > 32 && width <= 64)) {
    borderRadiusStyle = { borderRadius: effects.roundedCorner4 };
  } else if ((height && height > 64) || (width && width > 64)) {
    const largestRadius = (effects as IExtendedEffects).roundedCorner8 ?? '8px';

    borderRadiusStyle = {
      borderRadius: largestRadius,
    };
  }

  const styles: Partial<IColorPickerGridCellStyles> = {
    colorCell: [!circle && borderRadiusStyle],
    svg: [!circle && borderRadiusStyle],
  };

  return styles;
}
