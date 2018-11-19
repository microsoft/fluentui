import { IActionBarStyles } from './ActionBar.types';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const getStyles = (): IActionBarStyles => {
  return {
    root: {
      whiteSpace: 'nowrap',
      width: '100%',
      height: '32px'
    }
  };
};

export const overflowButtonStyles: IButtonStyles = {
  root: {
    height: '32px',
    width: '0',
    minWidth: '0px',
    backgroundColor: '#ffffff',
    position: 'relative',
    selectors: {
      ':after': {
        content: '" "',
        position: 'absolute',
        height: '16px',
        top: '50%',
        marginTop: '-8px',
        width: '1px',
        background: '#C8C6C4',
        marginLeft: '-17px'
      },
      ':hover::after': {
        display: 'none'
      }
    }
  }
};
