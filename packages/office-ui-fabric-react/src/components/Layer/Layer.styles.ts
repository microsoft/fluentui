import { ILayerStyleProps, ILayerStyles } from './Layer.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: ILayerStyleProps
): ILayerStyles => {
  const {
    className,
    theme,
  } = props;

  // const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-Layer',
      {
        position: 'fixed',
        zIndex: 1000000,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        visibility: 'hidden'
      }
    ],
    content: [
      'ms-Layer-content',
      {
        visibility: 'visible'
      }
    ]
  });
};
