import { HighContrastSelector, getHighContrastNoAdjustStyle } from '../../../Styling';
import { IsFocusVisibleClassName } from '../../../Utilities';
import { hiddenContentStyle } from '@fluentui/style-utilities';
import type { IColorRectangleStyleProps, IColorRectangleStyles } from './ColorRectangle.types';

export const getStyles = (props: IColorRectangleStyleProps): IColorRectangleStyles => {
  const { className, theme, minSize } = props;
  const { palette, effects } = theme;

  return {
    root: [
      'ms-ColorPicker-colorRect',
      {
        position: 'relative',
        marginBottom: 8,
        border: `1px solid ${palette.neutralLighter}`,
        borderRadius: effects.roundedCorner2,
        minWidth: minSize,
        minHeight: minSize,
        outline: 'none',

        selectors: {
          [HighContrastSelector]: {
            ...getHighContrastNoAdjustStyle(),
          },

          [`.${IsFocusVisibleClassName} &:focus, :host(.${IsFocusVisibleClassName}) &:focus`]: {
            outline: `1px solid ${palette.neutralSecondary}`,
            [`${HighContrastSelector}`]: {
              outline: '2px solid CanvasText',
            },
          },
        },
      },
      className,
    ],
    light: [
      'ms-ColorPicker-light',
      {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        // Intentionally DO NOT flip the color picker in RTL: its orientation is not very meaningful,
        // and getting all the math and styles flipped correctly is tricky
        background: 'linear-gradient(to right, white 0%, transparent 100%) /*@noflip*/',
      },
    ],
    dark: [
      'ms-ColorPicker-dark',
      {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, transparent 0, #000 100%)',
      },
    ],
    thumb: [
      'ms-ColorPicker-thumb',
      {
        position: 'absolute',
        width: 20,
        height: 20,
        background: 'white',
        border: `1px solid ${palette.neutralSecondaryAlt}`,
        borderRadius: '50%',
        boxShadow: effects.elevation8,
        transform: 'translate(-50%, -50%)',
        selectors: {
          ':before': {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            border: `2px solid ${palette.white}`,
            borderRadius: '50%',
            boxSizing: 'border-box',
            content: '""',
          },
        },
      },
    ],
    description: hiddenContentStyle,
  };
};
