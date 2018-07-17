import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ButtonSize } from './CompoundButtonStack.types';

export const getCustomCompoundButtonStyles = memoizeFunction(
  (cardSize: number | undefined): IButtonStyles => {
    return {
      root: {
        width: '100%',
        marginBottom: '16px',
        maxWidth: 'none',
        minHeight: cardSize === ButtonSize.small ? '40px' : '68px',
        height: cardSize === ButtonSize.small ? '40px' : '68px',
        padding: '14px',
        marginLeft: '0px'
      },
      textContainer: {
        overflow: 'hidden'
      },
      label: {
        textOverflow: 'ellipsis',
        width: 'inherit',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '12px',
        lineHeight: '14px',
        minHeight: '16px',
        color: '#000000'
      },
      description: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        lineHeight: '14px',
        minHeight: '16px'
      }
    };
  }
);
