import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const getCustomCompoundButtonStyles = memoizeFunction((): IButtonStyles => {
  return {
    root: {
      width: '100%',
      marginBottom: '16px',
      maxWidth: 'none',
      minHeight: '68px',
      padding: '14px'
    },
    textContainer: {
      overflow: 'hidden',
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
      minHeight: '16px',
    }
  };
});