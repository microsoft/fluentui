import { IColorRectangleStyleProps, IColorRectangleStyles } from './ColorRectangle.types';
import { HighContrastSelector } from '../../../Styling';

export const getStyles = (props: IColorRectangleStyleProps): IColorRectangleStyles => {
  const { className } = props;

  return {
    root: [
      'ms-ColorPicker-colorRect',
      {
        position: 'relative',
        marginBottom: 10,
        selectors: {
          [HighContrastSelector]: {
            MsHighContrastAdjust: 'none'
          }
        }
      },
      className
    ],
    light: [
      'ms-ColorPicker-light',
      {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: 'linear-gradient(to right, white 0%, transparent 100%)'
      }
    ],
    dark: [
      'ms-ColorPicker-dark',
      {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, transparent 0, #000 100%)'
      }
    ],
    thumb: [
      'ms-ColorPicker-thumb',
      {
        position: 'absolute',
        width: 20,
        height: 20,
        background: 'white',
        border: '1px solid rgba(255,255,255,.8)',
        borderRadius: '50%',
        boxShadow: '0 0 15px -5px black',
        transform: 'translate(-50%, -50%)'
      }
    ]
  };
};
