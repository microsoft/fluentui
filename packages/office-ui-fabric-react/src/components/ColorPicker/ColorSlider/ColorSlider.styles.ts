import { IColorSliderStyleProps, IColorSliderStyles } from './ColorSlider.types';
import { IsFocusVisibleClassName } from '../../../Utilities';

const hueStyle = {
  background:
    // tslint:disable-next-line:max-line-length
    'linear-gradient(to left,red 0,#f09 10%,#cd00ff 20%,#3200ff 30%,#06f 40%,#00fffd 50%,#0f6 60%,#35ff00 70%,#cdff00 80%,#f90 90%,red 100%)'
};

const alphaStyle = {
  backgroundImage:
    // tslint:disable-next-line:max-line-length
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)'
};

export const getStyles = (props: IColorSliderStyleProps): IColorSliderStyles => {
  const { theme, className, isAlpha } = props;
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
        boxSizing: 'border-box',
        outline: 'none',

        selectors: {
          [`.${IsFocusVisibleClassName} &:focus`]: {
            outline: `1px solid ${palette.neutralSecondary}`
          }
        }
      },
      isAlpha ? alphaStyle : hueStyle,
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
