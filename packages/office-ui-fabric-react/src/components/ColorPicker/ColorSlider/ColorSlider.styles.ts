import { IColorSliderStyleProps, IColorSliderStyles } from './ColorSlider.types';

export const getStyles = (props: IColorSliderStyleProps): IColorSliderStyles => {
  const { theme, className } = props;
  const { palette, effects } = theme;

  return {
    root: [
      'ms-ColorPicker-slider',
      {
        position: 'relative',
        height: 20,
        marginBottom: 8,
        border: `1px solid ${palette.neutralLight}`,
        borderRadius: effects.roundedCorner2,
        boxSizing: 'border-box'
      },
      className
    ],
    sliderOverlay: [
      'ms-ColorPicker-sliderOverlay',
      {
        content: '',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    ],
    sliderThumb: [
      'ms-ColorPicker-thumb',
      'is-slider',
      {
        position: 'absolute',
        width: 20,
        height: 20,
        background: 'white',
        border: `1px solid ${palette.neutralSecondaryAlt}`,
        borderRadius: '50%',
        boxShadow: effects.elevation8,
        transform: 'translate(-50%, -50%)',
        top: '50%'
      }
    ]
  };
};
