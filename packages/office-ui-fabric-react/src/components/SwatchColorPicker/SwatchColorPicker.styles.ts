
import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types';

export const getStyles = (props: ISwatchColorPickerStyleProps): ISwatchColorPickerStyles => {
  const {
    theme,
    className,
    disabled,
    checked,
    circle
  } = props;

  return {
    root: [

    ],
    item: [

    ],
    cell: [

    ],
    svg: [

    ],
    container: [

    ]
  };
};