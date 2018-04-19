import { ILayerStyleProps, ILayerStyles } from './Layer.types';
import { globalClassNamesWhenEnabled } from '../../Styling';

export const getStyles = (
  props: ILayerStyleProps
): ILayerStyles => {
  const {
    className,
    isNotHost,
    theme
  } = props;

  return ({
    root: [
      globalClassNamesWhenEnabled(theme, ['ms-Layer']),
      isNotHost && [
        globalClassNamesWhenEnabled(theme, ['ms-Layer--fixed']),
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
      className
    ],
    content: [
      globalClassNamesWhenEnabled(theme, ['ms-Layer-content']),
      {
        visibility: 'visible'
      }
    ]
  });
};
