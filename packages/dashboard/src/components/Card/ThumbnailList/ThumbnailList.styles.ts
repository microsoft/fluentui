import { IThumbnailItemStyles } from './ThumbnailList.types';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const getCustomCommandBarStyles = memoizeFunction(
  (): IButtonStyles => {
    return {
      root: {
        maxWidth: 'auto',
        padding: '0px',
        height: '100%',
        selectors: {
          div: {
            margin: 'auto'
          }
        }
      },
      label: {
        fontSize: '12px',
        lineHeight: '14px'
      },
      description: {
        fontSize: '12px',
        lineHeight: '14px',
        paddingBottom: '2px'
      },
      textContainer: {
        paddingLeft: '16px'
      }
    };
  }
);

export const getThumbnailItemStyles = (): IThumbnailItemStyles => {
  return {
    root: {
      overflow: 'hidden',
      marginBottom: '16px',
      minHeight: '52px',
      maxHeight: '52px'
    },
    image: {
      position: 'relative',
      overflow: 'hidden',
      height: '52px',
      selectors: {
        img: {
          height: '52px',
          width: '52px',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        },
        button: {
          minHeight: 'inherit',
          backgroundColor: 'transparent',
          marginLeft: '52px',
          maxHeight: '52px',
          overflow: 'hidden',
          width: 'calc(100% - 52px)',
          selectors: {
            ':focus': {
              border: 'solid black 0.5px'
            },
            ':focus::after': {
              display: 'none'
            }
          }
        }
      }
    }
  };
};
