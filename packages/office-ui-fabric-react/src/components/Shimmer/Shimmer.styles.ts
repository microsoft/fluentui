import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {
  const {
    isGeneric,
    hasCircle
  } = props;

  return {
    root: [
      'ms-Shimmer-container',
      {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        padding: '10px',
        width: '100%',
        background: 'content-box linear-gradient(to right, white 0%, black 50%, white 100%)',
        backgroundColor: 'red',
      }
    ],
    circle: [
      'ms-Shimmer-circle',
      {
        width: '36px',
        height: '24px',
        fill: 'white'
      },
    ],
    line: [
      'ms-Shimmer-line',
      {
        color: 'transparent',
        width: '100%',
        height: '16px',
        boxSizing: 'border-box'
      },
      hasCircle && {
        height: '24px',
        borderBottom: '4px solid white',
        borderBottomWidth: '4px',
        borderBottomStyle: 'style',
        borderBottomColor: 'white',
        borderTop: '4px solid white',
        borderTopWidth: '4px',
        borderTopStyle: 'style',
        borderTopColor: 'white'
      }
    ]
  };
}
