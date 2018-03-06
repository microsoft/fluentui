import { ILayerStyleProps, ILayerStyles } from './Layer.types';

export const getStyles = (
  props: ILayerStyleProps
): ILayerStyles => {
  const {
    className,
    isNotHost
  } = props;

  return ({
    root: [
      'ms-Layer',
      isNotHost && [
        'ms-Layer--fixed',
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
      'ms-Layer-content',
      {
        visibility: 'visible'
      }
    ]
  });
};
