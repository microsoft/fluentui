import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const getCustomActionBarButtonStyles = memoizeFunction(
  (): IButtonStyles => {
    return {
      root: {
        marginRight: '16px'
      },
      textContainer: {
        overflow: 'hidden'
      },
      label: {
        textOverflow: 'ellipsis',
        width: 'inherit',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        lineHeight: '14px',
        minHeight: '16px'
      }
    };
  }
);
