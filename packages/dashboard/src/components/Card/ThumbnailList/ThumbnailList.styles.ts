import { IThumbnailItemStyles } from './ThumbnailList.types';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const getCustomCommandBarStyles = memoizeFunction(
  (): IButtonStyles => {
    return {
      root: {
        maxWidth: 'auto',
        paddingLeft: '0px',
        paddingTop: '2px',
        paddingBottom: '10px'
      },
      label: {
        fontSize: '12px',
        lineHeight: '14px'
      },
      description: {
        fontSize: '12px',
        lineHeight: '14px',
        paddingBottom: '2px'
      }
    };
  }
);

export const getThumbnailItemStyles = (): IThumbnailItemStyles => {
  return {
    root: {
      overflow: 'hidden',
      paddingBottom: '16px',
      minHeight: '52px',
      maxHeight: '52px'
    },
    image: {
      position: 'relative',
      overflow: 'hidden',
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
          marginLeft: '68px',
          maxHeight: '52px',
          overflow: 'hidden'
        }
      }
    }
  };
};
